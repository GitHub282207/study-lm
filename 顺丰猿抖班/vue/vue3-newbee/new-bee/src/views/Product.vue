<template>
  <div class="product-detail">
    <s-header :name="'商品详情'"></s-header>
    <div class="detail-content">
      <div class="detail-swipe-wrap">
        <van-swipe class="my-swipe" indicator-color="#1baeae">
          <van-swipe-item
            v-for="(item, index) in detail.goodsCarouselList"
            :key="index"
          >
            <img :src="item" alt="" />
            <!-- <img src="https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/p40-silver.png" alt="" /> -->
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="product-info">
        <div class="product-title">
          {{ detail.goodsName || "" }}
        </div>
        <div class="product-desc">免邮费 顺丰快递</div>
        <div class="product-price">
          <span>¥{{ detail.sellingPrice || "" }}</span>
        </div>
      </div>
      <div class="product-intro">
        <ul>
          <li>概述</li>
          <li>参数</li>
          <li>安装服务</li>
          <li>常见问题</li>
        </ul>
        <div
          class="product-content"
          v-html="detail.goodsDetailContent || ''"
        ></div>
      </div>
    </div>
    <!-- footer -->
    <van-action-bar>
      <van-action-bar-icon icon="chat-o" text="客服" dot />
      <van-action-bar-icon
        icon="cart-o"
        text="购物车"
        :badge="cartcount ? cartcount : ''"
        @click="goTo"
      />
      <van-action-bar-button
        type="warning"
        text="加入购物车"
        @click="handleAddCart"
      />
      <van-action-bar-button type="danger" text="立即购买" @click="goToCart" />
    </van-action-bar>
  </div>
</template>

<script>
import sHeader from "@/components/simpleHeader";
import { getDetail, addCart, getcartcount } from "@/servers/user";
import { useRoute, useRouter } from "vue-router";
// import { useStore } from 'vuex'
import { Toast } from "vant";
import { onMounted, reactive, toRefs } from "vue";
export default {
  components: {
    sHeader,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    // const store = useStore()
    const state = reactive({
      detail: {
        goodsCarouselList: [],
        goodsName: "",
        sellingPrice: "",
        goodsDetailContent: "",
        cartcount: "",
      },
    });

    onMounted(async () => {
      const { id } = route.params;
      await getDetail({
        id: id,
      }).then((res) => {
        // console.log(res);
        state.detail = res.data.goodsdetail[0];
        console.log(state.detail.goodsCarouselList);
      });
    });

  // 加入购物车
    const handleAddCart = async () => {
      // console.log('123');
      await addCart({
        goodsCount: 1,
        goodsId: state.detail.goodsId,
      })
        .then((res) => {
          // console.log(res);
          if(res.data.code == "80001"){
            Toast.success("已添加");
          }
          if (res.data.code == "80000") {
            Toast.success("添加成功");
            // 拿到购物车里面有多少条数据
            // store.dispatch('updateCart')
            getcartcount().then((res) => {
              // console.log(res);
              state.cartcount = res.data.cartgoods.length;
              console.log(state.cartcount);
            });
          }
        })
        .catch((err) => {});
    };

    const goToCart = async () => {
      await addCart({ goodsCount: 1, goodsId: state.detail.goodsId });
      await getcartcount().then((res) => {
        state.cartcount = res.data.cartgoods.length;
      }).catch(err=>{});
      router.push({ path: "/cart" });
    };

    const goTo = () => {
      console.log('123');
      router.push({ path: '/cart' })
    }

    return {
      ...toRefs(state),
      handleAddCart,
      goToCart,
      goTo
    };
  },
};
</script>

<style lang="less">
@import "../common/style/mixin";
.product-detail {
  .detail-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    .fj();
    .wh(100%, 44px);
    line-height: 44px;
    padding: 0 10px;
    .boxSizing();
    color: #252525;
    background: #fff;
    border-bottom: 1px solid #dcdcdc;
    .product-name {
      font-size: 14px;
    }
  }
  .detail-content {
    height: calc(100vh - 50px);
    overflow: hidden;
    overflow-y: auto;
    margin-top: 44px;
    .detail-swipe-wrap {
      .my-swipe .van-swipe-item {
        img {
          width: 100%;
          // height: 300px;
        }
      }
    }
    .product-info {
      padding: 0 10px;
      .product-title {
        font-size: 18px;
        text-align: left;
        color: #333;
      }
      .product-desc {
        font-size: 14px;
        text-align: left;
        color: #999;
        padding: 5px 0;
      }
      .product-price {
        .fj();
        span:nth-child(1) {
          color: #f63515;
          font-size: 22px;
        }
        span:nth-child(2) {
          color: #999;
          font-size: 16px;
        }
      }
    }
    .product-intro {
      width: 100%;
      padding-bottom: 50px;
      ul {
        .fj();
        width: 100%;
        margin: 10px 0;
        li {
          flex: 1;
          padding: 5px 0;
          text-align: center;
          font-size: 15px;
          border-right: 1px solid #999;
          box-sizing: border-box;
          &:last-child {
            border-right: none;
          }
        }
      }
      .product-content {
        padding: 0 20px;
        img {
          width: 100%;
        }
      }
    }
  }
  .van-action-bar-button--warning {
    background: linear-gradient(to right, #6bd8d8, @primary);
  }
  .van-action-bar-button--danger {
    background: linear-gradient(to right, #0dc3c3, #098888);
  }
}
</style>