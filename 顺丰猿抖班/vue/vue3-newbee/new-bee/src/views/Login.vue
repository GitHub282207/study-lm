<template>
  <div class="login">
    <!-- 头部 -->
    <sHeader :name="state.type == 'login' ? '登录' : '注册'"></sHeader>
    <img
      class="logo"
      src="//s.yezgea02.com/1604045825972/newbee-mall-vue3-app-logo.png"
      alt=""
    />
    <!-- 登录 -->
    <div class="login-body login" v-if="state.type == 'login'">
      <van-form @submit="onSubmit">
        <van-field
          v-model="state.username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="state.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="state.verify"
          name="验证码"
          label="验证码"
          placeholder="请输入验证码"
        >
          <template #button>
            <verify ref="verifyRef" />
          </template>
        </van-field>
        <div style="margin: 16px">
          <div class="link-register" @click="toggle('register')">
            还没有账号？立即注册
          </div>
          <van-button
            round
            block
            color="#1baeae"
            type="primary"
            native-type="submit"
          >
            登录
          </van-button>
        </div>
      </van-form>
    </div>
    <!-- 注册 -->
    <div class="login-body register" v-else>
       <van-form @submit="onSubmit">
        <van-field
          v-model="state.username1"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="state.password1"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="state.verify"
          name="验证码"
          label="验证码"
          placeholder="请输入验证码"
        >
          <template #button>
            <verify ref="verifyRef" />
          </template>
        </van-field>
        <div style="margin: 16px;">
          <div class="link-login" @click="toggle('login')">已有登录账号</div>
          <van-button round block color="#1baeae" type="info" native-type="submit">注册</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import sHeader from "@/components/simpleHeader";
import verify from "@/components/verify";
import { register, login } from "@/servers/user";
import { useRouter } from 'vue-router'
import { Toast } from "vant";
import { reactive, ref } from "vue";
export default {
  components: {
    sHeader,
    verify,
  },
  setup() {
    const router = useRouter()
    const verifyRef = ref(null)
    const state = reactive({
      username: "",
      password: "",
      verify: "",
      type: "login",
      username1: "",
      password1: "",
      imgCode: "",
    });
    const toggle = (v) => {
      // console.log(v);
      state.type = v;
      state.verify = "";
    };

    const onSubmit = async() => {
      // console.log(verifyRef.value.imgCode); //拿到输入的验证码
      state.imgCode = verifyRef.value.imgCode || "";
      if (state.verify.toLowerCase() !== state.imgCode.toLowerCase()) {
        Toast.fail("验证码有误！");
        return;
      }
      if (state.type == "login") {
        await login({
          username: state.username.trim(),
          password: state.password.trim(),
        }).then((res) => {
          console.log(res.data.token);
          // console.log(res.token,token,'123');
          localStorage.setItem('token',res.data.token)         
          router.push('/home') 
        }).catch((err) => {})
      } else {
        await register({
          username: state.username1.trim(),
          password: state.password1.trim(),
        }).then((res) =>{
          console.log(res);
          Toast.success("注册成功")
        });
      }
    };
    return {
      state,
      toggle,
      verifyRef,
      onSubmit,
    };
  },
};
</script>

<style lang="less">
.login {
  .logo {
    width: 120px;
    height: 120px;
    display: block;
    margin: 80px auto 20px;
  }
  .login-body {
    padding: 0 20px;
  }
  .login {
    .link-register {
      font-size: 14px;
      margin-bottom: 20px;
      color: #1989fa;
      display: inline-block;
    }
  }
  .register {
    .link-login {
      font-size: 14px;
      margin-bottom: 20px;
      color: #1989fa;
      display: inline-block;
    }
  }
  .verify-bar-area {
    margin-top: 24px;
    .verify-left-bar {
      border-color: #1baeae;
    }
    .verify-move-block {
      background-color: #1baeae;
      color: #fff;
    }
  }
  .van-field__label {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .verify {
    > div {
      width: 100%;
    }
    display: flex;
    justify-content: center;
    .cerify-code-panel {
      margin-top: 16px;
    }
    .verify-code {
      width: 40% !important;
      float: left !important;
    }
    .verify-code-area {
      float: left !important;
      width: 54% !important;
      margin-left: 14px !important;
      .varify-input-code {
        width: 90px;
        height: 38px !important;
        border: 1px solid #e9e9e9;
        padding-left: 10px;
        font-size: 16px;
      }
      .verify-change-area {
        line-height: 44px;
      }
    }
  }
}
</style>