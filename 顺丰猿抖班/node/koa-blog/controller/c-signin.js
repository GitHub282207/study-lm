exports.postSigin = async ctx => {
  await ctx.render('signin', {//ctx.render去渲染signin，signin长什么样子{}里面的signin.ejs
    session: ctx.session // 模板文件生效
  })
}