import { DialogMode } from '@/utils/enum'

/**
 * 表单 State
 */
export interface TableState {
  pageIndex: number
  pageSize: number
  total: number
  data: any[]
  [key: string]: any
}

export interface DialogState {
  showDialog: boolean
  selectedData: any
  dialogMode: DialogMode
  [key: string]: any
}
