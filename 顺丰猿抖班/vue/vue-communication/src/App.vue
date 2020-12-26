<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- hello 是组件 message此时是动态属性传值  绑定属性用:(bind)动态属性传值  实现父组件向子组件通信（把父组件数据源里面的数据传给子组件）  绑定方法用@(on) -->
    <Hello :message="title" @sendData="getData"/> 
    <!-- v-on(@)绑定子组件传值emit出来的方法sendData，可以在重写一个getData方法，在自己的方法里面接收 -->
    {{fromChild}}
    <Hi @sendHi="getHi"/>
    <A></A>
    <B></B>
  </div>
</template>

<script>
// import Hello from '@/components/Hello'
// import Hi from '@/components/Hi'
import A from '@/components/A'
import B from '@/components/B'
export default {
  name: 'App',
  data () {
    return {
      title: '我爱我的祖国',
      fromChild: '',
      fromHi: ''
    }
  },
  components: {
    // Hello,
    // Hi
    A,
    B
  },
  methods: {
    getData (e) {//接收子组件传过来的数据方法，方法是子组件$emit传过来后重写的，sendData携带的参数就是那个传过来的值就在参数里面
      this.fromChild = e
    },
    getHi (e) {
      this.fromHi = e
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
