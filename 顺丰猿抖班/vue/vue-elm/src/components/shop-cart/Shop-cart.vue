<template>
<!-- 购物车和加减号组件为兄弟组件，父组件都是goods.vue，但是点击加号组件需要让已经植入count字段的菜品去到购物车组件上展示
涉及到兄弟组件通信 event-bars 或者通过父组件传值   control把数据给回父组件 加号点击事件在往外传递数据
把数据传给父组件的代码应该写在加号点击事件里 父组件在给到另外一个子组件
 -->
  <div>
    <div class="shop-cart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <!-- 购物车有数据时，logo需要变蓝 动态添加类名highlight  
            写法为:class="{'highlight': totalCount > 0}"，通过判断商品数量 -->
            <div class="logo" :class="{'highlight': totalCount > 0}">
              <i class="icon-shopping_cart" :class="{'highlight': totalCount > 0}"></i>
            </div>
            <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight': totalCount > 0}">¥{{totalPrice}}</div>
          <!-- 配送费在商家信息的接口返回的 deliveryPrice字段 但这份数据能拿到是在app.vue里面发起的接口请求
          但现在要把它给到一个页面里的子组件shop-cart.vue ，goods.vue不是组件是页面，是通过路由配置而不是引用的，所以不是爷爷组件与孙子组件的关系
          所以怎么把app.vue里面的是数据传给shop-cart.vue使用，不是组件传值，是路由携参传值
          app.vue和goods.vue是通过路由产生联系的 所以先在这两者间传值，再通过goods.vue传给shop-cart.vue转化成父子的传值
          所以在于怎么把app.vue的数据怎么给到goods.vue里面去
          路由可以传参，但是都是由点击事件来支持的route-link to跳过去后面接参数，或者this.$push 但没有点击事件，页面刷新数据就要出来
          在app.vue有个seller就是商家信息的接口的数据 在app.vue中的router-view即路由组件的入口可以直接传
          这个标签包含了所以路由组件，包裹所由页面的html代码的，所以往这个上面传值其他页面就能接收得到
          另只要配了路由的路由组件都能拿到seller这歌数据
           -->
          <div class="desc">另需配送费¥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <!-- 还差多少元起送  拿到起送价格减去选中的所有商品价格，达到起送费就背景变绿，字体变白 -->
          <!-- :class="payClass"动态添加类名，根据数据源里面的变化动态赋值为not-enough和enough-->
          <div class="pay" :class="payClass">
            {{payDesc}}
          </div>
        </div>
      </div>
      <!-- 列表 有动画-->
      <transition name="fold">
        <!-- 控制购物车列表展示与否 用数组里面有没有值控制listShow，而不是点击事件-->
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <!-- 渲染的数据就是购物车的selectFoods数组  数组有最大限度，超出要有滚动效果，
          所以可以给list-content加一个better-scroll 需要先引入 -->
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="(item, index) in selectFoods" :key="index">
                <span class="name">{{item.name}}</span>
                <div class="price">
                  <span>¥{{item.price * item.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <!-- 给每个加减号传一道菜，就是item -->
                    <CartControl :food="item"></CartControl>
                  </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import CartControl from '@/components/cart-control/Cart-control'
import BScroll from 'better-scroll'

export default {
  props: {
    // 接收父组件给过来的选中的foods
    selectFoods: {
      type: Array,
      default () {//默认值  原始值 default:123 引用值就要写成函数类型default () {}
        return []
      }
    },
    // 父组件从app.vue里拿到的seller数据在传过来的配送费字段
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      fold: false
    }
  },
  components: {
    CartControl
  },
  computed: {
    // 计算菜品的总分数  拿到页面展示是直接用totalCount
    totalCount() {
      let count = 0
      // 拿父组件给过来的selectFoods的数组遍历出来 把里面的count度拿出来做一个累加
      // 取props里面的数据和取data里面的一样，this.
      Array.from(this.selectFoods).forEach((food) => {//forEach数组独有的方法，，Array.from会把对象强行转换为数组
        count += food.count
      })
      return count
    },
    // 计算总价格
    totalPrice() {
      let price = 0
      Array.from(this.selectFoods).forEach((food) => {
        price += food.count * food.price
      })
      return price
    },
    // pay容器也就是去结算的dom结构里面要展示的内容
    payDesc() {
      // 计算属性里面能用计算属性的值，用法和data里面的数据用法一样，所以可以通过this.totalPrice直接拿到总价格
      // 父组件还要传一个minPrice
      if (this.totalPrice === 0) {
        return `${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差${diff}元起送`
      } else {
        return '去结算'
      }
    },
    // 控制达到起送时给dom结构添加类名，更换不同的背景颜色
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    },
    // 给购物车展示的数据加一个滚动效果  listShow拿到的就是show的值，show为true就加滚动效果，
    // 还要判断之前有没有被加过better-scroll的效果 否则重新刷新赋予better-scroll的效果 
    listShow() {
      if (!this.totalCount) {
        this.fold = true
        return false
      }
      // 一道菜没选show为false
      let show = !this.fold
      if (show) {
        // 为true就添加上better-scroll的效果  
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
      return show
    }
  },
  methods: {
    // 点击购物车购物车列表出现和消失 通过控制数据源里面的fold
    toggleList() {
      if (this.selectFoods.length === 0) return
      this.fold = !this.fold
    },
    empty() {
      this.fold = false
      // 把 this.selectFoods数组置为空影响不了父组件的数据，购物车清空，但是菜品没清空。之前是因为$set实现了双向数据绑定，
      // 执行一个遍历，把父组件给我的数组里面的每条数据里面的count置为0，这样就能改动父组件的数据
      // 赋值动的是指针 改值是直接拿到数据源改
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl';
.shop-cart
  position fixed
  left 0
  bottom 0
  z-index 50
  width 100%
  height: 48px;
  .content
    display flex
    background $color-background
    color $color-light-grey
    &-left
      flex 1
      .logo-wrapper
        vertical-align middle
        display inline-block
        // 相对定位，让购物车相对于自己定位 top 10px; 往上突出
        position relative
        top -10px
        margin 0 12px
        padding 6px
        width 56px
        height 56px
        border-radius 50%
        box-sizing border-box
        background #141d27
        .logo
          width 100%
          height 100%
          background $color-dark-grey
          border-radius 50%
          text-align center
          // 添加类，选中时给蓝色
          &.highlight
            background $color-blue
          .icon-shopping_cart
            line-height 44px
            font-size $fontsize-large-xxx
            color #80858a
            &.highlight
              color $color-white
        .num
          position absolute
          top 0
          right 0
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size $fontsize-small-s
          font-weight bold
          color $color-white
          background $color-red
      .price
        display inline-block
        line-height 48px
        padding-right: 12px;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        font-size $fontsize-large
        font-weight 700
        &.highlight
          color $color-white
      .desc
        display inline-block
        line-height: 48px;
        font-size $fontsize-small-s
    .content-right
      flex 0 0 105px
      width: 105px;
      .pay
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: $fontsize-small;
        font-weight 700
        &.not-enough
          background #2b333b
        &.enough
          background $color-green
          color $color-white
  .shopcart-list
    position absolute
    left: 0;
    top: 0;
    width: 100%;
    z-index -1
    // 朝y轴往上移掉自己本身的高度100% 刚好摆脱掉黑色的条
    transform translate3d(0, -100%, 0)
    // 动画进入和动画离开时，fold是自己写的
    &.fold-enter-active, &.fold-leave-active
      transition all 0.5s
      // y轴变为0就是移回去，消失在页面上
    &.fold-enter, &.fold-leave-to
      transform translate3d(0, 0, 0)
    .list-header
      display flex
      justify-content space-between
      padding: 0 18px;
      height: 40px;
      line-height: 40px;
      align-items center
      border-bottom: 1px solid $color-background-sss;
      background $color-background-ssss
      .title
        font-size $fontsize-medium
        color $color-background
      .empty
        font-size $fontsize-small
        color $color-blue
    .list-content
      padding 0 18px
      max-height 217px
      overflow hidden
      background #fff
      .food
        position relative
        padding 12px 0
        box-sizing border-box
        .name
          line-height 24px
          font-size 14px
          color rgb(7, 17, 27)
        .price
          position absolute
          right 90px
          bottom 12px
          line-height 24px
          font-size 14px
          font-weight 700
          color rgb(240, 20, 20)
        .cartcontrol-wrapper
          position absolute
          right 0
          bottom 6px
</style>