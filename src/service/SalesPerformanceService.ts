import axios from '@/request'

/**
 * 财务中心-销售业绩
 */

export class OrderService {
  /**
   * 列表
   */
  // static list({ current, size = 30 }): Promise<any> {
  //   return axios.get('/api/platform/order/pageOrderBy', {
  //     params: {
  //       current,
  //       size,
  //     },
  //   })
  // }

  /**
   * 账户总额
   */
  static details(params): Promise<any> {
    return axios.get(`/api/wallet/c/myWallet`, { params })
  }
}
