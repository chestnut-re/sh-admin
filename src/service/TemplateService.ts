import axios from '@/request'

/**
 * 模版 数据
 */
export class TemplateService {
  /**
   * 列表
   */
  static list({ size = 30, current }): Promise<any> {
    return axios.get('/api/operation/banner/page', {
      params: {
        size,
        current,
      },
    })
  }

  /**
   * get
   */
  static get({ id }): Promise<any> {
    return axios.get(`/api/operation/banner/get`, { params: {} })
  }

  /**
   * 删除
   */
  static del({ id }): Promise<any> {
    return axios.delete(`/api/operation/banner/delete/${id}`)
  }

  /**
   * 新增
   */
  static add(data): Promise<any> {
    return axios.post(`/api/operation/banner/save`, {
      params: {
        data,
      },
    })
  }

  /**
   * 编辑
   */
  static edit(data): Promise<any> {
    return axios.put(`/api/operation/banner/update`, {
      params: {
        data,
      },
    })
  }
}
