<template>
  <el-breadcrumb v-bind="$attrs">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item
      v-for="route in routes"
      :key="route.path"
      :to="route.path"
    >
      {{ route.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ComBreadcrumb',

  computed: {
    routes() {
      return this.$route.matched.filter(route => route.meta && route.meta.title)
    }
  }
})
</script>

<style lang="scss" scoped>
::v-deep .el-breadcrumb__inner.is-link {
  font-weight: normal;
}
</style>
