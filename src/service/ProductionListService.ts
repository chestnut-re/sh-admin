import axios from '@/request'

export class ProductionListService {
  /**
   * 列表
   */
  static list({ size = 30, current, ...params }): Promise<any> {
    return axios.get('/api/operation/goods/platform/page', {
      params: {
        size,
        current,
        ...params,
      },
    })
  }
}
