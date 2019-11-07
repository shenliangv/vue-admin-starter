import { _import } from '../helper'
import { ErrorType } from '@/common/dict/constants'
import routesPath from '../routes-path'

import { CustomRouteConfig } from '@/types/vendor'

// TODO: 这里为了演示加了 isMenu: true，生产环境要删除
const routes: CustomRouteConfig[] = [
  {
    path: routesPath.ERROR,
    redirect: routesPath.ERROR_404,
    component: _import('layout/the-layout'),
    meta: { title: '异常', icon: 'el-icon-warning-outline', isMenu: true },
    children: [
      {
        path: routesPath.ERROR_403,
        component: _import('error/error'),
        props: { errorType: ErrorType.ERROR_403 },
        meta: { title: '403', isMenu: true }
      },
      {
        path: routesPath.ERROR_404,
        component: _import('error/error'),
        props: { errorType: ErrorType.ERROR_404 },
        meta: { title: '404', isMenu: true }
      },
      {
        path: routesPath.ERROR_500,
        component: _import('error/error'),
        props: { errorType: ErrorType.ERROR_500 },
        meta: { title: '500', isMenu: true }
      },
      {
        path: routesPath.ERROR_NETWORK,
        component: _import('error/error'),
        props: { errorType: ErrorType.ERROR_NETWORK },
        meta: { title: '网络故障', isMenu: true }
      }
    ]
  }
]

export default routes
