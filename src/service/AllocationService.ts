import axios from '@/request'

/**
 * 商品配置接口
 */
export class AllocationService {
  /**
   * 获取分类列表
   */
  static list(data: any): Promise<any> {
    return axios.post('/api/operation/goods/sortManagement/query', data)
  }

  /**
   * 新增,修改，删除分类
   */
  static edit(data: any): Promise<any> {
    return axios.post('/api/operation/goods/sortManagement/update', data)
  }
}
