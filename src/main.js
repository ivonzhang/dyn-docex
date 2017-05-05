import Vue from 'vue'
// import axios from 'axios'
// Vue.prototype.$http = axios;


import App from './App.vue'
import $ from 'jquery'
import store from './store/store'
import router from './router/router'


/**
 * 不知道为何这么引用的话 原来写好的样式就错乱开来了
import './css/aui.css'
import './css/aui-flex.css'
import './css/aui-iconfont.css'
import './css/docex-common.css'
*/

Vue.config.debug = true;

window.log = console.log;

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
