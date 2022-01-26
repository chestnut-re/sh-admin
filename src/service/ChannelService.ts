/*
 * @Description:渠道管理
 * @LastEditTime: 2022-01-07 18:07:08
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
    return axios.delete(`/api/market/channel/${id}`)
  }
  static get(id): Promise<any> {
    return axios.get(`/api/market/channel/getInfo/${id}`)
  }
  static getStructure(): Promise<any> {
    return axios.get(`/api/market/channel/structure`)
  }
  static edit(data): Promise<any> {
    return axios.put('/api/market/channel/update', data)
  }
  static getProvinceCity(data = {}): Promise<any> {
    return axios.get(`/api/area/provinceCity`, {
      params: data,
    })
  }
  static getAllChannel(data): Promise<any> {
    return axios.get(`/api/market/channel/findNextChannelListById`, {
      params: data,
    })
  }

  static closestCity(data = {}): Promise<any> {
    return axios.get(`/api/area/closestCity`, {
      params: data,
    })
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
    del({ id }): Promise<any> {
      return axios.delete(`/api/market/channel/dist/plan/delete/${id}`)
    },
    edit(data): Promise<any> {
      return axios.put(`/api/market/channel/dist/plan/update`, data)
    },
    get(id): Promise<any> {
      return axios.get(`/api/market/channel/dist/plan/get/${id}`)
    },
  }
}
