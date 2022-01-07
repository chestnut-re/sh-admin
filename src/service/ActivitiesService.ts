/*
 * @Description: 
 * @LastEditTime: 2022-01-07 14:38:57
 */
import axios from '@/request'

/**
 * 活动管理 数据
 */
export class ActivitiesService {
  /**
   * 列表
   */
  static list({ size = 30, current }): Promise<any> {
    return axios.get('/api/operation/activity/page', {
      params: {
        size,
        current,
      },
    })
  }
  /**
   * 创建角色
   */
  static save(data): Promise<any> {
    return axios.post(
      '/api/operation/activity/save',
      data
    )
  }
  /**
   *  专题活动-更新-已完成
   */
  static edit(data): Promise<any> {
    return axios.put(`/api/operation/activity/update`, data)
  }
  /**
   * 删除
   */
  static del({ id }): Promise<any> {
    return axios.delete(`/api/operation/activity/delete/${id}`)
  }
  /**
   * 专题活动-详情-已完成
   */
  static get(id): Promise<any> {
    return axios.get(`/api/operation/activity/get/${id}`)
  }
    /**
   * 专题活动-详情-已完成
   */
     static goodsList(data): Promise<any> {
      return axios.get(`/api/operation/activity/goodsList`,{
        params:data
      })
    }
    static activityGoodsPage(data): Promise<any> {
      return axios.get(`/api/operation/activity/activityGoodsPage`,{
        params:data
      })
    }
    
}
