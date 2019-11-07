import { mutationsGlobal } from '../mutation-types'

import { ActionTree } from 'vuex'
import { StateGlobal, StateRoot } from '@/types/store'

const actions: ActionTree<StateGlobal, StateRoot> = {
  toggleMenuCollapse({ commit }) {
    commit(mutationsGlobal.TOGGLE_MENU_COLLAPSE)
  }
}

export default actions
