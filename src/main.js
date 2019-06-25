// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import VueAreaLinkage from 'vue-area-linkage';
// import VuePaginate from 'vue-paginate'
// import lodash from 'lodash'
import axios from 'axios'
import router from './router'
import store from './store'
import utils from './assets/utils'
import './assets/stylus/base'
import echarts from 'echarts'

import './assets/font-awesome/css/font-awesome.min.css'

import { Datetime, XProgress, Popup } from 'vux'

Vue.component('datetime', Datetime)
Vue.component('XProgress', XProgress)
Vue.component('Popup', Popup)

Vue.config.productionTip = false

//双击
Vue.directive('longpress', {
  bind: function (el, binding, vNode) {
    // Define variable         
    let pressTimer = null
    // Define funtion handlers         
    // Create timeout ( run function after 1s )         
    let start = (e) => {
      // e.preventDefault()         
      if (e.type === 'click' && e.button !== 0) {
        return;
      }
      if (pressTimer === null) {
        pressTimer = setTimeout(() => {
          binding.value()
        }, 1000)
      }
    }         // Cancel Timeout         
    let cancel = (e) => {
      // Check if timer has a value or not             
      if (pressTimer !== null) {
        clearTimeout(pressTimer)
        pressTimer = null
      }
    }         // Run Function         
    const handler = () => {
      binding.value()
    }
    // Add Event listeners         
    setTimeout(el.addEventListener("mousedown", start), 200);
    setTimeout(el.addEventListener("touchstart", start), 200);
    // Cancel timeouts if this events happen        
    el.addEventListener("click", cancel);
    el.addEventListener("mouseout", cancel);
    el.addEventListener("touchend", cancel);
    el.addEventListener("touchcancel", cancel);
  }
})

// axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://apidgb.dian19.com'
// axios.defaults.headers = {
//   "pusern": "47,admin,16d585d6f776868bac86b61bc91f91e6"
// }
Vue.prototype.$axios = axios
Vue.prototype.$youUtils = utils
Vue.prototype.$echarts = echarts
// Vue.prototype._ = lodash

Date.prototype.Format = function (fmt) { //author: meizz   
  var o = {
    "M+": this.getMonth() + 1,                 //月份   
    "d+": this.getDate(),                    //日   
    "h+": this.getHours(),                   //小时   
    "m+": this.getMinutes(),                 //分   
    "s+": this.getSeconds(),                 //秒   
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
    "S": this.getMilliseconds()             //毫秒   
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

router.beforeEach((to, from, next) => {
  if (to.meta.title) document.title = to.meta.title
  next()
})


/* eslint-disable no-new */
new Vue({
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
}).$mount('#app')
