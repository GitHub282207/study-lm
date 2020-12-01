<template>
<!-- 页面上的数据需要展示，只需把数据源里的数据挖坑 -->
  <div class="about">
    <p>当前温度: {{temperture.num}}</p>
    <p>推荐穿衣:{{suggest}}</p>

    <div>
      <button @click="add">+</button>
      <button @click="reduce">-</button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      count: 0,
      temperture: {
        num: 9
      },
      suggest: ''
    }
  },
  computed: {
    sum () {
      return (this.count + 10) ** 2
    }
    // suggest与watch的区别在于用suggest会为我们新增一个suggest属性，而watch不会，一个不需要再数据源增加字段，一个需要
    // suggest () {
    //   if (this.temperture <= -1) {
    //     return '羽绒服'
    //   } else if (this.temperture < 14) {
    //     return '棉袄'
    //   } else if (this.temperture < 24) {
    //     return '夹克'
    //   } else {
    //     return '短袖'
    //   }
    // }
  },
  methods: {
    add () {
      this.temperture.num += 5
    },
    reduce () {
      this.temperture.num -= 5
    }
  },
  watch: {
    // temperture (newVal, oldVal) {
    //   console.log(newVal, oldVal)
    //   if (newVal <= -1) {
    //     this.suggest = '羽绒服'
    //   } else if (newVal < 14) {
    //     this.suggest = '棉袄'
    //   } else if (newV al < 24) {
    //     this.suggest = '夹克'
    //   } else {
    //     this.suggest = '短袖'
    //   }
    // }
    temperture: {
      handler (newVal, oldVal) {
        console.log(newVal.num, oldVal)
        if (newVal.num <= -1) {
          this.suggest = '羽绒服'
        } else if (newVal.num < 14) {
          this.suggest = '棉袄'
        } else if (newVal.num < 24) {
          this.suggest = '夹克'
        } else {
          this.suggest = '短袖'
        }
      },
      // watch监听器默认执行一次，所以数据源里的suggest就不用写死穿什么，执行一次有值就会走if判断
      immediate: true,
      // 深度监听，监听tempreture里面的num值是否发生变化 开启deep属性
      deep: true
    }
  }
}
</script>

<style>

</style>
