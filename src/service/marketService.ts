/*
 * @Description:
 * @LastEditTime: 2022-01-11 15:29:36
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
  /**
   * 
   */
  static rebateAuditApply(data): Promise<any> {
    return axios.post(`/api/market/activity/rebateAuditApply`, data)
  }

  
}
export class rebateService {
  
  /**
   * 列表
   */
  static list(data): Promise<any> {
    return axios.get('/api/market/activity/applyAuditPage', {
      params: data,
    })
  }
  /**
   * 活动关联清单列表
   */
  static rebateTaskInventoryPage(data): Promise<any> {
    return axios.get('/api/market/activity/rebateTaskInventoryPage', {
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
    return axios.post(`/api/market/activity/rebateAudit`, data)
  }
  static rebateGoodsPage(data): Promise<any> {
    return axios.get(`/api/market/activity/rebateGoodsPage`, {
      params: data,
    })
  }
  static rebateAuditRecordPage(data): Promise<any> {
    return axios.get('/api/market/activity/rebateAuditRecordPage', {
      params: data,
    })
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
