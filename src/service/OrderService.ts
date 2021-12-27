import axios from '@/request'

/**
 * 管理员数据
 */

export class OrderService {
  /**
   * 列表
   */
  static list(data): Promise<any> {
    return axios.get('/api/order/pageOrderBy', data)
  }

  /**
   * 详情
   */
  static details(data): Promise<any> {
    return axios.post(`/api/order/getOrderInfo`, data)
  }
}
