<template>
  <div class="examples-components block">
    <el-tabs type="card" v-model="activeTab">
      <el-tab-pane :name="tabs.TABLE_COL1" label="表格1" />
      <el-tab-pane :name="tabs.TABLE_COL2" label="表格2" />
    </el-tabs>

    <com-table
      :cols="tableCols"
      :data="tableData"
      @selection-change="onSelectionChange"
    >
      <template v-slot:operate="scope">
        <el-button type="text" size="small" @click="onPreview(scope)">
          查看
        </el-button>
        <el-button type="text" size="small" @click="onEdit(scope)">
          编辑
        </el-button>
      </template>
    </com-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ComTable } from '@/components'

import { TableColumnType } from 'element-ui/types/table-column'
import { rowCallbackParams } from 'element-ui/types/table'
import { CustomTableColumn } from '@/types/components'

export default Vue.extend({
  components: { ComTable },

  data() {
    const tabs = { TABLE_COL1: 'base', TABLE_COL2: 'complex' }

    return {
      activeTab: tabs.TABLE_COL1,
      tabs,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        },
        {
          date: '2016-05-05',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1515 弄',
          zip: 200333
        },
        {
          date: '2016-06-05',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1615 弄',
          zip: 200333
        },
        {
          date: '2016-07-05',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1715 弄',
          zip: 200333
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }
      ]
    }
  },

  computed: {
    tableCols(): CustomTableColumn[] {
      const cols = {
        [this.tabs.TABLE_COL1]: [
          { type: 'index' as TableColumnType, label: '序号', fixed: true },
          { type: 'selection' as TableColumnType },
          { prop: 'date', label: '日期', minWidth: '150' },
          { prop: 'name', label: '姓名', minWidth: '120' },
          { prop: 'province', label: '省份', minWidth: '120' },
          { prop: 'city', label: '市区', minWidth: '120' },
          {
            prop: 'address',
            label: '地址',
            minWidth: '100',
            showOverflowTooltip: true
          },
          { prop: 'zip', label: '邮编', minWidth: '120' }
        ],
        [this.tabs.TABLE_COL2]: [
          { prop: 'date', label: '日期', minWidth: '150' },
          { prop: 'name', label: '姓名', minWidth: '120' },
          { prop: 'province', label: '省份', minWidth: '120' },
          { prop: 'city', label: '市区', minWidth: '120' },
          {
            prop: 'address',
            label: '地址',
            minWidth: '100',
            showOverflowTooltip: true
          }
        ]
      }

      return cols[this.activeTab]
    }
  },

  methods: {
    onPreview(scope: object) {
      console.log('onPreview', scope)
    },

    onEdit(scope: object) {
      console.log('onEdit', scope)
    },

    onSelectionChange(selection: object[]) {
      console.log('onSelectionChange', selection)
    }
  }
})
</script>
