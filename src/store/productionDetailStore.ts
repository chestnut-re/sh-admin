import { getNanoId } from '@/utils/nanoid'
import { action, makeObservable, observable } from 'mobx'

/**
 * 商品添加详情页
 */
class ProductionDetailData {
  data: any = undefined

  constructor() {
    makeObservable(this, {
      data: observable,
      init: action,
      clearData: action,
      addTemplate: action,
      removeTemplate: action,
      saveTemplate: action,
    })
  }

  init(_data) {
    this.data = _data
    // 初始化key
    this.data.goodsDetail.goodsDetailPage = this.data.goodsDetail.goodsDetailPage.map((item) => {
      item.key = getNanoId()
      return item
    })
  }

  /**添加模版 */
  addTemplate() {
    this.data.goodsDetail.goodsDetailPage.push({
      key: getNanoId(),
    })
  }

  /**删除模版 */
  removeTemplate(key: string) {
    this.data.goodsDetail.goodsDetailPage = this.data.goodsDetail.goodsDetailPage.filter((i) => i.key !== key)
  }

  /**编辑模版，保存模版 */
  saveTemplate(d) {
    console.log(d)
    if (d.key === this.data.goodsDetail.goodsDetailStart) {
      this.data.goodsDetail.goodsDetailStart = { ...this.data.goodsDetail.goodsDetailStart, ...d }
    } else if (d.key === this.data.goodsDetail.goodsDetailEnd) {
      this.data.goodsDetail.goodsDetailEnd = { ...this.data.goodsDetail.goodsDetailEnd, ...d }
    } else {
      this.data.goodsDetail.goodsDetailPage = this.data.goodsDetail.goodsDetailPage.map((item) => {
        if (item.key === d.key) {
          item = { ...item, ...d }
        }
        return item
      })
    }
  }

  clearData() {
    this.data = undefined
  }
}

function createProductionDetailStore() {
  return new ProductionDetailData()
}

export { createProductionDetailStore }
