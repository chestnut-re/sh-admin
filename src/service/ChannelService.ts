/*
 * @Description:渠道管理
 * @LastEditTime: 2021-12-22 14:42:41
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
  static get({ id }): Promise<any> {
    return axios.get(`/api/market/channel/get/${id}`)
  }
  static getStructure(): Promise<any> {
    return axios.get(`/api/market/channel/structure`)
  }
  static edit(data): Promise<any> {
    return axios.put('market/channel/update', {
      params: data,
    })
  }

  // /**
  //  * @description: 渠道详情奖励信息
  //  * @param {*} param1
  //  * @return {*}
  //  */
  // static getAward({ id }): Promise<any> {
  //   return axios.get(`/api/market/channel/awardDetail/${id}`)
  // }
  // /**
  //  * @description: 渠道详情kpi信息
  //  * @param {*} param1
  //  * @return {*}
  //  */
  // static getKip({ id }): Promise<any> {
  //   return axios.get(`/api/market/channel/kpiDetail/${id}`)
  // }
  // /**
  //  * @description: 渠道详情商品列表
  //  * @param {*} param1
  //  * @return {*}
  //  */
  // static getGoods({ id }): Promise<any> {
  //   return axios.get(`/api/market/channel/goodsDetail/${id}`)
  // }
  // static edit(data): Promise<any> {
  //   return axios.put(`/api/market/channel/update`, {
  //     params: {
  //       data,
  //     },
  //   })
  // }
  static getProvinceCity(): Promise<any> {
    return axios.get(`/api/area/provinceCity `)
  }
}
