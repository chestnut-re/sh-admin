/*
 * @Description:渠道管理
 * @LastEditTime: 2021-12-26 14:57:13
 */
import axios from '@/request'

export default class ChannelService {
  static list(data): Promise<any> {
    return axios.get('/api/market/channel/page', {
      params: data,
    })
  }
  static add(data): Promise<any> {
    return axios.post('/api/market/channel/save', data)
  }
  static del({ id }): Promise<any> {
    return axios.delete(`/api/market/channel/delete/${id}`)
  }
  static get(id): Promise<any> {
    return axios.get(`/api/market/channel/get/${id}`)
  }
  static getStructure(): Promise<any> {
    return axios.get(`/api/market/channel/structure`)
  }
  static edit(data): Promise<any> {
    return axios.put('/api/market/channel/update', data)
  }
  static getProvinceCity(): Promise<any> {
    return axios.get(`/api/area/provinceCity`)
  }

  static ChannelPlan = {
    /**
     * 商品-分佣方案列表
     */
     getChannelDistPlan(data): Promise<any> {
      return axios.get(`/api/market/channel/getChannelDistPlan`, {
        params: data,
      })
    },
    /**
     * 商品-创建分佣方案列表
     */
    saveChannelPlan(data): Promise<any> {
      return axios.post(`/api/market/channel/saveChannelDistPlan`, data)
    },
     edit(data): Promise<any> {
      return axios.put(`/api/market/channel/dist/plan/update`, data)
    }
  }
}
