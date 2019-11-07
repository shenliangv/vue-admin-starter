import axios from 'axios'
import qs from 'qs'
import responseHandler from './response-handler'
import { requestHandlerPublic, requestHandlerYwt } from './request-handler'
import { requestConfigPublic, requestConfigYwt } from './config'

import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

interface Handler<V> {
  (value: V): V | Promise<V>
}

class HttpClient {
  public instance: AxiosInstance

  constructor(
    config: AxiosRequestConfig,
    requestHandler: Handler<AxiosRequestConfig>,
    responseHandler: Handler<AxiosResponse>
  ) {
    this.instance = axios.create(config)

    this.instance.interceptors.request.use(
      config => {
        return requestHandler ? requestHandler(config) : config
      },
      error => Promise.reject(error)
    )

    this.instance.interceptors.response.use(
      response => {
        return responseHandler ? responseHandler(response) : response
      },
      error => {
        error.response && responseHandler(error.response)
        return Promise.reject(error)
      }
    )
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const res = await this.instance.get<T>(url, config)

    return res.data
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const res = await this.instance.post<T>(url, data, config)

    return res.data
  }

  async postForm<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return await this.post<T>(
      url,
      qs.stringify(data),
      Object.assign({}, config, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
      })
    )
  }

  async postFile<T>(
    url: string,
    file: File,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const data = new FormData()

    data.append('file', file)

    return await this.post<T>(
      url,
      data,
      Object.assign({}, config, {
        headers: { 'content-type': 'multipart/form-data' }
      })
    )
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const res = await this.instance.put<T>(url, data, config)

    return res.data
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const res = await this.instance.delete<T>(url, config)

    return res.data
  }
}

export const httpClientYwt = new HttpClient(
  requestConfigYwt,
  requestHandlerYwt,
  responseHandler
)

export const httpClientPublic = new HttpClient(
  requestConfigPublic,
  requestHandlerPublic,
  responseHandler
)
