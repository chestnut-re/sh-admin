/*
 * @Description:
 * @LastEditTime: 2022-01-14 17:43:57
 */
import axios from '@/request'
import { AxiosResponse } from 'axios'

export function getDevMenus(): Promise<any> {
  return axios.get('/menu/list')
}
export function getMenus(id): Promise<any> {
  return axios.get('/api/platform/menu/getMenuByUserId', {
    params: {
      userId: id,
      platformType: 0,
    },
  })
}
export function getMenusType(data): Promise<any> {
  return axios.get('/api/platform/menu/list', {
    params: data,
  })
}
