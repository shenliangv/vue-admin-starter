import Vue from 'vue'

import auth from './auth'
import focus from './focus'
import clickouter from './clickouter'

Vue.directive('auth', auth)
Vue.directive('focus', focus)
Vue.directive('clickouter', clickouter)
