import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import routesPath from '@/router/routes-path'

import { AxiosResponse } from 'axios'
import { MessageType } from 'element-ui/types/message'

interface ResponseHandler {
  (res: AxiosResponse): AxiosResponse
}

interface HandlerMap {
  [prop: string]: ResponseHandler
}

const isSuccess = (status: string): boolean => status.startsWith('2')

const tip = (message: string = '操作失败', type: MessageType = 'error') => {
  Message({ type, message, duration: 3000, showClose: true })
}

const successHandler: ResponseHandler = res => {
  // TODO
  console.log('successHandler', res)
  return res
}

const errorHandlers: HandlerMap = {
  400: (res: AxiosResponse) => {
    tip(res.data.message)
    return res
  },
  401: res => {
    tip(res.data.message)
    store.dispatch('user/logout')
    router.push({
      path: routesPath.USER_LOGIN,
      query: { redirect: router.currentRoute.fullPath }
    })

    return res
  },
  403: res => {
    router.push(routesPath.ERROR_403)
    return res
  },
  404: res => {
    router.push(routesPath.ERROR_404)
    return res
  },
  500: res => {
    router.push(routesPath.ERROR_500)
    return res
  },
  default: res => {
    tip(res.data.message || '未知请求错误')
    return res
  }
}

export default (res: AxiosResponse): AxiosResponse => {
  const status = res.status.toString()

  if (isSuccess(status)) {
    return successHandler(res)
  } else {
    const errorHandler = errorHandlers[status] || errorHandlers.default
    return errorHandler(res)
  }
}
