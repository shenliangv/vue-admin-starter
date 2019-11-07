import Vue from 'vue'
import Vuex from 'vuex'

import global from './global'
import user from './user'

import { StateRoot } from '@/types/store'

Vue.use(Vuex)

export default new Vuex.Store<StateRoot>({
  modules: { global, user }
})
