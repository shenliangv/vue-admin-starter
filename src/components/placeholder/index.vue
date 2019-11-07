<template>
  <div class="com-placeholder">
    <img :src="url" :alt="title" />
    <h3>{{ title }}</h3>
    <p>{{ content }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ComPlaceholder',

  props: {
    url: String,
    title: String,
    content: String
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/var';

.com-placeholder {
  padding: 32px;
  text-align: center;

  h3 {
    margin-top: 24px;
    line-height: 1.8;
    font-size: 24px;
    color: $title-color;
  }

  p {
    color: $--color-text-secondary;
  }
}
</style>
