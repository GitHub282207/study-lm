<template>
  <div>
    <div class="goods">
      <!-- 左边 
      让左侧所有的菜单先出现 从接口请求  封装的api里面的index.js 里面的getGoods 获取商品的接口
      在页面script里面引入import { getGoods } from '@/api'  再在生命周期里面调用掉getGoods函数
      -->
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <!-- 每点击一个Li背景要变成白色，即每一个li都要能被点 绑定点击事件 在methods中写方法
           @click="selectMenu" 需要知道当前点击的是哪个菜单(index)传个实参  
           动态加类名current 加与不加需要判断条件，取决于数据源里的currentIndex和当前的index是否相等
           所有的li都有index这个值，但currentIndex只有一个值 点谁currentIndex就会是谁 对应的那个就会被加上current类名
          -->
          <li class="menu-item"
          @click="selectMenu(index)"
          v-for="(item, index) in goods" 
          :key="index"
          :class="{'current' : currentIndex === index}"    
          >
          <!-- 左侧菜单栏只有某种条件下才有小图标 怎么区分 通过接口请求返回的每条数据的type值，
          不需要放的type值统一为-1 所以通过v-if判断item.type v-if="item.type > 0  item代表每一条数据
          引入support-ico组件 声明组件
          -->
            <span class="text">
              <support-ico v-if="item.type > 0" :size=3 :type="item.type"></support-ico>
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <!-- 右边
      页面滚动也要让左边菜单跟着动 即左边白底到底给到谁 也就是说那个current类名到底给到谁
      右边页面的滚动让当前current值变为几  问题？右边区域滚动，我们要计算到底哪个第一个li出现在可视区域内
       高度为0左侧菜单才会实现跳转  怎么才知道右边的菜单此时此刻滚了多少？每个菜系有多高不能确定  由每个菜系里面的菜品决定
       有一个方法可以取到页面滚动的距离  但我们要把每一菜系的dom结构的高度动态的计算出来 主要是有几个第二个li
       现在我们有办法拿到页面到底滚动了多少距离 还能拿到每一个菜系到底有多高，所以可以计算出来 比如当前滚动了800像素，此时是哪一个菜系出现在可视区域 
       在修改currentIndex的值
       -->
      <div class="foods-wrapper" ref="foodsWrapper">
        <!-- 用到两层for循环，两个ul li结构 热销榜是一个大容器，有很多这样的大容器，需要循环  
        里面包含的每一个菜品也需要循环  第二个li里面就是图片，菜品，加号减号的dom结构 
        右侧菜单也需要滚动效果
        -->
        <ul>
          <li class="food-list" v-for="(item, index) in goods" :key="index" ref="foodList">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li class="food-item" v-for="(food, idx) in item.foods" :key="idx">
                <div class="icon">
                  <img :src="food.icon" alt="">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">¥{{food.price}}</span>
                    <!-- food.oldPrice存在就展示，不存在就整个结构都不展示 -->
                    <span class="old" v-if="food.oldPrice">¥{{food.oldPrice}}</span>
                  </div>
                  <!-- + -->
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"></CartControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <!-- 购物车 -->
    <ShopCart 
      :selectFoods="selectFoods"
      :deliveryPrice="seller.deliveryPrice"
      :minPrice="seller.minPrice"
    ></ShopCart>
  </div>
</template>

<script>
import { getGoods } from '@/api'
// 引入better-scroll框架，实现左侧菜单滚动效果 让better-scroll作用于menu-wrapper  
// 数据出现后就要出现滚动效果，所以用 _initScroll()方法来实现
import BScroll from 'better-scroll'
import SupportIco from '@/components/support-ico/Support-ico'
import ShopCart from '@/components/shop-cart/Shop-cart'
import CartControl from '@/components/cart-control/Cart-control'

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      // 拿到菜单的数据后存起来，存在goods数组里面  在拿到页面循环goods
      goods: [],
      // currentIndex: 0,
      listHeight: [],
      scrollY: 0//页面所滚动的距离
    }
  },
  components: {
    SupportIco,
    ShopCart,
    CartControl
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        // for循环执行第二遍的时候I是1，height1代表的是第一个菜系，height2代表的是第一个和第二个菜系，
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        // 页面滚动距离没有超过第一个菜系的距离 此时左侧菜单白底应该定义在第一个 !height2可能越界
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      // 默认选中左侧第一个菜单
      return 0
    },
    selectFoods() {
      let foods = []
      for (let good of this.goods) {
        if (good.foods) {
          for (let food of good.foods) {
            if (food.count) {
              foods.push(food)
            }
          }
        }
      }
      return foods
    }
  },
  created() {
    getGoods().then(res => {
      console.log(res);
      this.goods = res
      // vue不是一更新数据页面就立马更新 这个过程是个异步操作，因为它需要做到的操作有，数据更新了，需要被观察者模式观察到，然后拿到更新之后的数据源，生成出来虚拟dom结构
      // 在驱使div算法去比较虚拟dom结构和真实dom结构的差异 找到差异之后再将差异做替换
      // vue里面处理异步的api  可以考虑给this.goods = res写到promise里面去，然后.then里面写this._initScroll()
      // 不行，不是this.goods = res这行代码导致异步，是执行导致异步，所以需要用vue中的$nextTick API
      this.$nextTick(() => { // 只会在dom渲染完成之后执行
        this._initScroll()
        this._calculateHeight()
      })
    })
  },
  methods: {
    // idx是接收点击事件传过来的形参index  该方法实现点谁谁就要加上current类名
    // 这个函数还要实现左侧菜单点击哪个，右侧菜品展示到指定位置  滚动到那个菜系 即左右联动  还有右边滚动实现左边联动
    // BScroll里面有一个方法scrollToElement可以让页面里面的内容滚动到当前可视区域的置顶位置
    selectMenu(idx) {
      // this.currentIndex = idx
      // 拿到所有的第二个li每一个菜系的dom结构，指定哪一个li滚动到顶部
      // foodList是一个数组，和左侧的菜单结构能够对应，点击左侧菜单拿到的idx也就是右侧的一个大块的dom结构 相当于第一个Li
      let foodList = this.$refs.foodList
      let el = foodList[idx]
      this.foodsScroll.scrollToElement(el, 300)
    },
    _initScroll() {
      // 往vue上面添加menuScroll属性，BScroll接收两个参数，第一个要使BScroll作用于哪个dom结构 第二个是配置项
      // 只要你给一个容器添加了BScroll效果，默认会把这个容器里面的点击效果失效，如果需要开启就需要指明click: true
      // 在vue中，要拿哪个dom结构，需要在该dom结构上添加ref属性，在通过$refs去取
      // 最后在created（）函数里面调用一下_initScroll() 因为需要拿到数据才滚动  页面超出才有滚动效果
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      // 给右边页面添加了 BScroll效果  BScroll可以计算右边滚动的距离  this.foodsScroll.on监听滚动事件
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3//放开滚动事件
      })
      this.foodsScroll.on('scroll', pos => {
        console.log(pos)
        this.scrollY = Math.abs(Math.round(pos.y))//取整再取绝对值 scrollY 变化，currentIndex()函数返回值也会变化
      })
    },
    // 计算每一个菜系的高度 
    _calculateHeight() {
      // 先拿到每一个菜系foodList的dom结构
      let foodList = this.$refs.foodList
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
      console.log(this.listHeight)
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '../../common/stylus/variable.styl';
.goods
  display flex
  position absolute
  top 177px
  bottom 46px
  width 100%
  overflow hidden
  .menu-wrapper
  // 左侧菜单定死宽度80px flex三个参数
    flex 0 0 80px
    width 80px
    background $color-background-ssss
    .menu-item
      display flex
      width 60px
      height 54px
      padding 0 10px
      text-align center
      justify-content center
      line-height 14px
      align-items center
      font-size $fontsize-small
      // &.current即包含menu-item又包含current的类名结构  点击那个哪个背景就需要变成白色，所以增加类名控制
      &.current
        background #fff
        font-weight 700
  .foods-wrapper
    flex 1
    .title
      padding-left 14px
      height 26px
      line-height 26px
      border-left 2px solid #d9dde1;
      font-size $fontsize-small
      color rgb(147, 153, 159)
      background $color-background-ssss
    .food-item
      display flex
      margin 18px
      padding-bottom 18px
      position: relative;
      // 最后一个li不给margin-bottom
      &:last-child
        margin-bottom 0
      .icon
        flex 0 0 57px
        margin-right 10px
        img
          width 100%
      .content 
        flex 1
        .name 
          margin 2px 0 8px 0
          height 14px
          line-height 14px
          font-size 14px
          color rgb(7, 17, 27)
        .desc, .extra 
          line-height 10px
          font-size 10px
          color rgb(147, 153, 159)
        .desc 
          line-height 12px
          margin-bottom 8px
        .extra 
          .count 
            margin-right 12px
        .price 
          font-weight 700
          line-height 24px
          .now 
            margin-right 8px
            font-size 14px
            color rgb(240, 20, 20)
          .old 
          // 旧价格的拦腰的横扛
            text-decoration line-through
            font-size 10px
            color rgb(147, 153, 159)
        .cartcontrol-wrapper
          position absolute
          right: 0;
          bottom: 12px;
</style>