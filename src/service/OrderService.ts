import axios from '@/request'

/**
 * 管理员数据
 */

export class OrderService {
  /**
   * 列表
   */
  static list(data): Promise<any> {
    return axios.get('/api/platform/order/pageOrderBy', {
      params: data,
    })
  }

  /**
   * 详情
   */
  static details(params): Promise<any> {
    return axios.get(`/api/platform/order/getOrderInfo`, { params })
  }

  /**
   * 详情
   */
  // static details(params): Promise<any> {
  //   return axios.get(`/api/platform/order/getOrderInfo`, { params })
  // }
}
