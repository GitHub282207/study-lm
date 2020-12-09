import Vue from 'vue'
// 接下来不用把其他页面引入，其他页面直接引入在App.vue中 所有.vue后缀的文件统一归App.vue管  
// 要在页面上展示效果，就一定要在App.vue里面引入
import App from './App.vue'//引入整个App.vue的代码，再交给render函数拿去编译
import router from './router/index'//前面的router要小写


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),//把模板文件拿到render函数里面编译 
}).$mount('#app')//相当于el挂载
