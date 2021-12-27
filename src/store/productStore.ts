import { getNanoId } from '@/utils/nanoid'
import { cloneDeep } from 'lodash'
import { action, makeObservable, observable } from 'mobx'

/**
 * 产品详情页
 */
class ProductionData {
  data: any = {
    travelMode: 0, // 出行类型
    goodsPrices: [
      // 商品
      {
        key: getNanoId(),
        startDate: 0, //价格开始日期
        endDate: 0, // 价格结束日期
        travels: [], // 行程
      },
    ],
  }

  constructor() {
    makeObservable(this, {
      data: observable,
      initData: action,
      addBaseInfo: action,
      addTravelMode: action,
      addOrderDeadline: action,
      copyGood: action,
      removeGood: action,
      addTravelOneDay: action,
    })
  }

  initData() {
    const nowDay = Date.now()
    this.data = {
      travelMode: 0, // 出行类型
      goodsPrices: [
        { startDate: nowDay, endDate: nowDay, key: getNanoId(), travels: [{ whatDay: nowDay, key: getNanoId() }] },
      ],
    }
  }

  /**添加基础信息 */
  addBaseInfo(values) {
    this.data = { ...this.data, ...values }
    console.log(this.data)
  }

  /**添加出行类型 0是固定时间出行，1是约定时间出行 */
  addTravelMode(travelMode: number) {
    console.log(`addTravelMode ${travelMode}`)
    this.data.travelMode = travelMode
    console.log(this.data)
  }

  /**下单截至时间，单位小时 */
  addOrderDeadline(value: number) {
    console.log(`addOrderDeadline ${value}`)
    this.data.orderDeadline = value
    console.log(this.data)
  }

  /**复制商品 */
  copyGood() {
    console.log('copyGood')
    const newGoodsPrices = cloneDeep(this.data.goodsPrices[this.data.goodsPrices.length - 1])
    const k = getNanoId()
    newGoodsPrices.key = k
    this.data.goodsPrices = [...this.data.goodsPrices, newGoodsPrices]
  }

  /**删除商品 */
  removeGood(targetKey) {
    console.log('removeGood', targetKey)
    const newD = this.data.goodsPrices.filter((item) => item.key !== targetKey)
    console.log(targetKey, newD)
    this.data.goodsPrices = newD
  }

  /**添加行程: 一天 */
  addTravelOneDay() {}
}

function createProductionStore() {
  return new ProductionData()
}

export { createProductionStore }
