<template>
  <div :class="['com-skeleton', { animation }]">
    <h3 class="com-skeleton__title"></h3>
    <ul class="com-skeleton__content">
      <li v-for="i in rows" :key="i"></li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ComSkeleton',

  props: {
    rows: {
      type: Number,
      default: 5
    },

    animation: {
      type: Boolean,
      default: true
    }
  }
})
</script>

<style lang="scss" scoped>
@keyframes ant-skeleton-loading {
  0% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
}

.com-skeleton {
  &__title,
  &__content li {
    height: 16px;
    margin-top: 16px;
    background-color: #f2f2f2;
  }

  &__title {
    width: 38.2%;
  }

  &__content {
    li {
      &:last-child {
        width: 61.8%;
      }
    }
  }

  &.animation {
    .com-skeleton__title,
    .com-skeleton__content li {
      background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
      background-size: 400% 100%;
      animation: ant-skeleton-loading 1.4s ease infinite;
    }
  }
}
</style>
