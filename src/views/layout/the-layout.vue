<template>
  <el-container direction="vertical" class="app-container">
    <the-header />

    <el-container>
      <the-aside />

      <el-container direction="vertical" class="main-container">
        <el-scrollbar>
          <el-main>
            <router-view />
          </el-main>
          <the-footer />
        </el-scrollbar>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import Vue from 'vue'

import TheHeader from './the-header'
import TheFooter from './the-footer'
import TheAside from './the-aside'

export default Vue.extend({
  components: { TheHeader, TheFooter, TheAside }
})
</script>

<style lang="scss" scoped>
@import '../../assets/styles/var';

.app-container {
  background-color: #f0f2f5;
}

.main-container {
  height: $layout-main-height;
}

.el-aside {
  height: $layout-main-height;
}

.el-scrollbar {
  height: 100%;

  ::v-deep .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  ::v-deep .el-scrollbar__view {
    display: flex;
    flex-direction: column;
    min-height: $layout-main-height;
  }
}
</style>
