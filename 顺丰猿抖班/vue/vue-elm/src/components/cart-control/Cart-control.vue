
<template>
<!-- 该组件接收父组件给过来的那道菜的数据  并且给那道菜里面的数据额外的再植入一个count字段 -->
  <div class="cart-control">
    <!-- 减号是滚出来的，所以有动画效果 transition-->
    <transition name="move">
      <!-- 没有值的时候减号不出现在页面上 v-show="food.count > 0"-->
      <div class="cart-decrease" v-show="food.count > 0" @click.stop="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>

    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <!-- 加号绑定点击事件 @click.stop阻止冒泡事件，即会出现减一个会减好几个的现象-->
    <div class="cart-add icon-add_circle" @click.stop="addCart"></div>
  </div>
</template>

<script>
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    // 点击加号需要让food对象里面的count字段变成1  food哪来的？点哪道菜就要让哪道菜的count累加
    // 所以要知道当前点击的是哪道菜 对于vart-control这个组件来说，是由引入该组件的goods.vue中的第二格Li的循环项决定的
    // 所以有一个父组件给子组件传值的操作  Li里面代表一道菜的数据是food 所以在父组件调用该组件的时候<CartControl :food="food"></CartControl>传一个food的值
    // 子组件在数据源里面接收food
    addCart() {
      if (!this.food.count) {
        // count大于0减号出现，小于消失，但是每一条food对象里面并不存在count字段表示当前这道菜被选中的次数
        // 所以点击加号时在该字段添加一个count属性 点击一次就给值为1，如果if不成立，那就不是第一次点击，已经有了count字段
        // this.food.count=1直接给对象添加属性对vue是不可信的 要通过$set方法，数据源里的数据要给它添加值的话并且要这个添加的值变成响应式的话
        // 即可以让这个count加上去也可以让definde propty拦截  要用$set  api
        this.$set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      // this.$emit('add', )    food是一个双向数据流，所以不需要再向父组件抛出  所以父组件直接把数据传到购物车里就行
    },
    decreaseCart() {
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.cart-control
  font-size 0
  .cart-decrease
    display inline-block
    padding 6px
    opacity 1
    transform translate3d(0, 0, 0)
    .inner
      display inline-block
      line-height 24px
      font-size 24px
      color rgb(0, 160, 220)
      transition all .4s linear
      transform rotate(0)
      // 减号出来的动画效果
    &.move-enter-active, &.move-leave-active
      transition all 0.4s linear
    &.move-enter, &.move-leave-to
      opacity 0
      transform translate3d(24px, 0, 0)
      .inner
        transform rotate(180deg)
  .cart-count
    display inline-block
    padding-top 6px
    line-height 24px
    text-align center
    font-size 10px
    color rgb(147, 153, 159)
    vertical-align top
  .cart-add
    display inline-block
    padding 6px
    line-height 24px
    font-size 24px
    color rgb(0, 160, 220)
</style>