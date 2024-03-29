import 'core-js'
import Vue from 'vue'

import '@/components'
import '@/common/directives'
import '@/common/plugins'

import router from './router'
import store from './store'

import 'nprogress/nprogress.css'
import './assets/styles/index.scss'

import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
