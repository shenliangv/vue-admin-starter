import state from './state'
import mutations from './mutations'
import actions from './actions'

import { Module } from 'vuex'
import { StateUser, StateRoot } from '@/types/store'

const module: Module<StateUser, StateRoot> = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default module
