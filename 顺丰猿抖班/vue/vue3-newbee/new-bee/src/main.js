import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './common/style/base.less'
import Vant from 'vant';
import 'vant/lib/index.css';
import 'lib-flexible/flexible'


const app = createApp(App)

router.beforeEach((to,from,next)=>{
    document.title = to.meta.title
    next()
})



// 全局过滤器，防止盗用
app.config.globalProperties.$filters = {
    prefix(url){
        if(url&&url.startsWith('http')){
            return url
        }else{
            url = `http://47.99.134.126:28019${url}`
        }
    }
}


app.use(store).use(router).use(Vant).mount('#app')
