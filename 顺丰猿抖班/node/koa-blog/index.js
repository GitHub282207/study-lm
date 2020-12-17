const Koa = require('koa')
const path = require('path')
const bodyParser = require('koa-bodyparser') // 表单中间件
const config = require('./config/default.js')
const session = require('koa-session-minimal') // 存储操作
const MysqlStore = require('koa-mysql-session') // 数据库操作
const staticCache = require('koa-static-cache') // 配置静态资源
const views = require('koa-views') // 配置服务端模板渲染引擎的中间件
const app = new Koa()

// session存储配置
const sessionMysqlConfig = {
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  host: config.database.HOST
}
// 配置session中间件
app.use(session({
  key: 'USER_SID',
  store: new MysqlStore(sessionMysqlConfig)
}))

// 缓存
app.use(staticCache(path.join(__dirname, './public'), { dynamic: true }, {
  maxAge: 365 * 24 * 60 * 60
}))
app.use(staticCache(path.join(__dirname, './images'), { dynamic: true }, {
  maxAge: 365 * 24 * 60 * 60
}))

// 配置服务端的模板引擎中间件
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))

app.use(bodyParser({
  formLimit: '1mb'
}))

app.use(require('./routers/signin.js').routes())//让路由文件生效并在页面输出东西，就需要引入在use，在.routes
app.use(require('./routers/signup.js').routes())

app.listen(config.port, () => {
    console.log('项目启动成功');
})

// 所有的内容源自这十行代码