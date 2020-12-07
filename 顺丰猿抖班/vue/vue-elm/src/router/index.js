import Vue from 'vue'
// 配置路由，即点击页面能看到相应的内容  先引入页面import Goods from '@/views/goods/goods'，在到数组const routes 里面配一条一条的对象 
// 每个对象里面要有Path路径，有name，有component  再去到app.vue中放置路由路口router-view，这样页面才有东西
import VueRouter from 'vue-router'
import Goods from '@/views/goods/goods'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'goods',
    component: Goods
  },
  {
    path: '/comment',
    name: 'comment',
    // 不用页面引入，用箭头函数引入 不主动去调用这个函数，页面就不会加载 
    // 而像goods那样引入，只要打包了这个页面就一定会加载  执行那行引入的代码没有触发component   
    // 路由的按需加载，跳到comment页面再把页面加载出来
    component: () => import('@/views/comment/comment.vue')
  },
  {
    path: '/seller',
    name: 'seller',
    component: () => import('@/views/seller/seller.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
