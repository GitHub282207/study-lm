<template>
<!-- 组件和页面的区别，组件是需要在app.vue里面引入声明在使用，页面需要配路由，也叫路由组件 -->
  <div class="hello">
    {{message}}
    <hr/>
    {{fromHi}}
    <!-- 父组件向子组件传值很简单因为本来子组件就要拿去父组件页面上用，那子组件怎么给父组件传值呢？ -->
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
      this.$emit('sendData', this.msg)//借助$emit往外发数据，第一个参数为方法名，第二个为要发的数据 然后就可以在父组件里面去接收
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