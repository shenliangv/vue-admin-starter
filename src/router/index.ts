import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'

import store from '@/store'
import routes from './routes'
import routesPath from './routes-path'
import { unique } from '@/utils/lang'
import { hasLogin } from '@/utils/auth'

Vue.use(VueRouter)

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return { selector: to.hash }
    } else {
      return { x: 0, y: 0 }
    }
  }
})

NProgress.configure({ showSpinner: false })

// TODO 登录校验
router.beforeEach((to, from, next) => {
  NProgress.start()

  console.log('login validation', hasLogin(), to)
  if (to.meta && to.meta.noCheckLogin) {
    return next()
  }

  if (hasLogin()) {
    next()
  } else {
    next({ path: routesPath.USER_LOGIN, query: { redirect: to.fullPath } })
  }
})

// TODO 路由权限校验
router.beforeEach((to, from, next) => {
  console.log('auth validation', to)
  next()
})

// 动态缓存组件
router.beforeEach((to, from, next) => {
  if (to.meta.componentsUnRemoveKeepAlive) {
    const components = store.state.global.componentsKeepAlive.filter(comp => {
      return to.meta.componentsUnRemoveKeepAlive.includes(comp)
    })

    store.dispatch('global/setComponentsKeepAlive', unique(components))
  } else {
    // 默认移除所有动态缓存的组件
    store.dispatch('global/setComponentsKeepAlive', [])
  }

  // 缓存组件
  if (to.meta.componentsToKeepAlive) {
    store.dispatch(
      'global/setComponentsKeepAlive',
      unique([
        ...to.meta.componentsToKeepAlive,
        ...store.state.global.componentsKeepAlive
      ])
    )
  }

  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
