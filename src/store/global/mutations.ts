import { mutationsGlobal } from '@/store/mutation-types'

import { MutationTree } from 'vuex'
import { StateGlobal } from '@/types/store'

const mutations: MutationTree<StateGlobal> = {
  [mutationsGlobal.TOGGLE_MENU_COLLAPSE]: state => {
    state.menuCollapse = !state.menuCollapse
  }
}

export default mutations
