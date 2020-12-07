<template>
<!-- 用vue去做项目开发，用的最多就是去写template模板，去写css，做好父子组件的通信，控制好data数据源里的东西 通过js控制数据源 -->
  <div class="header" @click="showDetail">
    <div class="content-wrapper">
      <div class="avatar">
        <!-- 开标签和闭标签之间才需要挖坑埋数据，属性是不需要挖坑埋数据的 :src="seller.avatar"动态绑定属性src必须要v-bind简写为：-->
        <img width="64" height="64" :src="seller.avatar" alt="">
      </div>
      
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <!-- 接口请求没有html渲染快 所以用  v-if="seller.supports"-->
        <div class="support" v-if="seller.supports">
          <support-ico :size=1 :type="seller.supports[0].type"></support-ico>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>

      <div class="support-count" v-if="seller.supports">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <!-- 背景 -->
    <div class="background">
      <img :src="seller.avatar" alt="" width="100%" height="100%">
    </div>
    <!-- 需要脱离文档流 放置页面最后不影响其他dom结构就行-->

    <!-- 页面需要频繁出现和消失，用v-show，去控制优惠的页面出现与消失，可以通过控制该组件的出现和消失 给头部header绑定点击事件@click="showDetail-->
    <header-detail :seller="seller" v-show="detailVisible" @hide="hideDetail"></header-detail>
  </div>
</template>

<script>
import SupportIco from '@/components/support-ico/Support-ico'
import HeaderDetail from '@/components/header-detail/Header-detail'
export default {
  props: {
    //子组件接到父组件app.vue传过来的数据seller，直接拿到页面上使用，埋数据的操作
    seller: {
      type: Object,
      //父组件如果没传值就放成一个空对象
      default() {
        return {}
      }
    }
  },
  data () {
    return {
      detailVisible: false
    }
  },
  components: {
    SupportIco,
    HeaderDetail
  },
  // 两个 console.log会同时出现  涉及到事件的捕获和冒泡 这里是冒泡事件   @click.stop加个.stop阻止冒泡
  // 一个容器a里面放了一个子容器b，当给b绑定点击事件时，点到b点击事件触发先点到的一定是a，一定是先执行捕获在执行冒泡
  // edeventlistens第三个参数默认把捕获事件设为false了关闭了，只执行冒泡事件
  methods: {
    showDetail() {
      this.detailVisible = true
      console.log(123);
    },
    hideDetail(e) {
      console.log(e);
      this.detailVisible = e
    }
  }
}
</script>

<style lang="stylus">
@import '../../common/stylus/variable.styl';
@import '../../common/stylus/mixin.styl';
.header
  position relative
  overflow hidden
  color $color-white
  background $color-background-ss
  .content-wrapper
    position relative
    display flex
    padding 24px 12px 18px 24px
    align-items center
    .avatar
      flex 0 0 64px
      margin-right 16px
      img
        border-radius 2px
    .content
      flex 1
      .title
        display flex
        align-items center
        margin-bottom 8px
        .brand
          width: 30px;
          height: 18px;
          bg-image('brand')
          background-size 30px 18px
          background-repeat no-repeat
          vertical-align middle
        .name
          margin-left 6px
          font-size $fontsize-large
          font-weight bold
          vertical-align middle
          line-height 1
      .description
        font-size $fontsize-small
        margin-bottom: 8px;
        line-height 12px
      .support
        display flex
        align-items center
        &-ico
          margin-right 4px
        .text
          line-height 12px
          font-size $fontsize-small-s
    .support-count
      position absolute
      right 12px
      bottom 14px
      display flex
      align-items center
      padding 0 8px
      height 24px
      line-height 24px
      text-align center
      border-radius 14px
      background $color-background-sss
      .count
        font-size $fontsize-small-s
      .icon-keyboard_arrow_right
        margin-left 2px
        line-height 24px
        font-size $fontsize-small-s
  .bulletin-wrapper
    position relative
    display flex
    align-items center
    height 28px
    line-height 28px
    padding 0 8px
    background $color-background-sss
    .bulletin-title
      flex 0 0 22px
      width 22px
      height 12px
      margin-right 4px
      bg-image('bulletin')
      background-size 22px 12px
      background-repeat no-repeat
    .bulletin-text
      flex 1
      white-space nowrap
      text-overflow ellipsis
      overflow hidden
      font-size $fontsize-small-s
    .icon-keyboard_arrow_right
      flex 0 0 10px
      width 10px
      font-size $fontsize-small-s
  .background
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    z-index -1
    filter blur(10px)
</style>