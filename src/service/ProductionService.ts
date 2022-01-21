import axios from '@/request'

export class ProductionService {
  /**
   * 保存草稿箱/提交至待发布
   */
  static save(data): Promise<any> {
    return axios.post('/api/operation/goods/save', data)
  }

  /**
   * 发布至审核
   */
  static saveToAudit(data): Promise<any> {
    return axios.post('/api/operation/goods/saveGoodsDetail', data)
  }

  /**
   * 标签列表
   */
  static tagList(data): Promise<any> {
    return axios.post('/api/operation/goods/sortManagement/query', data)
  }

  /**
   * 商品详情
   */
  static get(id: string): Promise<any> {
    return axios.get(`/api/operation/goods/get/${id}`)
  }

  /**
   * 删除商品
   */
  static del(id): Promise<any> {
    return axios.put(`/api/operation/goods/delete/${id}`)
  }

  /**
   * 商品 soldOut
   */
  static soldOut(id): Promise<any> {
    return axios.put(`/api/operation/goods/soldOut/${id}`)
  }

  /**
   * 商品 禁用
   */
  static ban(id): Promise<any> {
    return axios.put(`/api/operation/goods/ban/${id}`)
  }

  /**
   * 商品发布审核信息获取，回显
   */
  static getPublishCheckInfo(id: string): Promise<any> {
    return axios.get(`/api/operation/check/publishCheckInfo`, {
      params: {
        goodsId: id,
      },
    })
  }

  /**
   * 分中心上架商品
   */
  static centerPutOnRequest(data): Promise<any> {
    return axios.post('/api/operation/channelShop/putaway', data)
  }

  /**
   * 分中心下架商品
   */
  static soldOutByChannel(data): Promise<any> {
    return axios.post('/api/operation/channelShop/soldOutByChannel', data)
  }

  /**
   * 总部下架分中心商品
   */
  static soldOutByHead(data): Promise<any> {
    return axios.post('/api/operation/channelShop/soldOutByHead', data)
  }

  /**
   * 分中心上架商品，回显
   */
  static centerPutOnRequestGet(id: string): Promise<any> {
    return axios.get(`/api/operation/channelShop/putawayInfo`, {
      params: {
        channelGoodsId: id,
      },
    })
  }

  /**
   * 商品-分佣方案列表, 分中心提交上架申请时使用
   */
  static getChannelDistPlan(data): Promise<any> {
    return axios.get(`/api/market/commission/getChannelDistPlan`, {
      params: {
        size: 10,
        current: 1,
        ...data,
      },
    })
  }

  /**
   * 商品关联渠道列表
   */
  static goodsChannelList({ size = 30, current, ...params }): Promise<any> {
    return axios.get('/api/operation/channelShop/getGoodsChannelPage', {
      params: {
        size,
        current,
        ...params,
      },
    })
  }

  /**
   * 总部查看 分中心上架审核信息，所有
   */
  static channelGoodsListByGoodsId(goodsId): Promise<any> {
    return axios.get(`/api/operation/channelShop/channelGoodsListByGoodsId`, {
      params: {
        goodsId,
      },
    })
  }

  /**
   * 总部查看 分中心上架审核信息，审核模式
   */
  static channelGoodsListByGoodsIdAudit(channelGoodsId): Promise<any> {
    return axios.get(`/api/operation/channelShop/putawayInfo`, {
      params: {
        channelGoodsId,
      },
    })
  }
}

/**
 * 发布记录
 */
export const releaseRecord = (data): Promise<any> => {
  return axios.get('/api/operation/goods/release/page', {
    params: {
      ...data,
    },
  })
}

