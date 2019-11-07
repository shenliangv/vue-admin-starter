<template>
  <div class="examples-components block">
    <com-editor v-model="content" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ComEditor } from '@/components'

export default Vue.extend({
  components: { ComEditor },

  data() {
    return { content: 'Hello World!' }
  }
})
</script>
