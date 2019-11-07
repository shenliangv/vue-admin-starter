import { _import } from '../helper'
import routesPath from '../routes-path'

import { CustomRouteConfig } from '@/types/vendor'

// TODO: 这里为了演示加了 isMenu: true，生产环境要删除
const routes: CustomRouteConfig[] = [
  {
    path: routesPath.USER,
    component: _import('layout/the-layout'),
    meta: { title: '用户', isMenu: true },
    children: [
      {
        path: routesPath.USER_CENTER,
        component: _import('user/user-center'),
        meta: { title: '个人中心', isMenu: true }
      },
      {
        path: routesPath.USER_SETTING,
        component: _import('user/user-setting'),
        meta: { title: '个人设置', isMenu: true }
      }
    ]
  },
  {
    path: routesPath.USER_LOGIN,
    component: _import('user/login'),
    meta: { title: '登录', noCheckLogin: true }
  }
]

export default routes
