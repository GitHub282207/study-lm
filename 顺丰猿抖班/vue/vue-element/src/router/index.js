import Vue from 'vue'
// 这份js和当前项目没有关系，因为没有任何地方引用了，所以引入vue，引入router,
// 然后Vue.use(Router)让它们在vue里面生效 让vue识别出来router 
// 在抛出来一个实例对象export default new Router
// 所以相应的main.js里面引入路由也应该引入这份文件 其实就是引入这份文件抛出的对象实例
import Router from 'vue-router'
import Home from '../views/Home'
import About from '../views/About'
import home1 from '../views/home1'
import home2 from '../views/home2'
import Detail from '@/views/Detail'

Vue.use(Router)

export default new Router({//已经在全局生效，因为已经被引入到main.js里面并且拿到vue里面去生效了，就那个router，
  // 配置路由的语法  routes: []数组里面配置多个路由，每个路由用一个{}表示
  routes: [
    {
      // 这代表根路径下我们想要展示的是Home.vue的页面 地址栏去到哪里，我们就展示哪一个，跟地址栏产生关联
      path: '/',
      name: 'Home',
      component: Home,//引入页面时的那个Home
      // 配置二级路由
      children: [
        // 默认根路径下展示
        {
          path: '/',
          component: home1
        },
        // 点击首页1展示
        // 二级子路由前面可以不加/
        {
          path: 'home1',
          component: home1
        },
        {
          path: 'home2',
          component: home2
        }
      ]
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      beforeEnter: (to, from, next) => {
        console.log(to);
        console.log(from);
        next()
      }
    },
    {
      path: '/detail:id',
      name: 'Detail',
      component: Detail,
      // redirect: '/login',
      // alias: '/hello'
    }
  ]
})
