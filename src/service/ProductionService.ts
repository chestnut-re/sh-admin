import axios from '@/request'

export class ProductionService {
  /**
   * 保存草稿/提交至待发布
   */

  

  // static save(data): Promise<any> {
  //   return axios.post(`/api/operation/goods/save`, { params: {
  //     data,
  //   }})
  // }
}

/**
 * 创建B端用户
 */
export const save = (data): Promise<any> => {
  return axios.post('/api/operation/goods/save', data)
}

/**
 * 发布记录
 */
export const releaseRecord = (data): Promise<any> => {
  return axios.get('/api/operation/goods/release/page', {
    params: {
      ...data
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

