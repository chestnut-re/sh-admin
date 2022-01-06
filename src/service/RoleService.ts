/*
 * @Description:渠道管理
 * @LastEditTime: 2021-12-26 15:07:26
 */
import axios from '@/request'

export default class RoleService {
  static list(data): Promise<any> {
    return axios.get('/api/platform/role/pageRole', {
      params: data,
    })
  }
  static add(data): Promise<any> {
    return axios.post('/api/platform/role/save', data)
  }
  static del(data): Promise<any> {
    return axios.get(`/api/platform/role/delRole`, {
      params: data,
    })
  }
  static get(data): Promise<any> {
    return axios.get(`/api/platform/role/getRole`, {
      params: data,
    })
  }
  static edit(data): Promise<any> {
    return axios.post(`/api/platform/role/update`, data)
  }
}
