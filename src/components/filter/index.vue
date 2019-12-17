<template>
  <el-form class="com-filter" :model="filterParams" inline>
    <el-form-item
      v-for="item in filterItems"
      :key="item.name"
      :prop="item.name"
      :label="item.label"
    >
      <el-input
        v-if="item.type === 'input'"
        v-model="filterParams[item.name]"
        v-bind="item"
      />

      <el-select
        v-if="item.type === 'select'"
        v-model="filterParams[item.name]"
        v-bind="item"
      >
        <el-option
          v-for="(option, i) in item.options"
          :key="i"
          :label="option[item.labelKey || 'label']"
          :value="option[item.valueKey || 'value']"
        />
      </el-select>

      <el-date-picker
        v-if="isDatePicker(item.type)"
        v-model="filterParams[item.name]"
        v-bind="item"
      />
    </el-form-item>

    <el-form-item class="operate">
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="onFilter(normalizedFilterParams)"
      />

      <el-button v-if="clearable" type="warning" @click="onClear">
        清空
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import Vue from 'vue'
import { filterObject, hasValue } from '@/utils/lang'

import { PlainObject } from '@/types/base'
import { FilterItem } from '@/types/components'

export default Vue.extend({
  name: 'ComFilter',

  props: {
    clearable: Boolean,

    value: {
      type: Object,
      default: () => ({})
    },

    filterItems: {
      type: Array as () => FilterItem[],
      default: () => []
    },

    onFilter: {
      type: Function,
      default: function() {}
    }
  },

  data() {
    return {
      filterParams: {} as PlainObject
    }
  },

  computed: {
    normalizedFilterParams(): PlainObject {
      return filterObject(this.filterParams, val => hasValue(val))
    }
  },

  watch: {
    filterParams: {
      deep: true,
      handler(val) {
        this.$emit('input', this.normalizedFilterParams)
      }
    }
  },

  created() {
    this.initFilterParams()
  },

  methods: {
    initFilterParams() {
      const result: PlainObject = {}

      this.filterItems.forEach(item => {
        result[item.name] = item.defaultValue
      })

      this.filterParams = result
    },

    onClear() {
      Object.keys(this.filterParams).forEach(k => {
        this.filterParams[k] = undefined
      })
    },

    isDatePicker(type: string): boolean {
      const types = [
        'year',
        'month',
        'date',
        'dates',
        'week',
        'datetime',
        'datetimerange',
        'daterange',
        'monthrange'
      ]

      return types.includes(type)
    }
  }
})
</script>

<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 10px !important;
}
</style>
