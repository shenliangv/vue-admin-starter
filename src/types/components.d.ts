// 公共组件类型
import { ElTableColumn } from 'element-ui/types/table-column'
import { ElOption } from 'element-ui/types/option'

export interface CustomTableColumn extends Partial<ElTableColumn> {
  cols?: CustomTableColumn[]
  slotName?: string
}

export interface FilterItem {
  type: string
  name: string
  label: string
  options?: ElOption[]
  defaultValue?: any
  placeholder?: string
  startPlaceholder?: string
  endPlaceholder?: string
}
