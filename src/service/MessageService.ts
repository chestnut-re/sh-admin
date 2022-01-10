import axios from '@/request'

/**
 * 消息管理
 */

export class MessageService {
  /**
   * 列表
   */
  static list(data): Promise<any> {
    return axios.post('/api/platform/system/pushMessage/list', data)
  }

  /**
   * 详情
   */
  static details(id): Promise<any> {
    return axios.get(`/api/platform/system/pushMessage/get/${id}`)
  }

  /**
   * 新增
   */
  static add(data): Promise<any> {
    return axios.post(`/api/platform/system/pushMessage/push`, data)
  }

  /**
   * 删除
   */
  static del(id): Promise<any> {
    return axios.delete(`/api/platform/system/pushMessage/delete/${id}`)
  }

  /**
   * 模版列表
   */
  static templateList(data): Promise<any> {
    return axios.get('/api/platform/system/pushSwitch/list', {
      params: data,
    })
  }

  /**
   * 模版编辑
   */
  static templateEdit(data): Promise<any> {
    return axios.put('/api/platform/system/pushTemplate/update', data)
  }

  /**
   * 模版查看
   */
  static templateGet(data): Promise<any> {
    return axios.get('/api/platform/system/pushTemplate/get', {
      params: data,
    })
  }

  /**
   * 模版启用/禁用
   */
  static templateOn(data): Promise<any> {
    return axios.put('/api/platform/system/pushSwitch/update', data)
  }
}
