// koa是node的一个框架 让node的写法更加简单一点
// 原生node怎么起一个web服务
 const Koa = require('Koa')//要先装好koa npm install koa
 const route  = require('koa-route')

//  用koa去创建/起 一个web服务
const app = new Koa()  //app实例对象
app.use((ctx,next)=>{
    console.log(ctx.request);
    ctx.body = 'hello'//往前端输出一个hello
})
app.use(route.get('/abc',main))//客户端访问了localhost 3000/abc,对应执行掉main

app.listen(3000)