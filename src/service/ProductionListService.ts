import axios from '@/request'

export class ProductionListService {
  /**
   * 列表
   */
  static list({ size = 30, current, ...params }): Promise<any> {
    return axios.post('/api/operation/goods/platform/page', {
      size,
      current,
      ...params,
    })
  }
}
