/*
 * @Description:
 * @LastEditTime: 2022-01-10 16:33:48
 */
import axios from '@/request'
export class marketService {
  /**
   * 列表
   */
  static list(data): Promise<any> {
    return axios.get('/api/market/rebate/page', {
      params: data,
    })
  }

  /**
   * get
   */
  static get(id): Promise<any> {
    return axios.get(`/api/market/rebate/get/${id}`, { params: {} })
  }

  /**
   * 删除
   */
  static del({ id }): Promise<any> {
    return axios.delete(`/api/market/rebate/del/${id}`)
  }

  /**
   * 新增
   */
  static add(data): Promise<any> {
    return axios.post(`/api/market/rebate/save`, data)
  }

  /**
   * 编辑
   */
  static edit(data): Promise<any> {
    return axios.put(`/api/market/rebate/update`, data)
  }
}
export class rebateService {
  /**
   * 列表
   */
  static list(data): Promise<any> {
    return axios.get('/api/market/rebate/rebateAuditPage', {
      params: data,
    })
  }
  /**
   * 活动关联清单列表
   */
  static rebateTaskInventoryPage(data): Promise<any> {
    return axios.get('/api/market/rebate/rebateTaskInventoryPage', {
      params: data,
    })
  }
  /**
   * get
   */
  static get(id): Promise<any> {
    return axios.get(`/api/market/rebate/get/${id}`)
  }
  /**
   * 返利活动审核
   */
  static rebateAudit(data): Promise<any> {
    return axios.post(`/api/market/rebate/rebateAudit`, data)
  }
}

export class taskService {
  /**
   * 列表
   */
  static list(data): Promise<any> {
    return axios.get('/api/market/taskInventory/getTaskInventoryPage', {
      params: data,
    })
  }

  /**
   * get
   */
  static get(id): Promise<any> {
    return axios.get(`/api/market/taskInventory/get/${id}`)
  }

  /**
   * 删除
   */
  static del({ id }): Promise<any> {
    return axios.delete(`/api/market/taskInventory/${id}`)
  }

  /**
   * 新增
   */
  static add(data): Promise<any> {
    return axios.post(`/api/market/taskInventory/save`, data)
  }

  /**
   * 编辑
   */
  static editState(data): Promise<any> {
    return axios.post(`/api/market/taskInventory/enableByState`, data)
  }
}
