<template>
  <div class="app">
    <!-- 父组件向子组件通信，在引入组件时传值seller 
    app.vue只是引入header组件，功能都在该组件内完成了
    -->
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-wrapper">
        <router-link to="/">商品</router-link>
      </div>
      <div class="tab-wrapper">
        <!-- router-link控制页面切换跳转 /comment接你要跳转的地址 -->
        <router-link to="/comment">评论</router-link>
      </div>
      <div class="tab-wrapper">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>

    <div class="page">
      <!-- 对于app.vue来说,goods.vue是路由组件，相当于goods.vue的代码都写到这里来了
      seller这个值在goods.vue中直接用props接收
       -->
      <router-view :seller="seller"></router-view>
    </div>
  </div>
</template>

<script>
import header from '@/components/header/Header'
import { getSeller } from '@/api'
import qs from 'query-string'

export default {
  data () {
    return {
      seller: {
        id: qs.parse(location.search).id
      }
    }
  },
  components:  {
    'v-header': header
  },
  created() {
    getSeller({
      id: this.seller.id
    }).then((seller) => {
      console.log(seller);
      this.seller = Object.assign({}, this.seller, seller)
    })
  }
}
</script>

<style lang="stylus">
@import './common/stylus/variable.styl';
.tab
  width 100%
  display flex
  // y轴居中
  height 36px
  line-height 36px
  &-wrapper
    flex 1
    text-align center
    // a标签太小，点击事件面积小，所以设置为父容器一样的宽度，a标签为行内，所以宽高不生效，设置为行内块级
    a
      width 100%
      display inline-block
      color #666
      text-decoration none
      // router-link执行点击事件时会自动添加 .router-link-exact-active这个类名  三个页面点谁谁就会有这个类名，而别人没有这个类名
    .router-link-exact-active
      color $color-red
      border-bottom 2px solid $color-red
</style>