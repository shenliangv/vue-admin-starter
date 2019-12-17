import { mutationsGlobal } from '@/store/mutation-types'

import { MutationTree } from 'vuex'
import { StateGlobal } from '@/types/store'

const mutations: MutationTree<StateGlobal> = {
  [mutationsGlobal.TOGGLE_MENU_COLLAPSE]: state => {
    state.menuCollapse = !state.menuCollapse
  },

  [mutationsGlobal.SET_COMPONENTS_KEEPALIVE]: (state, payload) => {
    state.componentsKeepAlive = payload
  }
}

export default mutations
