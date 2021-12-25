import axios from '@/request'

/**
 * 财务中心-账户中心
 */
export class FinanceAccountService {
  /**
   * 列表
   */
  static list({ size = 30, current, ...params }): Promise<any> {
    return axios.get('/api/wallet/a/userBillPage', {
      params: {
        size,
        current,
        ...params,
      },
    })
  }

  /**
   * get
   */
  static get({ id }): Promise<any> {
    return axios.get(`/api/operation/banner/get`, { params: {} })
  }

  /**
   * 删除
   */
  static del({ id }): Promise<any> {
    return axios.delete(`/api/operation/banner/delete/${id}`)
  }

  /**
   * 新增
   */
  static add(data): Promise<any> {
    return axios.post(`/api/operation/banner/save`, data)
  }

  /**
   * 编辑
   */
  static edit(data): Promise<any> {
    return axios.put(`/api/operation/banner/update`, data)
  }
}
