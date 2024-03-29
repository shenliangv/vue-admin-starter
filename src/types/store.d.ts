import { Jwt } from './response-data/user'

export interface StateRoot {
  global: StateGlobal
}

export interface StateGlobal {
  menuCollapse: boolean
  authorities: string | string[]
  componentsKeepAlive: string[]
}

export interface StateUser {
  jwt: Jwt
}
