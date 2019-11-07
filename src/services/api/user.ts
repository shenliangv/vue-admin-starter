import { httpClientPublic } from '../request'

import { LoginAccount, LoginMobile } from '@/types/request-params/user'
import { Jwt } from '@/types/response-data/user'

export function fetchCode(phoneNumber: string): Promise<void> {
  return httpClientPublic.post<void>('/sms/verification-codes', { phoneNumber })
}

export function login(data: LoginAccount | LoginMobile): Promise<Jwt> {
  return httpClientPublic.postForm<Jwt>('/oauth/token', data, {
    auth: {
      username: 'visit.admin',
      password: '3cceca7160774a40b01c7fdadfb37da0'
    }
  })
}
