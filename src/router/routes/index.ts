import routesPath from '../routes-path'

import examples from './examples'
import dashboard from './dashboard'
import user from './user'
import error from './error'

import { CustomRouteConfig } from '@/types/vendor'

const routes: CustomRouteConfig[] = [
  { path: '/', redirect: routesPath.DASHBORD },
  ...dashboard,
  ...examples,
  ...user,
  ...error,
  { path: '*', redirect: routesPath.ERROR_404 }
]

export default routes
