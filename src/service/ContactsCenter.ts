import axios from '@/request'

/**
 * 客服中心
 */
export class ContactsCenterApi {
  /**
   * 列表
   */
   static list(data): Promise<any> {
    return axios.post(`/api/users/admin/cusService/list`, data)
  }

  /**
   * 人员列表
   */
  static userList({channelId}): Promise<any> {
    return axios.get(`/api/users/admin/cusService/select/${channelId}`, )
  }

  /**
   * 增加客服人员
   */
  static add(data): Promise<any> {
    return axios.post(`/api/users/admin/cusService/add`, data)
  }

  /**
   * 修改客服人员
   */
   static edit(data): Promise<any> {
    return axios.put(`/api/users/admin/cusService/update`, data)
  }

  /**
   * 删除客服人员
   */
   static delete(data): Promise<any> {
    return axios.delete(`/api/users/admin/cusService/delete/${data.id}`)
  }

  /**
   * 获取客服详情
   */
   static detail(params): Promise<any> {
     console.log(`id`, params)
    return axios.get(`/api/users/admin/cusService/get/${params.id}`)
  }
}
