<template>
  <div class="examples-components">
    <com-skeleton class="block" />
    <com-skeleton class="block" />
    <com-skeleton class="block" :animation="false" />
    <com-skeleton class="block" :rows="3" />
    <com-skeleton class="block" :rows="6" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ComSkeleton } from '@/components'

export default Vue.extend({
  components: { ComSkeleton }
})
</script>

<style lang="scss" scoped>
.examples-components {
  display: flex;
  flex-wrap: wrap;
}

.com-skeleton {
  margin-bottom: 20px;
  margin-right: 20px;
  width: 100%;

  &:nth-child(1) {
    width: 22%;
  }

  &:nth-child(2) {
    width: 22%;
  }

  &:nth-child(3) {
    // width: 22%;
    flex: 1;
  }
}
</style>
