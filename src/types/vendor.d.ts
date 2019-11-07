import { RouteConfig } from 'vue-router'

interface RouteMeta {
  /**
   * @param 标题，会作为浏览器标签页标题和面包屑路径名
   */
  title?: string

  /**
   * @param 路由权限列表，用户有列表中的任意一个权限即可访问该路由
   */
  auth?: string | string[]

  /**
   * @param 菜单 icon 类名
   */
  icon?: string

  /**
   * @param 是否显示在菜单上
   */
  isMenu?: boolean

  /**
   * @param 不检查登录
   */
  noCheckLogin?: boolean
}

export interface CustomRouteConfig extends RouteConfig {
  meta?: RouteMeta
}
