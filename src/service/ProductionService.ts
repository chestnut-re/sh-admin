import axios from '@/request'

export class ProductionService {
  /**
   * 上传商品背景图
   */
   static uploadFile(data): Promise<any> {
    return axios.post(`/api/third/oss/uploadFile`, data)
  }

  /**
   * 保存草稿/提交至待发布
   */

  static save(data): Promise<any> {
    return axios.post(`/api/operation/goods/save`, data)
  }
}
 
