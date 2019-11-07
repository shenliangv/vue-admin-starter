import { jwt } from '@/utils/helper'

import { AxiosRequestConfig } from 'axios'

export function requestHandlerPublic(
  config: AxiosRequestConfig
): AxiosRequestConfig {
  const st = Date.now()
  const { access_token, token_type } = jwt()
  console.log('解密耗时：', Date.now() - st, Date.now(), st)

  if (access_token) {
    config.headers.Authorization = `${token_type} ${access_token}`
  }

  return config
}

export function requestHandlerYwt(
  config: AxiosRequestConfig
): AxiosRequestConfig {
  return config
}
