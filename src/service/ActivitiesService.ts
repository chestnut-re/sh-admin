import axios from '@/request'

/**
 * 活动管理 数据
 */
export class ActivitiesService {
  /**
   * 列表
   */
  static list({ size = 30, current }): Promise<any> {
    return axios.get('/api/operation/activity/page', {
      params: {
        size,
        current,
      },
    })
  }
  /**
   * 创建角色
   */
  static save(data): Promise<any> {
    return axios.post('/api/operation/activity/save', data)
  }

  /**
   * 删除
   */
  static del({ id }): Promise<any> {
    return axios.delete(`/api/operation/banner/delete/${id}`)
  }
}
