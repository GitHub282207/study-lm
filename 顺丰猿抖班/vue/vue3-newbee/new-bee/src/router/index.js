import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
const routes = [
    {
      path: '/',
      redirect: 'home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta:{
        index: 1,
        title:'新峰商城'

      }
    },
    {//按需加载路由
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta:{
        title:'登录/注册'
      }
    },
     {
      path: '/product/:id',
      name: 'product',
      component: () => import('@/views/Product.vue'),
      meta:{
        title:'详情'
      }
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/Cart.vue'),
      meta:{
        title:'购物车'
      }
    },
    {
      path: '/createorder',
      name: 'createorder',
      component: () => import('@/views/CreateOrder.vue'),
      meta:{
        title:'订单'
      }
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
