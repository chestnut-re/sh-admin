import axios from '@/request'

/**
 * 意见反馈
 */

export class OpinionService {
  /**
   * 列表
   */
  static list(data): Promise<any> {
    return axios.get('/api/platform/feedback/page', {
      params: data,
    })
  }
}
