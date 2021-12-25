import axios from '@/request'

export class CommonService {
  static getStructure(): Promise<any> {
    return axios.get(`/api/market/channel/structure`)
  }
}
