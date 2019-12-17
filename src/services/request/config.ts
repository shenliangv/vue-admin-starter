import { AxiosRequestConfig } from 'axios'

type BuildEnv = 'dev' | 'staging' | 'prod'

interface RequestConfig {
  dev: AxiosRequestConfig
  staging: AxiosRequestConfig
  prod: AxiosRequestConfig
}

const BUILD_ENV: BuildEnv = process.env.VUE_APP_BUILD_ENV.toLowerCase()

const requestConfigsPublic: RequestConfig = {
  dev: {
    baseURL: 'http://192.168.0.230:8081'
  },
  staging: {
    baseURL: 'http://qa.api.auth.prisonpublic.com'
  },
  prod: {
    baseURL: ''
  }
}

const requestConfigsYwt: RequestConfig = {
  dev: {
    baseURL: 'http://47.107.245.151:8021/ywgk'
  },
  staging: {
    baseURL: 'http://47.107.245.151:8021/ywgk'
  },
  prod: {
    baseURL: ''
  }
}

console.log(BUILD_ENV, requestConfigsPublic, requestConfigsPublic[BUILD_ENV])
console.log(BUILD_ENV, requestConfigsYwt, requestConfigsYwt[BUILD_ENV])

export const requestConfigPublic = Object.assign(
  {},
  requestConfigsPublic[BUILD_ENV]
)

export const requestConfigYwt = Object.assign(
  {},
  {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  requestConfigsYwt[BUILD_ENV]
)

export default {}
