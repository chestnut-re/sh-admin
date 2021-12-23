import axios from '@/request'

/**
 * Banner 数据
 */
export class BannerService {
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
   * 删除
   */
  static del({ id }): Promise<any> {
    return axios.delete(`/api/operation/banner/delete/${id}`)
  }

  /**
   * 新增
   */
  static newBanner(data): Promise<any> {
    return axios.post(`/api/operation/banner/save`, data)
  }

  /**
   * 编辑
   */
  static edit(data): Promise<any> {
    return axios.put(`/api/operation/banner/update`, data)
  }
}
