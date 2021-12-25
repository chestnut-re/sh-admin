import axios from '@/request'

/**
 * 商品草稿箱
 */
export class ProductionDraftService {
  /**
   * 列表
   */
  static list({ size = 30, current, ...params }): Promise<any> {
    return axios.get('/api/operation/goods/draftBoxPage', {
      params: {
        size,
        current,
        ...params,
      },
    })
  }
}
