<template>
  <el-aside :class="{ 'is-collapsed': $store.state.global.menuCollapse }">
    <el-scrollbar>
      <el-menu
        :default-active="$route.path"
        :router="true"
        :unique-opened="true"
        :collapse-transition="false"
        :collapse="$store.state.global.menuCollapse"
      >
        <menu-item v-for="menu in menus" :key="menu.path" :menu="menu" />
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script lang="ts">
import menuItem from './menu-item.vue'

import Vue from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import routes from '@/router/routes'
import { hasAuth } from '@/utils/auth'

import { CustomRouteConfig } from '@/types/vendor'

function filterRoutes(routes: CustomRouteConfig[]) {
  const _routes = routes.filter(route => {
    if (!route.meta || !route.meta.isMenu) {
      return false
    }

    return route.meta.auth ? hasAuth(route.meta.auth) : true
  })

  routes.splice(0)
  routes.push(..._routes)

  routes.forEach(route => {
    if (Array.isArray(route.children) && route.children.length > 0) {
      filterRoutes(route.children)
    }
  })
}

const _routes = cloneDeep(routes)

filterRoutes(_routes)

export default Vue.extend({
  components: { menuItem },

  data() {
    return { menus: _routes }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/var';

.el-aside {
  position: relative;
  width: $layout-siderbar-width !important;
  background-color: #fff;
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
  transition: width 0.3s ease-in-out;

  &.is-collapsed {
    width: $layout-siderbar-width-collapsed !important;
  }
}

.el-menu {
  width: $layout-siderbar-width;
  padding-top: 16px;
  border: none;

  // 防止出现水平滚动条
  &--collapse {
    width: $layout-siderbar-width-collapsed;
  }
}

.el-scrollbar {
  height: 100%;

  ::v-deep &__wrap {
    overflow-x: hidden;
  }

  ::v-deep &__bar {
    right: 0;
  }
}
</style>
