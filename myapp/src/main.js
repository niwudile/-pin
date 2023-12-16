import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./element"
import axios from 'axios'


Vue.prototype.EventBus=new Vue()
axios.defaults.baseURL="http://localhost:3000/"
Vue.prototype.axios=axios
Vue.use(ElementUI);
Vue.config.productionTip = false

axios.interceptors.request.use((item)=>{
   let token=sessionStorage.getItem("token")
  if(token){
      item.headers.Authorization=token
  }
  return item
})
 

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
