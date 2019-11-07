import { mutationsUser } from '@/store/mutation-types'

import { MutationTree } from 'vuex'
import { StateUser } from '@/types/store'
import { Jwt } from '@/types/response-data/user'

const mutations: MutationTree<StateUser> = {
  [mutationsUser.SET_JWT]: (state, payload: Jwt) => {
    state.jwt = payload
  }
}

export default mutations
