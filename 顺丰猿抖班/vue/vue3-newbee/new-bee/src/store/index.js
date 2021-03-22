import { createStore } from 'vuex'
// import { getcartcount } from '@/servers/user'
export default createStore({
  state: {
    goodsCount:0
  },
  mutations: {
    addcart(state,payload){
      state.goodsCount = payload.count
    }
  },
  actions: {
    async updataCart(){
      await getcartcount().then(res=>{
        console.log(res);
      })
    }
  },
  modules: {
  }
})
