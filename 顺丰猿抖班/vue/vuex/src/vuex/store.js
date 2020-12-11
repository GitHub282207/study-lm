import Vue from 'vue'
// 要让该文件与项目有关系，要让这个项目里面能够集成vuex的功能去使用  让vuex在vue下生效
import Vuex from 'vuex'

Vue.use(Vuex)//Vue结合了vuex的功能

const state = { // state 公共数据源
  count: 1
}

const mutations = { // mutation 方法
  add(state, num) {
    state.count += num
  },
  reduce(state) {
    state.count--
  }
}
const getters = { // getters 计算属性
  newCount: () => {
    return state.count ** 2
  }
}
const actions = {
  addAction (context, n) { // 不会去主动修改数据源的数据
    setTimeout(() => {
      context.commit('add', n)
    }, 3000)
    console.log('我先出现');
  }
}
const moduleA = {
  state,
  mutations,
  getters,
  actions
}
const state2 = {

}
const moduleB = {
  state2
}
export default new Vuex.Store({//让结合了vuex的vue能够到全局生效
  modules: {
    a: moduleA,
    b: moduleB
  }
})

// mutation 是同步代码 自动进入任务队列
// actions 是异步代码,等执行栈全部执行完清空之后再运行