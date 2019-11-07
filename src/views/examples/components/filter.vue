<template>
  <div class="examples-components block">
    <com-filter
      v-model="filterParams"
      :filterItems="filterItems"
      :on-filter="onFilter"
      clearable
    />
    <h2>过滤条件：</h2>
    <pre>{{ filterParams }}</pre>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ComFilter } from '@/components'

import { PlainObject } from '@/types/base'

export default Vue.extend({
  components: { ComFilter },

  data() {
    return {
      filterItems: [
        {
          type: 'input',
          name: 'title',
          placeholder: '请输入标题'
        },
        {
          type: 'select',
          name: 'status',
          placeholder: '全部',
          options: [
            { value: 1, label: '草稿' },
            { value: 2, label: '上线' },
            { value: 3, label: '下线' },
            { value: 4, label: '已删除' }
          ]
        },
        {
          type: 'year',
          name: 'year',
          placeholder: '请选择年份'
        },
        {
          type: 'month',
          name: 'month',
          format: 'yyyy-MM-dd',
          placeholder: '请选择月份'
        },
        {
          type: 'date',
          name: 'date',
          placeholder: '请选择日期'
        },
        {
          type: 'dates',
          name: 'dates',
          placeholder: '请选择日期'
        },
        {
          type: 'datetime',
          name: 'datetime',
          placeholder: '请选择日期时间'
        },
        {
          type: 'datetimerange',
          name: 'datetimerange',
          placeholder: '请选择日期时间范围',
          startPlaceholder: '开始时间',
          endPlaceholder: '结束时间'
        },
        {
          type: 'daterange',
          name: 'daterange',
          startPlaceholder: '开始日期',
          endPlaceholder: '结束日期',
          valueFormat: 'yyyyMM'
        },
        {
          type: 'monthrange',
          name: 'monthrange',
          startPlaceholder: '开始月份',
          endPlaceholder: '结束月份'
        }
      ],
      filterParams: {}
    }
  },
  methods: {
    onFilter(filterParams: PlainObject) {
      console.log('onFilter', filterParams)
    }
  }
})
</script>
