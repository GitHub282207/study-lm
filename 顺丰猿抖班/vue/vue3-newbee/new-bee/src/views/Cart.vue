<template>
  <div class="cart-box">
    <s-header :name="'购物车'" :back="false"></s-header>
    <!-- 列表 -->
    <div v-if="list.length > 0" class="cart-body">
      <van-checkbox-group v-model="result" @change="groupChange">
        <van-swipe-cell v-for="(item, index) in list" :key="index">
          <div class="good-item">
            <van-checkbox :name="item.cartItemId"></van-checkbox>
            <div class="good-img">
              <img :src="item.goodsCoverImg" alt="" />
            </div>
            <div class="good-desc">
              <div class="good-title">
                <span>{{ item.goodsName }}</span>
                <span>x{{ item.goodsCount }}</span>
              </div>
              <div class="good-btn">
                <div class="price">¥{{ item.sellingPrice }}</div>
                <van-stepper
                  async-change
                  integer
                  min="1"
                  max="5"
                  :model-value="item.goodsCount"
                  :name="item.cartItemId"
                  @change="numChange"
                />
              </div>
            </div>
          </div>
          <template #right>
            <van-button
              square
              icon="delete"
              type="danger"
              class="delete-button"
              @click="deleteGood(item.cartItemId)"
            />
          </template>
        </van-swipe-cell>
      </van-checkbox-group>
    </div>
    <!-- 合计 -->
    <van-submit-bar
      class="submit-all"
      v-if="list.length > 0"
      :price="total * 100"
      button-text="结算"
      @submit="onSubmit"
    >
      <van-checkbox @click="allCheck" v-model:checked="checkAll"
        >全选</van-checkbox
      >
    </van-submit-bar>
    <!-- 购物车为空 -->
    <div class="empty" v-else>
      <img
        class="empty-cart"
        src="//s.yezgea02.com/1604028375097/empty-car.png"
        alt="空购物车"
      />
      <div class="title">购物车空空如也</div>
      <van-button round color="#1baeae" type="primary" @click="goTo" block
        >前往选购</van-button
      >
    </div>

    <navBar />
  </div>
</template>

<script>
import sHeader from "@/components/simpleHeader";
import { getcartcount, modifyCart,deleteCart } from "@/servers/user";
import navBar from "@/components/NavBar";
import { computed, onMounted, reactive, toRefs } from "vue";
import { Toast } from "vant";
import { useRouter } from "vue-router";
export default {
  components: {
    sHeader,
    navBar,
  },
  setup() {
    const router = useRouter();
    const state = reactive({
      result: [], // 想买的id
      list: [],
      checkAll: true,
    });

    onMounted(() => {
      init();
    });
    
    const init = async () => {
      Toast.loading({ message: "加载中...", forbidClick: true });
      await getcartcount()
        .then((res) => {
          state.list = res.data.cartgoods || [];
          state.result = state.list.map((item) => item.cartItemId) || [];
        })
        .catch((err) => {});
      Toast.clear();
    };

    // 全选
    const allCheck = () => {
      if (!state.checkAll) {
        state.result = state.list.map((item) => item.cartItemId);
      } else {
        state.result = [];
      }
      state.checkAll = !state.checkAll;
    };

    // 总价格
    const total = computed(() => {
      let sum = 0;
      // filter过滤数组，返回被选中商品的ID的数据给_list   是个数组
      let _list = state.list.filter((item) =>
        state.result.includes(item.cartItemId)
      );
      _list.forEach((item) => {
        sum += item.goodsCount * item.sellingPrice;
      });
      return sum;
    });

    // 单选
    const groupChange = (result) => {
      // 复选框的事件参数，可以拿到单个复选框name值绑定的数据 也就是result的id数组
      // console.log(result);
      if (result.length == state.list.length) {
        state.checkAll = true;
      } else {
        state.checkAll = false;
      }
      state.result = result;
    };

    // 增减数量
    const numChange = async (value, detail) => {
      // value是这个里面的数值，detail是点击所属商品的id 因为绑定了一个name值
      // console.log(value,detail);
      if (
        state.list.filter((item) => item.cartItemId == detail.name)[0]
          .goodsCount == value
      )
        return;
      Toast.loading({ message: "修改中...", forbidClick: true });
      // 发接口请求，更新服务器上的数据 更新购物车表的goodsCount
      await modifyCart({
        cartItemId: detail.name,
        goodsCount: value,
      }).catch((err) => {});

      //用现有的数据更新页面
        state.list.filter((item)=>{
            if(item.cartItemId == detail.name){
                item.goodsCount = value
            }
        })
        Toast.clear()
    };

    // 删除  删除数据库和页面渲染的商品，购物车表的数据和页面渲染时list数组里面的数据
    const deleteGood = async(goodsId) => {
      // console.log(goodsId);

      await deleteCart({
        cartItemId: goodsId
      }).then((res)=>{
        // console.log(res);
      if(res.data.code == '80000'){
        state.list.forEach((item, index)=>{
          if(item.cartItemId == goodsId){
            state.list.splice(index,1)
          }
        })
        // state.list = state.list.filter((item) => {
        //   return item.cartItemId !== goodId
        // })
        // console.log(state.list);
      }

      }).catch((err)=>{})

    }

    const goTo = ()=>{
      router.push({ path: '/home'})
    }

    const onSubmit = () =>{
      if(state.result.length == 0){
        Toast.fail('请选择商品进行结算')
        return
      }
      // 把购物车中已经选择的想买的商品作为参数，路由传参给到订单页面
      const params = JSON.stringify(state.result)
      router.push({ path: '/createorder', query: { cartItemId: params }})

    }

    return {
      ...toRefs(state),
      allCheck,
      total,
      groupChange,
      numChange,
      deleteGood,
      goTo,
      onSubmit
    };
  },
};
</script>

<style lang="less">
@import "../common/style/mixin";
.cart-box {
  .cart-header {
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
    .cart-name {
      font-size: 14px;
    }
  }
  .cart-body {
    margin: 60px 0 100px 0;
    padding-left: 10px;
    padding-bottom: 100px;
    .good-item {
      display: flex;
      .good-img {
        img {
          .wh(100px, 100px);
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
    .delete-button {
      width: 50px;
      height: 100%;
    }
  }
  .empty {
    width: 50%;
    margin: 0 auto;
    text-align: center;
    margin-top: 200px;
    .empty-cart {
      width: 150px;
      margin-bottom: 20px;
    }
    .van-icon-smile-o {
      font-size: 50px;
    }
    .title {
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
  .submit-all {
    margin-bottom: 50px;
    .van-checkbox {
      margin-left: 10px;
    }
    .van-submit-bar__text {
      margin-right: 10px;
    }
    .van-submit-bar__button {
      background: @primary;
    }
  }
  .van-checkbox__icon--checked .van-icon {
    background-color: @primary;
    border-color: @primary;
  }
}
</style>