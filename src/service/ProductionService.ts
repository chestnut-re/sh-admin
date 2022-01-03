import axios from '@/request'

export class ProductionService {
  /**
   * 保存草稿箱/提交至待发布
   */
  static save(data): Promise<any> {
    return axios.post('/api/operation/goods/save', data)
  }

  /**
   * 发布至审核
   */
  static saveToAudit(data): Promise<any> {
    return axios.post('/api/operation/goods/saveGoodsDetail', data)
  }

  /**
   * 标签列表
   */
  static tagList(data): Promise<any> {
    return axios.post('/api/operation/goods/sortManagement/query', data)
  }

  /**
   * 商品详情
   */
  static get(id: string): Promise<any> {
    return axios.get(`/api/operation/goods/get/${id}`)
  }
}

/**
 * 发布记录
 */
export const releaseRecord = (data): Promise<any> => {
  return axios.get('/api/operation/goods/release/page', {
    params: {
      ...data,
    },
  })
}

/**
 * 标签列表
 */

export const sortList = (data): Promise<any> => {
  return axios.post('/api/operation/goods/sortManagement/query', data)
}

/**
 * 商品列表
 */
export const goodsList = (data): Promise<any> => {
  return axios.post('/api/operation/goods/platform/page', data)
}
