import axios from '@/request'

/**
 * 财务中心-账户中心
 */
export class FinanceAccountService {
  /**
   * 列表
   */
  static list({ size = 30, current, ...params }): Promise<any> {
    return axios.get('/api/wallet/a/centerPage', {
      params: {
        size,
        current,
        ...params,
      },
    })
  }

  /**
   * 账户明细-总账单
   */
  static details(data): Promise<any> {
    return axios.get('/api/wallet/a/walletInfo', {
      params: data,
    })
  }

  /**
   * 账户明细-列表
   */
  static detailsList(data): Promise<any> {
    return axios.get('/api/wallet/a/userBillPage', {
      params: data,
    })
  }

  /**
   * get
   */
  static get({ id }): Promise<any> {
    return axios.get(`/api/operation/banner/get`, { params: {} })
  }

  /**
   * 删除
   */
  static del({ id }): Promise<any> {
    return axios.delete(`/api/operation/banner/delete/${id}`)
  }

  /**
   * 新增
   */
  static add(data): Promise<any> {
    return axios.post(`/api/operation/banner/save`, data)
  }

  /**
   * 编辑
   */
  static edit(data): Promise<any> {
    return axios.put(`/api/operation/banner/update`, data)
  }
}
export class WithdrawalReviewService {
  /**
   * 渠道提现列表
   */
  static channelList(data): Promise<any> {
    return axios.get('/api/wallet/a/bizCashPage', {
      params: data,
    })
  }

  /**
   * 用户提现列表
   */
  static userList(data): Promise<any> {
    return axios.get('/api/wallet/a/custCashPage', {
      params: data,
    })
  }

  /**
   * 提现审核
   */
  static edit(data): Promise<any> {
    return axios.post(`/api/wallet/a/cashAudit`, data)
  }

  /**
   * 渠道列表导出
   */
  static channelExport(data): Promise<any> {
    return axios.get('/api/wallet/a/bizCashExport', {
      params: data,
    })
  }

  /**
   * 用户列表导出
   */
  static userExport(data): Promise<any> {
    return axios.get('/api/wallet/a/custCashExport', {
      params: data,
    })
  }
}

export class FinancialManagementService {
  /**
   * 财务概况
   */
  static fianceOverview(data): Promise<any> {
    return axios.post('/api/wallet/a/fianceOverview', data)
  }

  /**
   * 财务明细
   */
  static list(data): Promise<any> {
    return axios.get('/api/wallet/a/fianceDetail', {
      params: data,
    })
  }

  /**
   * 财务明细-导出
   */
  static export(data): Promise<any> {
    return axios.get('/api/wallet/a/fianceDetailExport', {
      params: data,
    })
  }
}
