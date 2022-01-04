import axios from '@/request'

export class CommonService {
  static getStructure(): Promise<any> {
    return axios.get(`/api/market/channel/structure`)
  }

  /**
   * 获取城市数据, 二级
   */
  static getProvinceCity(data = {}): Promise<any> {
    return axios.get(`/api/area/provinceCity`, {})
  }
}
