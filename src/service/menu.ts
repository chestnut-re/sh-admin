import axios from '@/request'
import { AxiosResponse } from 'axios'

export function getMenus(): Promise<any> {
  return axios.get('/menu/list')
}
export function getMenusType(data): Promise<any> {
  return axios.get('/api/platform/menu/list',{
    params:data
  })
}
