<template>
<!-- template下面不能写多层结构，template开闭标签之间只能有一层，写兄弟节点要在外面多包裹一层 -->
  <div class="page">
    <!-- <router-view></router-view> -->
    <p>
      <!-- 路由里面的一个标签，相当于a标签 在通过to属性实现跳转 但这是直接写死在app.vue里面的 -->
      <router-link to="/">首页</router-link>|
      <router-link to="/about">关于</router-link>
    </p>

    
    <transition name="fade">
      <!-- 路由入口 路由文件里面配置的所有的页面的入口 
      即在这里使用了这个标签，那么在路由文件里面配置的所有的页面都会去到这里展示
      相当于把home页面的dom结构替换掉了这个标签
      -->
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "hello vue",
    };
  },
  components: {},
};
</script>

<style>
.page {
  text-align: center;
}
.home {
  color: red;
}
.fade-enter{
  opacity: 0;
}
.fade-leave{
  opacity: 1;
}
.fade-enter-active{
  transition: opacity 0.5s;
}
.fade-leave-active{
  opacity: 0;
  /* transition: opacity 0.5s; */
}
</style>