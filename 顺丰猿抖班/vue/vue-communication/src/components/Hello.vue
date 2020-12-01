<template>
<!-- 组件和页面的区别，组件是需要在app.vue里面引入声明在使用，页面需要配路由，也叫路由组件 -->
  <div class="hello">
    {{message}}
    <hr/>
    {{fromHi}}
    <button @click="send">发送</button> <!-- 子传父需要有事件-->
  </div>
</template>

<script>
export default {
  // 相对于app.vue是子组件，子组件可以接收父组件给过来的数据并根据需求在页面展示出来
  props: ['message', 'fromHi'],
  data () {
    return {
      msg: '我是子组件里面的数据'
    }
  },
  methods: {
    send () {
      this.$emit('sendData', this.msg)
    }
  }
}
</script>

<style>
  .hello{
    color: brown;
    font-size: 20px;
    /* width: 100px;
    height: 50px;
    border: 2px dotted darkturquoise;
    margin: 0 auto; */
  }
</style>