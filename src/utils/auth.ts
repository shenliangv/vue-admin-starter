import store from '@/store'
import constants from '@/common/dict/constants'

const _hasAuth = (auth: string) => store.state.global.authorities.includes(auth)

export function hasAuth(auth: string | string[]): boolean {
  if (Array.isArray(auth)) {
    return auth.some(s => _hasAuth(s))
  } else {
    return _hasAuth(auth)
  }
}

export function hasLogin(): boolean {
  return Boolean(localStorage.getItem(constants.TOKEN_KEY))
}
