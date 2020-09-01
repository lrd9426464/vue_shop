import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//导入全局样式
import './assets/css/global.css'
//导入字体图标
import './assets/font_e13emz5ykdr/iconfont.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

import axios from 'axios';
axios.interceptors.request.use(config=>{
  console.log(config);
  config.headers.Authorization=window.sessionStorage.getItem("token")
  // 在最后必须return config
  return config;
})
Vue.prototype.axios=axios;
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
