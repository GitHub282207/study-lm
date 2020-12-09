<template>
<!-- 路由组件要在页面上看到内容 在app.vue里面引入  在声明 在拿到页面去用 这是组件的引入方式-->
<!-- 但我们要把home做成页面,页面就要由路径来控制 就是通过路径加/home才能看到页面展示 -->
<!-- 所以我们要在app.vue里面放路由路口 <router-view></router-view>标签 再去到路由文件引入这个页面
import Home from '../views/Home'，再在里面配路由 -->
  <div class="home">home
    <p>
      <router-link to="/home1">首页1</router-link>|
      <router-link to="/home2">首页2</router-link>
    </p>
    <!-- 二级路由的路由入口 接下来需要配置只在首页这个页面的路由入口生效的页面 去到路由文件里面 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>