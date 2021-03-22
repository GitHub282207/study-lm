const router = require('koa-router')()
const userService = require('../controller/mysql')

router.prefix('/users')

// 注册
router.post('/register', async (ctx, next) => {
  let _username = ctx.request.body.username;
  let _password = ctx.request.body.password;
  // console.log(_username, _password);
  if (!_username || !_password) {
    ctx.body = {
      code: '80001',
      mess: '用户名和密码不能为空'
    }
    return
  }
  await userService.findUser(_username).then(async (res) => {
    console.log(res);
    if (res.length) {
      ctx.body = {
        code: '80003',
        mess: '用户名已存在'
      }
    } else {
      await userService.insertUser([_username, _password]).then(res => {
        console.log(res);
        let r = '';
        if (res.affectedRows != 0) {
          r = 'ok'
          ctx.body = {
            code: '80000',
            data: r,
            mess: '注册成功'
          }
        } else {
          r = 'error'
          ctx.body = {
            code: '80004',
            data: r,
            mess: '注册失败'
          }
        }
      })
    }
  })
})

// 登录接口   前端就可以正常使用了
router.post('/login', async (ctx, next) => {
  let _username = ctx.request.body.username;
  let _password = ctx.request.body.password;
  // console.log(_username,_password);
  // ctx.body = 'hello world'

  // 把参数拿到数据库里查询
  await userService.userLogin(_username, _password).then(res => {
    // console.log(res);
    let r = '';
    let token = Math.floor(Math.random() * 100000000000000000000)
    if (res.length) {
      r = 'ok';
      let result = {
        id: res[0].id,
        username: res[0].username
      }
      ctx.body = {
        code: '80000',
        data: result,
        mess: '登录成功',
        token: token
      }
    } else {
      r = 'error'
      ctx.body = {
        code: '80004',
        data: r,
        mess: '账号或密码错误'
      }
    }
  }).catch(err => {
    ctx.body = {
      code: '80002',
      data: err
    }
  })
})
// 请求轮播图
router.post('/swiperinfos', async (ctx, next) => {
  // console.log('123');
  await userService.findSwiper().then(res => {
    // console.log(res);
    let r = '';
    if (res.length) {
      ctx.body = {
        mess: '查找成功',
        carousels: res
      }
    }
  })
})

router.post('/hgoodsinfos', async (ctx, next) => {
  // console.log('456');
  await userService.findhgoods().then(res => {
    // console.log(res);
    let r = '';
    if (res.length) {
      ctx.body = {
        mess: '查找成功',
        hotGoodses: res
      }
    }
  })
})

router.post('/ngoodsinfos', async (ctx, next) => {
  // console.log('789');
  await userService.findngoods().then(res => {
    // console.log(res);
    let r = '';
    if (res.length) {
      ctx.body = {
        mess: '查找成功',
        newGoodses: res
      }
    }
  })
})

router.post('/rgoodsinfos', async (ctx, next) => {
  // console.log('000');
  await userService.findrgoods().then(res => {
    // console.log(res);
    if (res.length) {
      ctx.body = {
        mess: '查找成功',
        recommendGoodses: res
      }
    }
  })
})


// 请求详情页面数据
router.post('/detail', async (ctx, next) => {
  let _id = ctx.request.body.id;
  await userService.finddetail(_id).then(res => {
    if (res.length) {
      ctx.body = {
        mess: '查找成功',
        goodsdetail: res
      }
    }
  })
})


// 添加至购物车
router.post('/shopcart', async (ctx, next) => {
  let _goodsCount = ctx.request.body.goodsCount;
  let _goodsId = ctx.request.body.goodsId

  await userService.findgoodstocart(_goodsId).then(async (res) => {
    // console.log(res);
    let goodsCoverImg = res[0].goodsCoverImg
    let sellingPrice = res[0].sellingPrice
    let goodsName = res[0].goodsName
    await userService.findincart(_goodsId).then(async (res) => {
      if (res.length) {
        ctx.body = {
          code:'80001',
          message: "已存在"
        }
      } else {
        await userService.insertcart([_goodsId, _goodsCount, goodsName, goodsCoverImg, sellingPrice]).then(res => {
          console.log(res);
          let r = ''
          if (res.affectedRows != 0) {
            r = 'ok'
            ctx.body = {
              code: '80000',
              data: r,
              message: '添加成功'
            }
          } else {
            r = 'error'
            ctx.body = {
              code: '80001',
              data: r,
              message: '添加失败'
            }
          }
        })
      }
    })

  })
})


// 请求购物车的数据
router.post('/cartcount', async (ctx, next) => {
  await userService.getcart().then(res => {
    // console.log(res);
    if (res.length) {
      ctx.body = {
        message: 'success',
        cartgoods: res
      }
    }else{
      ctx.body = {
        message: 'fail',
        cartgoods: []
      }
    }
  })
})


// 修改购物车中的数据
router.post('/modifycartcount', async (ctx, next) => {
  let _goodsCount = ctx.request.body.goodsCount
  let _cartItemId = ctx.request.body.cartItemId
  console.log(_goodsCount,_cartItemId);
  await userService.modifycartcount(_goodsCount,_cartItemId).then(res=>{
        // console.log(res);
        if(res.affectedRows!=0)
        ctx.body = {
          message: 'success'
        }
      })
      
    }
)

// 删除购物车的某条商品
router.post('/deletecartgoods',async(ctx,next) =>{
  let _cartItemId = ctx.request.body.cartItemId
  // console.log(_cartItemId)
  await userService.deletecartgoods(_cartItemId).then(res=>{
    // console.log(res);
    if(res.affectedRows!=0){
    ctx.body = {
      code: '80000',
      message: 'success'
    }
  }
})
})

// 从购物车获取到想确定买的商品付款，数据展示在订单页
router.post('/getcartorder',async(ctx,next) =>{
  let cartItemIds = ctx.request.body.cartItemIds
  // 前端传递的想购买商品的商品cartItemIds数组
  // console.log(cartItemIds)
  await userService.getcart().then(res=>{
    // 目前购物车中的所有的商品数据 是数组包含对象
    console.log(res);
    let data = []
    cartItemIds.forEach((id)=>{
      //  data.concat(res.filter((item)=>{
      //   return item.cartItemId == id
      // }))
      res.forEach((item) => {
        if (item.cartItemId == id) {
          data.push(item)
        }
      })
    })
    console.log(data);
    ctx.body = {
      message:'success',
      data:data
    }
})
})



module.exports = router
