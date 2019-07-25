import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import axios from "axios"

Vue.prototype.axios = axios;
Vue.config.productionTip = false;
//由于后台给出的电影海报图片地址  宽度和高度为动态的数据，因此在main入口文件中定义一个全局的过滤器
Vue.filter('setImg',(url,arg)=>{
    return url.replace(/w\.h/,arg);
})

//  ------------------全局组件------------------
//页面滚动组件
import Scroller from "./components/Scroller/Scroller.vue"
Vue.component("Scroller",Scroller);
// loading加载动画
import Loading from "./components/Loading/Loading.vue"
Vue.component("Loading",Loading);


// 全局引入elementUI组件
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
