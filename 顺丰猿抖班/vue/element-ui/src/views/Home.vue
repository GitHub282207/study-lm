<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="title">旅梦管理系统</div>
        <div class="info">
          <!-- 自己绑定的方法拿到数据源同级的methods里面写-->
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item comnand="1">修改密码</el-dropdown-item>
              <el-dropdown-item command="2">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="1-1"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>学生列表</span>
              </template>
              <!-- userinfo为home页面的二级路由，实现左侧菜单不动右侧信息框内容的转换显示  router里的index.js中配置，先引入在在home路由里面加上children里面配置 -->
              <el-menu-item index="/home/userInfo">
                <span slot="title">酒神</span>
              </el-menu-item>
              <el-menu-item index="/home/form">
                <span slot="title">小敏</span>
              </el-menu-item>
              <el-menu-item index="1-3">
                <span slot="title">周老板</span>
              </el-menu-item>
              
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">作业情况</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 右侧菜单配置路由路口 右侧就可以被home页面的二级路由所控制 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
    };
  },
  created() {//生命周期函数，与data同级
    this.username = localStorage.getItem("username");//把从本地拿到的值存到自己的数据源里才可以使用，之后就是页面挖坑
  },
  methods: {
    handleCommand(e) {//e是回调参数，能拿到command设置的值
      if (e == 2) {
        this.$router.push("/");//跳去登录界面
        localStorage.removeItem("username");//清除本地缓存中的账户名信息   localStorage.clear清除本地所有的缓存
      }
    },
  },
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  /* line-height: 200px; */
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  /* line-height: 160px; */
}

body > .el-container {
  margin-bottom: 40px;
}
.el-container {
  height: calc(100vh - 60px);
}
.title {
  float: left;
  font-weight: 700;
  font-size: 24px;
}
.info {
  float: right;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-menu{
  height: 100%;
}
/* 解决突出来的一像素 */
.el-submenu .el-menu-item{
  min-width: auto !important;
}
</style>