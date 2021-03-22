const sql = require('mysql')
const config = require('./config')

let pool = sql.createPool({
    host:config.dataBase.HOST,
    user:config.dataBase.USERNAME,
    password:config.dataBase.PASSWORD,
    database:config.dataBase.DATABASE,
    port:config.dataBase.PORT
})

let allServers = {
    query: function(sql,values) {
        return new Promise((resolve,reject)=>{
            pool.getConnection(function(err,connection){
                // console.log(connection, '2222', err);
                if(err){
                    reject(err)
                }else{
                    connection.query(sql,values,(err,rows)=>{
                        // console.log(sql,values, err,rows);
                        if(err){
                            reject(err)
                        }else{
                            resolve(rows)
                        }
                        connection.release()
                    })
                }
            })
        })

    }
}

// 查找用户表中的某用户的所有数据
let userLogin = function(username,password){
    // console.log(username, password);
    let _sql = `select * from users where username="${username}" and password="${password}";`
    return allServers.query(_sql)

}
// 往用户表存入数据
let insertUser = function(value){
    let _sql = `insert into users set username=?,password=?;`
    return allServers.query(_sql,value)
}
// 查找用户
let findUser = function(username) {
    let _sql = `select * from users where username="${username}";`
    return allServers.query(_sql)
}
// 查找首页轮播图数据
let findSwiper = function(){
    let _sql = `select * from swiper;`
    return allServers.query(_sql)
}
// 查找首页热门商品数据
let findhgoods = function(){
    let _sql = `select * from hotgoods;`
    return allServers.query(_sql)
}
// 查找首页新品上线板块数据
let findngoods = function(){
    let _sql = `select * from newgoods;`
    return allServers.query(_sql)
}
// 查找首页推荐商品数据
let findrgoods = function(){
    let _sql = `select * from recommendgoods;`
    return allServers.query(_sql)
}
// 查找详情页的某条商品数据展示
let finddetail = function(id){
    let _sql = `select * from goodsdetail where goodsId="${id}";`
    return allServers.query(_sql)
} 

// 查找某条商品数据加入购物车展示
let findgoodstocart = function(goodsId){
    let _sql = `select * from newgoods where goodsId="${goodsId}" UNION  select * from hotgoods where goodsId="${goodsId}" UNION  select * from recommendgoods where goodsId="${goodsId}"`
    return allServers.query(_sql)
}
// 查找购物车是否存在该商品 防止重复添加商品到购物车
let findincart = function(id){
    let _sql = `select * from shopcart where goodsId="${id}";`
    return allServers.query(_sql)
} 
// 往购物车中插入一条用户选购的商品数据
let insertcart = function(value){
    let _sql = `insert into shopcart set goodsId=?,goodsCount=?,goodsName=?,goodsCoverImg=?,sellingPrice=?;`
    return allServers.query(_sql,value)
}
// 查找购物车中的所有商品，前端拿到.length展示角标
let getcart = function(){
    let _sql = `select * from shopcart;`
    return allServers.query(_sql)
}
// 修改购物车中的数量字段
let modifycartcount = function(goodsCount,cartItemId){
    let _sql = `update shopcart set goodscount=${goodsCount} where cartItemId=${cartItemId} `
    return allServers.query(_sql)
}
// 删除购物车的某条商品
let deletecartgoods = function(cartItemId){
    let _sql = `delete from shopcart where cartItemId=${cartItemId}`
    return allServers.query(_sql)
}



module.exports = {
    userLogin,
    insertUser,
    findUser,
    findSwiper,
    findrgoods,
    findngoods,
    findhgoods,
    finddetail,
    findgoodstocart,
    insertcart,
    getcart,
    findincart,
    modifycartcount,
    deletecartgoods
    
}