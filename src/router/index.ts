import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'

import routes from './routes'
import routesPath from './routes-path'
import { hasLogin } from '@/utils/auth'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
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
  console.log('login validation', to)
  if (to.meta && to.meta.noCheckLogin) {
    return next()
  }

  console.log('hasLogin()', hasLogin(), routesPath.USER_LOGIN)
  hasLogin() ? next() : next(routesPath.USER_LOGIN)
})

// TODO 路由权限校验
router.beforeEach((to, from, next) => {
  console.log('auth validation', to)
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
