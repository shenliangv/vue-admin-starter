import { httpClientPublic } from '../request'

import { LoginAccount, LoginMobile } from '@/types/request-params/user'
import { Jwt } from '@/types/response-data/user'

export function fetchCode(phoneNumber: string): Promise<void> {
  // return httpClientPublic.post<void>('/sms/verification-codes', { phoneNumber })
  return Promise.resolve()
}

export function login(data: LoginAccount | LoginMobile): Promise<Jwt> {
  // return httpClientPublic.postForm<Jwt>('/oauth/token', data, {
  //   auth: {
  //     username: 'visit.admin',
  //     password: '3cceca7160774a40b01c7fdadfb37da0'
  //   }
  // })
  return Promise.resolve({
    access_token: '',
    token_type: 'bearer',
    refresh_token: '',
    expires_in: 86399,
    scope: 'all',
    organization: '',
    tenant: '',
    group: '',
    jti: ''
  })
}
