import axios from '@/request'

/**
 * 商品分佣 数据
 */
export class ProductionCommission {
  /**
   * 列表
   */
  static list({ size = 30, current, ...params }): Promise<any> {
    return axios.get('/api/market/channel/getChannelPlan', {
      params: {
        size,
        current,
        ...params
      },
    })
  }

  /**
   * get
   */
  static get({ id }): Promise<any> {
    return axios.get(`/api/market/channel/getChannelPlan`, { params: {} })
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
    return axios.post(`/api/market/channel/saveChannelPlan`, data)
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
