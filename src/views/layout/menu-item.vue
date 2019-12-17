<template>
  <el-submenu
    v-if="menu.children && menu.children.length > 0"
    :index="menu.path"
  >
    <template v-slot:title>
      <i :class="menu.meta.icon || 'el-icon-document'"></i>
      <span>{{ menu.meta.title }}</span>
    </template>
    <menu-item
      v-for="childMenu in menu.children"
      :key="childMenu.path"
      :menu="childMenu"
    />
  </el-submenu>
  <el-menu-item v-else :index="menu.path">
    <template v-slot:title>
      <i :class="menu.meta.icon || 'el-icon-document'"></i>
      <span>{{ menu.meta.title }}</span>
    </template>
  </el-menu-item>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'MenuItem',
  props: {
    menu: Object
  }
})
</script>
