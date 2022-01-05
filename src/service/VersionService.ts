import axios from '@/request'

/**
 * 版本管理
 */

export class VersionService {
  /**
   * 列表
   */
  static list(data): Promise<any> {
    return axios.get('/api/platform/version/page', {
      params: data,
    })
  }

  /**
   * 新增
   */
  static add(data): Promise<any> {
    return axios.post(`/api/platform/version/save`, data)
  }

  /**
   * 编辑
   */
  static details(data): Promise<any> {
    return axios.post(`/api/platform/version/getVersion`, data)
  }
}
