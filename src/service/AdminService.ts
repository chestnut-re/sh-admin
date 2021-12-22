import axios from '@/request'

/**
 * 管理员数据
 */

export class AdminService {
  /**
   * 列表
   */
  static list(data): Promise<any> {
    return axios.post('/api/users/admin/systemUser/list', data)
  }

  /**
   * 新增
   */
  static add(data): Promise<any> {
    return axios.post(`/api/users/admin/systemUser/add`, data)
  }
}
