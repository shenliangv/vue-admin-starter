/**
 * 示例用的路由，生产环境需删除
 */
import { _import } from '../helper'

import { CustomRouteConfig } from '@/types/vendor'

const routes: CustomRouteConfig[] = [
  {
    path: '/examples/components',
    component: _import('layout/the-layout'),
    redirect: '/examples/components/skeleton',
    meta: { title: '通用组件', icon: 'el-icon-document-copy', isMenu: true },
    children: [
      {
        path: '/examples/components/skeleton',
        component: _import('examples/components/skeleton'),
        meta: { title: '骨架屏', isMenu: true }
      },
      {
        path: '/examples/components/breadcrumb',
        component: _import('examples/components/breadcrumb'),
        meta: { title: '面包屑', isMenu: true }
      },
      {
        path: '/examples/components/filter',
        component: _import('examples/components/filter'),
        meta: { title: '过滤器', isMenu: true }
      },
      {
        path: '/examples/components/table',
        component: _import('examples/components/table'),
        meta: { title: '动态表格', isMenu: true }
      },
      {
        path: '/examples/components/rich-text',
        component: _import('examples/components/rich-text'),
        meta: { title: '富文本编辑器', isMenu: true }
      }
    ]
  }
]

export default routes
