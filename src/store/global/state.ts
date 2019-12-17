import { StateGlobal } from '@/types/store'

const state: StateGlobal = {
  // 是否收起菜单
  menuCollapse: false,

  // 权限列表
  authorities: [],

  // 动态缓存的组件名列表
  componentsKeepAlive: []
}

export default state
