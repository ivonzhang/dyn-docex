import Vue from 'vue'
// import axios from 'axios'
// Vue.prototype.$http = axios;


import App from './App.vue'
import $ from 'jquery'
import store from './store/store'
import router from './router/router'

Vue.config.debug = true;

window.log = console.log;

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
