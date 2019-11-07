import router from '@/router'
import routesPath from '@/router/routes-path'
import { saveJwt, clearJwt } from '@/utils/helper'
import { fetchCode, login } from '@/services/api/user'
import { mutationsUser } from '../mutation-types'

import { ActionTree } from 'vuex'
import { StateUser, StateRoot } from '@/types/store'
import { LoginAccount, LoginMobile } from '@/types/request-params/user'
import { Jwt } from '@/types/response-data/user'

const actions: ActionTree<StateUser, StateRoot> = {
  async fetchCode({ commit }, payload: string): Promise<void> {
    return await fetchCode(payload)
  },

  async login({ commit }, payload: LoginAccount | LoginMobile): Promise<Jwt> {
    const jwt = await login(payload)

    saveJwt(jwt)
    commit(mutationsUser.SET_JWT, jwt)

    return jwt
  },

  async loginByAccount({ dispatch }, payload: LoginAccount): Promise<Jwt> {
    return dispatch('login', payload)
  },

  async loginByMobile({ dispatch }, payload: LoginMobile): Promise<Jwt> {
    return dispatch('login', payload)
  },

  logout({ commit }) {
    clearJwt()
    commit(mutationsUser.SET_JWT, {})
    router.push(routesPath.USER_LOGIN)
  }
}

export default actions
