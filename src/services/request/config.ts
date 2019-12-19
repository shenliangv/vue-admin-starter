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
    baseURL: ''
  },

  staging: {
    baseURL: ''
  },

  prod: {
    baseURL: ''
  }
}

const requestConfigsYwt: RequestConfig = {
  dev: {
    baseURL: ''
  },

  staging: {
    baseURL: ''
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
