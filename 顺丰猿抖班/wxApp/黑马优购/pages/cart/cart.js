// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  //点击获取收获地址事件
  handleChooseAddress() {
    wx.chooseAddress({
      success: (address) => {
        console.log(address);
        wx.setStorageSync("address", address);
      }
    });
  },

   // 商品的选中
   handleItemChange(e) {
    // 1 获取被修改的商品的id
    const goods_id = e.currentTarget.dataset.id;
    // 2 获取购物车数组 
    let { cart } = this.data;
    // 3 找到被修改的商品对象
    // let index = cart.findIndex(v => {
    //   v.goods_id === Number(goods_id)
    // });
    function test(arr, id) {
      return arr.findIndex(e => e.goods_id == id)
    }
    let index = test(cart, goods_id)
    // console.log(index)
    // let index = indexArr[0]
    // 4 选中状态取反
    cart[index].checked = !cart[index].checked;
    this.setCart(cart);

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 1 获取缓存中的收货地址信息
    const address = wx.getStorageSync("address");
    // 1 获取缓存中的购物车数据
    const cart = wx.getStorageSync("cart") || [];
    this.setData({ address });
    this.setCart(cart);
  },
 // 设置购物车状态同时 重新计算 底部工具栏的数据 全选 总价格 购买的数量
 setCart(cart) {
  let allChecked = true;
  // 1 总价格 总数量
  let totalPrice = 0;
  let totalNum = 0;
  cart.forEach(v => {
    if (v.checked) {
      totalPrice += v.num * v.goods_price;
      totalNum += v.num;
    } else {
      allChecked = false;
    }
  })
  // 判断数组是否为空
  allChecked = cart.length != 0 ? allChecked : false;
  this.setData({
    cart,
    totalPrice, 
    totalNum, 
    allChecked
  });
  wx.setStorageSync("cart", cart);
},
   // 商品全选功能
   handleItemAllCheck() {
    // 1 获取data中的数据
    let { cart, allChecked } = this.data;
    // 2 修改值
    allChecked = !allChecked;
    // 3 循环修改cart数组 中的商品选中状态
    cart.forEach(v => v.checked = allChecked);
    // 4 把修改后的值 填充回data或者缓存中
    this.setCart(cart);
  },
  //商品数量编辑功能
  handleItemNumEdit(e) {
    // 1 获取传递过来的参数 
    const { operation, id } = e.currentTarget.dataset;
    // console.log(operation, id);
    // 2 获取购物车数组
    let { cart } = this.data;
    // 3 找到需要修改的商品的索引
    const index = cart.findIndex(v => v.goods_id === id);
    // 4 判断是否要执行删除
    if (cart[index].num === 1 && operation === -1) {
      // 4.1 弹窗提示
      // const res = showModal({ content: "您是否要删除？" });
      // if (res.confirm) {
      //   cart.splice(index, 1);
      //   this.setCart(cart);
      // }
      wx.showModal({
        title: '',
        content: '您是否要删除？',
        success: (result) => {
          if (result.confirm) {
            cart.splice(index, 1);
            this.setCart(cart);
          }
        }
      });
    } else {
      // 4  进行修改数量
      cart[index].num += operation;
      // 5 设置回缓存和data中
      this.setCart(cart);
    }
  },

})