import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store.js'//所有的js度需要在这里 引用并声明 才能生效

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
