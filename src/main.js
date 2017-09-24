import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import faskclick from 'fastclick'

import store from './store'

import 'common/stylus/index.styl'
faskclick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App),
  router
})
