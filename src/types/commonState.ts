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
