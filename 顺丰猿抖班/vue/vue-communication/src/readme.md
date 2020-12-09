# 在vue中，页面和组件本质上没有差别  用法不同 组件不需要用路由 页面需要路由
  - 组件只需要三步，把组件引入页面，在components里面声明，拿到html页面使用
  - 路由是媒婆，帮助你把指定好的路径和对应的页面给关联起来 于是去到哪个路径就能看到哪个页面了
    在vue项目中能够搞出来很多个页面的效果，即很多个路由页面，而不是一眼就看完
    安装路由 npm install vue-router --save-dev(装在开发环境和线上环境)
    在main.js用上路由  从Node-modules里面引入进来的依赖不需要写路径
    import router from 'vue-router'
    router生效还需要执行操作在new Vue({router,})里面声明 因为是亲生的，可以识别出来，不需要Vue.use
    路由三步，路由入口<router-view></router-view>放在app.vue文件中
             在路由文件引入需要配置路由的页面
             配置路由

