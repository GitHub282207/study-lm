<template>
  <div class="create-order">
    <s-header :name="'生成订单'"></s-header>
    <!-- 地址 -->
    <div class="address-wrap">
      <div class="name" @click="goTo">
        <span>施诗</span>
        <span>15797628163</span>
      </div>
      <div class="address">
        江西省抚州市三金大道
      </div>
      <van-icon class="arrow" name="arrow" />
    </div>
    <!-- 列表 -->
    <div class="good">
      <div class="good-item" v-for="(item, index) in cartList" :key="index">
        <div class="good-img"><img :src="item.goodsCoverImg" alt=""></div>
        <div class="good-desc">
          <div class="good-title">
            <span>{{ item.goodsName }}</span>
            <span>x{{ item.goodsCount }}</span>
          </div>
          <div class="good-btn">
            <div class="price">¥{{ item.sellingPrice }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sHeader from '@/components/simpleHeader'
import { getCartOrder } from '@/servers/user'
import { computed, onMounted, reactive, toRefs } from 'vue'
import { Toast } from 'vant'
import { useRoute, useRouter } from 'vue-router'
export default {
  components: {
    sHeader
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      cartList: [],
      cartItemId: [],
      address:  {},
      showPay: false,
      orderNo: '' // 订单编号
    })

    onMounted(()=>{
        init()
    })

    const init = async ()=>{
      Toast.loading({ message: '加载中...', forbidClick: true });
    //拿到购物车页面跳转过来传的想买的商品的cartItemId 路由取参
      const _cartItemIds = route.query
    // 创建地址时返回订单页面携带的参数，方便去查找地址表中的信息
      const address = route.query
    // 请求地址的数据
    // await 


      let cartItemIds = Object.values(_cartItemIds);
      console.log(JSON.parse(cartItemIds[0]));
    // 请求要购买的商品数据
    await getCartOrder({ cartItemIds: JSON.parse(cartItemIds[0]) }).then((res)=>{
        console.log(res);
        state.cartList = res.data.data
        Toast.clear()
    }).catch((err)=>{})


    }

    return {
        ...toRefs(state)
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../common/style/mixin';
  .create-order {
    background: #f9f9f9;
    .address-wrap {
      margin-bottom: 20px;
      background: #fff;
      position: relative;
      margin-top: 44px;
      font-size: 14px;
      padding: 15px;
      color: #222333;
      .name, .address {
        margin: 10px 0;
      }
      .arrow {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 20px;
      }
      &::before {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 2px;
        background: -webkit-repeating-linear-gradient(135deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
        background: repeating-linear-gradient(-45deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
        background-size: 80px;
        content: '';
      }
    }
    .good {
      margin-bottom: 120px;
      padding-bottom: 106px;
    }
    .good-item {
      padding: 10px;
      background: #fff;
      display: flex;
      .good-img {
        img {
          .wh(100px, 100px)
        }
      }
      .good-desc {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        padding: 20px;
        .good-title {
          display: flex;
          justify-content: space-between;
        }
        .good-btn {
          display: flex;
          justify-content: space-between;
          .price {
            font-size: 16px;
            color: red;
            line-height: 28px;
          }
          .van-icon-delete {
            font-size: 20px;
            margin-top: 4px;
          }
        }
      }
    }
    .pay-wrap {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background: #fff;
      padding: 10px 0;
      padding-bottom: 50px;
      border-top: 1px solid #e9e9e9;
      >div {
        display: flex;
        justify-content: space-between;
        padding: 0 5%;
        margin: 10px 0;
        font-size: 14px;
        span:nth-child(2) {
          color: red;
          font-size: 18px;
        }
      }
      .pay-btn {
        position: fixed;
        bottom: 7px;
        right: 0;
        left: 0;
        width: 90%;
        margin: 0 auto;
      }
    }
  }
</style>