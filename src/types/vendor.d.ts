import { RouteConfig } from 'vue-router'

interface RouteMeta {
  // 标题，会作为浏览器标签页标题和面包屑路径名
  title?: string

  // 路由权限列表，用户拥有列表中的任意一个权限即可访问该路由
  auth?: string | string[]

  // 需要动态缓存的组件名列表
  componentsToKeepAlive?: string[]

  /**
   * 路由跳转之后，默认会清空动态缓存组件列表，之前动态缓存的组件，
   * 将会失去缓存状态。如果某些组件需要继续保持缓存状态，可将组件名添加到
   * componentsUnRemoveKeepAlive 列表中
   */
  componentsUnRemoveKeepAlive?: string[]

  // 菜单 icon 类名
  icon?: string

  // 该路由是否显示在菜单上
  isMenu?: boolean

  // 该路由不进行登录校验
  noCheckLogin?: boolean
}

export interface CustomRouteConfig extends RouteConfig {
  meta?: RouteMeta
  children?: CustomRouteConfig[]
}
