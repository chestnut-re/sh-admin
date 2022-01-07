/*
 * @Description:
 * @LastEditTime: 2022-01-07 18:01:08
 */
import axios from '@/request'
import { AxiosResponse } from 'axios'

export function getMenus(): Promise<any> {
  return axios.get('/menu/list')
}
// export function getMenus(id): Promise<any> {
//   return axios.get('/api/platform/menu/getMenuByUserId', {
//     params: {
//       userId: id,
//       platformType: 0,
//     },
//   })
// }
export function getMenusType(data): Promise<any> {
  return axios.get('/api/platform/menu/list', {
    params: data,
  })
}
