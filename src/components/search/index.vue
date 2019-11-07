<template>
  <el-autocomplete
    ref="autocomplete"
    v-bind="$attrs"
    v-model="keyword"
    :class="['com-search', { 'is-active': inputVisible }]"
    :fetch-suggestions="onFetchSuggestions"
    @keydown.enter.native="onSearch"
    @select="onSelect"
  >
    <template v-slot:prefix>
      <i class="el-icon-search" @click="onToggleInputVisible"></i>
    </template>
  </el-autocomplete>
</template>

<script lang="ts">
import Vue from 'vue'

import { PlainObject } from '../../types/base'

export default Vue.extend({
  name: 'ComSearch',

  props: {
    search: {
      type: Function,
      default: function(keyword: string) {}
    },

    fetchSuggestions: {
      type: Function,
      default: function(keyword: string, cb: (data: any[]) => void) {
        cb([])
      }
    },

    valueKey: {
      type: String,
      default: 'value'
    }
  },

  data() {
    return {
      inputVisible: false,
      keyword: ''
    }
  },

  watch: {
    inputVisible(val) {
      const autocompleteEl = this.$refs.autocomplete as any

      if (val) {
        setTimeout(() => {
          autocompleteEl.focus()
        }, 400)
      } else {
        autocompleteEl.close()
      }
    }
  },

  methods: {
    onFetchSuggestions(keyword: string, cb: Function) {
      const kw = keyword

      kw ? this.fetchSuggestions(kw, cb) : cb([])
    },

    onSelect(item: PlainObject) {
      this.search(item[this.valueKey])
    },

    onSearch(event: Event) {
      const kw = (event.target as HTMLInputElement).value.trim()

      if (kw) {
        this.search(kw)
      }
    },

    onToggleInputVisible() {
      this.inputVisible = !this.inputVisible
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/var';
@import '@/assets/styles/mixins';

.com-search {
  ::v-deep .el-input__inner {
    box-sizing: border-box;
    width: 0;
    height: 32px;
    padding: 4px 0;
    border: none;
    border-bottom: 1px solid $--border-color-base;
    border-radius: 0;
    line-height: 32px;
    color: $--color-text-primary;
    transition: width 0.3s;

    &:focus {
      border-color: $--border-color-base !important;
      box-shadow: none !important;
    }
  }

  &.is-active ::v-deep {
    input {
      width: 210px;
    }

    .el-input__prefix {
      left: -26px;
    }
  }

  ::v-deep .el-input__prefix {
    top: 6px;
    left: -17px;
  }

  .el-icon-search {
    @include extend-click(10px, 16px);
  }
}
</style>
