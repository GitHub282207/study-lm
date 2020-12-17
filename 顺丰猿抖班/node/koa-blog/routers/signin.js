const router = require('koa-router')();
const controller = require('../controller/c-signin.js')
router.get('/signin', controller.postSigin)//controller.postSigin展示登录页面结构，在控制层写
module.exports = router