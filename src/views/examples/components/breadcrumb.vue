<template>
  <div class="examples-components">
    <com-breadcrumb class="block" />
    <com-breadcrumb class="block" separator-class="el-icon-arrow-right" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ComBreadcrumb } from '@/components'

export default Vue.extend({
  components: { ComBreadcrumb }
})
</script>
