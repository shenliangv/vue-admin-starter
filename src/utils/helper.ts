import constants from '@/common/dict/constants'
import { decrypt, encrypt } from './crypto'

import { Jwt } from '@/types/response-data/user'

/**
 * 从 localStorage 获取 jwt
 */
export function jwt(): Jwt {
  const token = localStorage.getItem(constants.TOKEN_KEY)

  return token ? JSON.parse(decrypt(token)) : {}
}

/**
 * 将 jwt 存储到 localStorage
 * @param jwt 登录之后后台返回的 jwt
 */
export function saveJwt(jwt: Jwt) {
  localStorage.setItem(constants.TOKEN_KEY, encrypt(JSON.stringify(jwt)))
}

/**
 * 删除 localStorage 中存储的 jwt
 */
export function clearJwt() {
  localStorage.removeItem(constants.TOKEN_KEY)
}
