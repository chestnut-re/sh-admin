/*
 * @Description:
 * @LastEditTime: 2022-01-07 11:54:40
 */
import axios from '@/request'

export class ConfigManagementService {
  /**
   * 列表
   */
  static list(data): Promise<any> {
    return axios.get('/api/platform/policy/page', {
      params: data,
    })
  }
  /**
   * get
   */
  static get({ id }): Promise<any> {
    return axios.get(`/api/platform/policy/getRefundPolicyById/${id}`, { params: {} })
  }

  /**
   * 删除
   */
  static del({ id }): Promise<any> {
    return axios.post(`/api/platform/policy/deleteRefundPolicyById/${id}`)
  }

  /**
   * 新增
   */
  static add(data): Promise<any> {
    return axios.post(`/api/platform/policy/save`, data)
  }

  /**
   * 编辑
   */
  static editState(data): Promise<any> {
    return axios.post(`/api/platform/policy/update`, data)
  }
  static edit(id,data): Promise<any> {
    return axios.post(`/api/platform/policy/update`, data)
  }
}

/**
 * @description: 退款理由
 */

 export class ConfigRefundService {
  /**
   * 列表
   */
  static list(data): Promise<any> {
    return axios.get('/api/platform/dictionary/getDictionaryItemIPage', {
      params: {data,...{dictCode:'HD1'}},
    })
  }


  /**
   * 删除
   */
  static del({ id }): Promise<any> {
    return axios.post(`/api/platform/dictionary/deleteRefundItem`,{id:id})
  }

  /**
   * 新增
   */
  static add(data): Promise<any> {
    return axios.post(`/api/platform/dictionary/addRefundItem`, data)
  }

  /**
   * 编辑
   */
  static editState(data): Promise<any> {
    return axios.post(`/api/platform/policy/update`, data)
  }
  static edit(id,data): Promise<any> {
    return axios.post(`/api/platform/dictionary/updateRefundItem`, data)
  }
}

export class OrderService {
  /**
   * 列表
   */
  static list(data): Promise<any> {
    return axios.get('/api/platform/order/pageOrderBy', {
      params: data,
    })
  }

  /**
   * 详情
   */
  static details(params): Promise<any> {
    return axios.get(`/api/platform/order/getOrderInfo`, { params })
  }

  /**
   * 详情-订单相关联人员信息
   */
  static relation(params): Promise<any> {
    return axios.get(`/api/platform/order/getUserInfo`, { params })
  }
}
