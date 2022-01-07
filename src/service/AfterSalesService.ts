import axios from '@/request'

/**
 * 售后管理
 */

export class AfterSalesService {
  /**
   * 列表
   */
  static list(data): Promise<any> {
    return axios.post('/api/order/pageRefund', data)
  }

  /**
   * 新增
   */
  static add(data): Promise<any> {
    return axios.post(`/api/users/admin/systemUser/add`, data)
  }

  /**
   * 编辑
   */
  static edit(data): Promise<any> {
    return axios.put(`/api/users/admin/systemUser/update`, data)
  }

  /**
   * 删除
   */
  static del(id): Promise<any> {
    return axios.delete(`/api/users/admin/systemUser/delete/${id}`)
  }
}
