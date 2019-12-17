import { mutationsGlobal } from '../mutation-types'

import { ActionTree } from 'vuex'
import { StateGlobal, StateRoot } from '@/types/store'

const actions: ActionTree<StateGlobal, StateRoot> = {
  toggleMenuCollapse({ commit }) {
    commit(mutationsGlobal.TOGGLE_MENU_COLLAPSE)
  },

  setComponentsKeepAlive({ commit }, paload) {
    commit(mutationsGlobal.SET_COMPONENTS_KEEPALIVE, paload)
  }
}

export default actions
