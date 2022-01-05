import axios from '@/request'

/**
 * 商品发布审核 数据
 */
export class ProductionAuditService {
  /**
   * 列表
   */
  static list({ size = 30, current, ...params }): Promise<any> {
    return axios.get('/api/operation/check/publishCheckList', {
      params: {
        size,
        current,
        ...params,
      },
    })
  }

  /**
   * 发布审核
   */
  static publishAudit(data): Promise<any> {
    return axios.post(`/api/operation/check/publishCheck`, data)
  }

  /**
   * 分中心上架商品 审核
   */
  static putOnAudit(data): Promise<any> {
    return axios.post(`/api/operation/check/putawayCheck`, data)
  }
}
