import Vue from 'vue'
import { Table, TableColumn } from 'element-ui'

import { VNode, VNodeData } from 'vue'
import { CustomTableColumn } from '@/types/components'

export default Vue.extend({
  name: 'ComTable',

  props: {
    cols: {
      type: Array as () => CustomTableColumn[],
      default: () => []
    }
  },

  render(h): VNode {
    return h(
      Table,
      {
        class: 'com-table',
        attrs: { ...this.$attrs },
        on: this.$listeners
      },
      this.tableCols(this.cols)
    )
  },

  methods: {
    tableCols(cols: CustomTableColumn[]): VNode[] {
      const result: VNode[] = []

      cols.forEach(col => {
        const options: VNodeData = {
          attrs: { ...col },
          key: Math.random() + Math.random()
        }
        const slot = col.slotName && this.$scopedSlots[col.slotName]

        if (slot) {
          options.scopedSlots = { default: props => slot(props) }
        }

        let childrens: VNode[] = []

        if (Array.isArray(col.cols) && col.cols.length > 0) {
          childrens.push(...this.tableCols(col.cols))
        }

        result.push(this.$createElement(TableColumn, options, childrens))
      })

      return result
    }
  }
})
