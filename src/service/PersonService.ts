import axios from '@/request'

/**
 * 人员管理
 */
export class PersonService {
  /**
   * 列表
   */
  static list({ size = 30, current, ...params }): Promise<any> {
    return axios.post('/api/users/admin/employee/list', {
      size,
      current,
      ...params,
    })
  }

  /**
   *  获取从属关系
   */
  static getSubordinate(channelId): Promise<any> {
    console.log(`getSubordinate, channelId`, channelId)
    return axios.get(`/api/users/admin/subordinationSelect/get/${channelId}`)
  }

  /**
   * 获取角色列表
   */
  static getRoles(): Promise<any> {
    return axios.get('/api/platform/role/list')
  }

  /**
   * 获取渠道结构列表
   */
  static getStructure(): Promise<any> {
    return axios.get('/api/market/channel/structure')
  }

  /**
   * 添加人员
   */
  static add(data): Promise<any> {
    return axios.post('/api/users/admin/user/add', data)
  }
}

/**
 * 获取人员详情
 */
export function getInfo(userId): Promise<any> {
  return axios.get(`/api/users/admin/user/get/${userId}`, userId)
}

/**
 * 删除人员
 */
export function del(userId): Promise<any> {
  return axios.delete(`/api/users/admin/user/delete/${userId['userId']}`, userId)
}

/**
 * 编辑人员
 */
export function edit(data): Promise<any> {
  return axios.put(`/api/users/admin/user/update`, data)
}
