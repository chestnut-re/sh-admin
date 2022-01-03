import { TravelType, travelTypeKey, whatDay } from '@/pages/production/release-product/utils'
import { getNanoId } from '@/utils/nanoid'
import { cloneDeep } from 'lodash'
import { action, makeObservable, observable } from 'mobx'

/**计算总价格 */
const getPriceFromTravels = (travels: any[], priceKeyStr: string) => {
  let sum = 0
  travels.map((item) => {
    item.travelDetails.map((travelDetail) => {
      if (travelDetail.travelGoods.airTicket) {
        sum += travelDetail.travelGoods.airTicket[priceKeyStr]
      }
      if (travelDetail.travelGoods.bus) {
        sum += travelDetail.travelGoods.bus[priceKeyStr]
      }
      if (travelDetail.travelGoods.hotel) {
        sum += travelDetail.travelGoods.hotel[priceKeyStr]
      }
      if (travelDetail.travelGoods.restaurant) {
        sum += travelDetail.travelGoods.restaurant[priceKeyStr]
      }
      if (travelDetail.travelGoods.scenicSpot) {
        sum += travelDetail.travelGoods.scenicSpot[priceKeyStr]
      }
      if (travelDetail.travelGoods.train) {
        sum += travelDetail.travelGoods.train[priceKeyStr]
      }
      return travelDetail
    })
    return item
  })
  return sum
}

/**
 * 产品详情页
 */
class ProductionData {
  data: any = {
    travelMode: 0, // 出行类型
    orderDeadline: 24, //下单截至时间，单位小时
    refundDeadline: 24, //退款截至时间，单位小时
    refundAndChangePolicy: '', //退改政策 详情
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
      setTravelMode: action,
      addOrderDeadline: action,
      copyGood: action,
      removeGood: action,
      addTravelOneDay: action,
      addTravelDetail: action,
      setDepartureCity: action,
      setGoodsPricesTime: action,
    })
  }

  initData() {
    console.log('ProductionData initData')

    const nowDay = Date.now()
    this.data = {
      travelMode: 0, // 出行类型
      orderDeadline: 24, //下单截至时间，单位小时
      refundDeadline: 24, //退款截至时间，单位小时
      refundAndChangePolicy: '', //退改政策 详情
      goodsPrices: [
        { startDate: nowDay, endDate: nowDay, key: getNanoId(), travels: [{ whatDay: whatDay[0], key: getNanoId() }] },
      ],
    }
  }

  /**添加基础信息 */
  addBaseInfo(values) {
    console.log(values)
    this.data = { ...this.data, ...values }
    console.log(this.data)
  }

  /**添加出行类型 0是固定时间出行，1是约定时间出行 */
  setTravelMode(travelMode: number) {
    console.log(`setTravelMode ${travelMode}`)
    this.data.travelMode = travelMode
    // 重置所有商品时间
    this.data.goodsPrices = this.data.goodsPrices.map((item) => {
      item.startDate = item.endDate
      return item
    })
    // end
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
  addTravelOneDay(activeKey) {
    console.log(`addTravelOneDay: ${activeKey}`)
    const editGoodsPrices = this.data.goodsPrices.filter((i) => i.key === activeKey)
    console.log(editGoodsPrices[0])
    const newTravel = { whatDay: whatDay[editGoodsPrices[0].travels.length], key: getNanoId() }
    editGoodsPrices[0].travels.push(newTravel)
    this.data.goodsPrices = [...this.data.goodsPrices]
  }

  /**添加一天中的行程项目 */
  addTravelDetail(activeKey: string, travelType: TravelType, travelDetail: any) {
    console.log(`addTravelDetail: ${activeKey}`)
    const editGoodsPrices = this.data.goodsPrices.filter((i) => i.key === activeKey)
    const lastDay = editGoodsPrices[0].travels[editGoodsPrices[0].travels.length - 1]
    if (!lastDay.travelDetails) {
      lastDay.travelDetails = []
    }
    const travelGoods = {}
    if (travelType !== 0) {
      travelGoods[travelTypeKey[travelType]] = { ...travelDetail }
    }
    const newTravelDetail = { key: getNanoId(), travelType: travelType, travelGoods: travelGoods }
    lastDay.travelDetails.push(newTravelDetail)

    this.updateGoods(editGoodsPrices[0])

    this.data.goodsPrices = [...this.data.goodsPrices]
  }

  updateGoods(goodsPrice) {
    //更新商品价格
    goodsPrice.childCostPrice = getPriceFromTravels(goodsPrice.travels, 'childCostPrice')
    goodsPrice.childCurrentPrice = getPriceFromTravels(goodsPrice.travels, 'childCurrentPrice')
    goodsPrice.childMarkPrice = getPriceFromTravels(goodsPrice.travels, 'childMarkPrice')
    goodsPrice.personCostPrice = getPriceFromTravels(goodsPrice.travels, 'personCostPrice')
    goodsPrice.personCurrentPrice = getPriceFromTravels(goodsPrice.travels, 'personCurrentPrice')
    goodsPrice.personMarkPrice = getPriceFromTravels(goodsPrice.travels, 'personMarkPrice')
    // end
    // 更新商品天数
    goodsPrice.days = goodsPrice.travels.length
    // end
  }

  /**删除一天中的行程项目 */
  delTravelDetail(activeKey: string | undefined, travelsKey: string, travelDetailKey: string) {
    console.log(`delTravelDetail: ${activeKey}`)
    const editGoodsPrices = this.data.goodsPrices.filter((i) => i.key === activeKey)
    const editTravels = editGoodsPrices[0].travels.filter((i) => i.key === travelsKey)
    const newTravelDetails = editTravels[0].travelDetails.filter((i) => i.key !== travelDetailKey)
    editTravels[0].travelDetails = newTravelDetails
    this.updateGoods(editGoodsPrices[0])
    this.data.goodsPrices = [...this.data.goodsPrices]
  }

  /**获取商品现售价*/
  getCurrentPrice(activeKey: string | undefined) {
    const editGoodsPrices = this.data.goodsPrices.filter((i) => i.key === activeKey)
    return editGoodsPrices[0]?.personCurrentPrice || 0
  }

  /**设置始发地 */
  setDepartureCity(departureCity, departureCityAdcode) {
    this.data.departureCity = departureCity
    this.data.departureCityAdcode = departureCityAdcode
  }

  /**设置商品时间 */
  setGoodsPricesTime(activeKey, value) {
    const goodsPrice = this.data.goodsPrices.find((i) => i.key === activeKey)
    console.log(value)
    if (value instanceof Array) {
      goodsPrice.startDate = value[0]
      goodsPrice.endDate = value[1]
    } else {
      goodsPrice.startDate = value
      goodsPrice.endDate = value
    }

    this.data.goodsPrices = [...this.data.goodsPrices]
  }

  /**保存到草稿箱子 */
  saveDraft() {
    const postData = JSON.stringify(this.data)
    console.log(JSON.parse(postData))
  }

  clearData() {
    this.initData()
  }
}

function createProductionStore() {
  return new ProductionData()
}

export { createProductionStore }
