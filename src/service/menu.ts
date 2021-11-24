import axios from '@/request'
import { AxiosResponse } from 'axios'

export function getMenus(): Promise<any> {
  return axios.get('/menu/list')
}
