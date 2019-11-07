import { _import } from '../helper'
import routesPath from '../routes-path'

import { CustomRouteConfig } from '@/types/vendor'

const routes: CustomRouteConfig[] = [
  {
    path: routesPath.DASHBORD,
    component: _import('layout/the-layout'),
    redirect: routesPath.DASHBORD_WORKBENCH,
    meta: { title: 'Dashboard', icon: 'el-icon-odometer', isMenu: true },
    children: [
      {
        path: routesPath.DASHBORD_WORKBENCH,
        component: _import('dashboard/workbench'),
        meta: { title: '工作台', isMenu: true }
      }
    ]
  }
]

export default routes
