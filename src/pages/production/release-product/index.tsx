import React, { useEffect, useState, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import './index.less'
import BaseInfo from './components/BaseInfo'
import Itinerary from './components/Itinerary'
import StepView from './components/StepView'
import { ProductionMode } from './utils'
import { useStore } from '@/store/context'
import { ProductionService } from '@/service/ProductionService'
import { message } from 'antd'
import { useHistory } from 'react-router-dom'

const goodsParam = {
  goods: {
    goodsTypeTag: '', // 商品类型标签
    goodsName: '', // 商品标题
    goodsNickName: '', // 商品副标题
    goodsDetail: {
      // 商品详情页
    },
    insuranceAgreement: '', // 保险协议
    refundAndChangePolicy: '', // 退改政策
    promotionalImageUrl: '', // 商品预览图
    travelMode: '', // 0是固定时间出行，1是约定时间出行
    orderDeadline: '', // 下单截至时间，单位小时
    goodsPrices: [
      // 商品日期价格行程详情
      {
        childCostPrice: '', // 儿童成本价
        childCurrentPrice: '', // 儿童现售价
        childMarkPrice: '', // 儿童市场标价
        days: '', // 一共多少天
        endDate: '', // 价格结束日期
        personCostPrice: '', // 成人成本价
        personCurrentPrice: '', // 成人现售价
        personMarkPrice: '', // 成人市场标价
        travels: [
          // 行程
          {
            travelDetails: [
              // 一天的行程行情
              {
                travelGoods: {
                  // 行程关联的商品信息
                  airTicket: {
                    // 机票
                    aircraftCabin: '', // 舱位
                    airline: '', // 航空公司
                    arriveAirport: '', //到达机场
                    childCostPrice: '', // 儿童成本价
                    childCurrentPrice: '', // 儿童现售价
                    childMarkPrice: '', // 儿童市场标价
                    departAirport: '', // 出发机场
                    departureTime: '', // 起飞时间
                    latitude: '', // 途经点纬度
                    longitude: '', // 途经点经度
                    personCostPrice: '', // 成人成本价
                    personCurrentPrice: '', // 成人现售价
                    personMarkPrice: '', // 成人市场标价
                    remark: '', // 备注
                    transportation: '', // 交通方式1：飞机 2：火车 3：大巴
                  },
                  bus: {
                    // 大巴
                    busType: '', // 大巴车型
                    busUseType: '', //大巴使用类型
                    departureStation: '', //出发站
                    childCostPrice: '', // 儿童成本价
                    childCurrentPrice: '', // 儿童现售价
                    childMarkPrice: '', // 儿童市场标价
                    latitude: '', // 途经点纬度
                    longitude: '', // 途经点经度
                    personCostPrice: '', // 成人成本价
                    personCurrentPrice: '', // 成人现售价
                    personMarkPrice: '', // 成人市场标价
                    remark: '', // 备注
                    transportation: '', // 交通方式1：飞机 2：火车 3：大巴
                  },
                  hotel: {
                    // 酒店
                    hotelName: '', //酒店名称
                    roomType: '', // 房型
                    childCostPrice: '', // 儿童成本价
                    childCurrentPrice: '', // 儿童现售价
                    childMarkPrice: '', // 儿童市场标价
                    personCostPrice: '', // 成人成本价
                    personCurrentPrice: '', // 成人现售价
                    personMarkPrice: '', // 成人市场标价
                    latitude: '', // 途经点纬度
                    longitude: '', // 途经点经度
                    remark: '', // 备注
                  },
                  restaurant: {
                    // 饭店
                    limitPeople: '', // 人限
                    restaurantName: '', //饭店名称
                    childCostPrice: '', // 儿童成本价
                    childCurrentPrice: '', // 儿童现售价
                    childMarkPrice: '', // 儿童市场标价
                    personCostPrice: '', // 成人成本价
                    personCurrentPrice: '', // 成人现售价
                    personMarkPrice: '', // 成人市场标价
                    latitude: '', // 途经点纬度
                    longitude: '', // 途经点经度
                    remark: '', // 备注
                  },
                  scenicSpot: {
                    // 景点
                    additionItem: '', // 附加项目
                    scenicSpotName: '', // 景点名称
                    visitingTime: '', //游览时长 分钟
                    childCostPrice: '', // 儿童成本价
                    childCurrentPrice: '', // 儿童现售价
                    childMarkPrice: '', // 儿童市场标价
                    personCostPrice: '', // 成人成本价
                    personCurrentPrice: '', // 成人现售价
                    personMarkPrice: '', // 成人市场标价
                    latitude: '', // 途经点纬度
                    longitude: '', // 途经点经度
                    remark: '', // 备注
                  },
                  train: {
                    // 火车
                    arrivalStation: '', // 到达站
                    departureStation: '', // 出发站
                    departureTime: '', // 出发时间
                    seat: '', // 席位
                    trainsType: '', //车次类型
                    transportation: '', // 交通方式1：飞机 2：火车 3：大巴
                    childCostPrice: '', // 儿童成本价
                    childCurrentPrice: '', // 儿童现售价
                    childMarkPrice: '', // 儿童市场标价
                    personCostPrice: '', // 成人成本价
                    personCurrentPrice: '', // 成人现售价
                    personMarkPrice: '', // 成人市场标价
                    latitude: '', // 途经点纬度
                    longitude: '', // 途经点经度
                    remark: '', // 备注
                  },
                },
                travelTime: '', // 行程时间
                travelTitle: '', // 行程标题
                travelType: '', //行程类型 1酒店，2交通，3餐饮，4景点
              },
            ],
            whatDay: '', // 第几天
          },
        ],
      },
    ],
  },
}

/**
 * 商品管理-发布商品
 */
const ReleaseProductPage: React.FC = () => {
  const history = useHistory()
  const { productionStore } = useStore()
  // 详情页模式
  const [productionMode, setProductionMode] = useState<ProductionMode>(ProductionMode.create)
  const [current, setCurrent] = useState(0)
  const baseInfoRef = useRef<any>()
  const itineraryRef = useRef<any>()

  useEffect(() => {
    // const { adminStore } = adminStore()
    productionStore.initData()
    return () => {
      productionStore.clearData()
    }
  }, [])


  /**下一步 */
  const next = () => {
    if (current === 0) {
      baseInfoRef.current.next()
      setCurrent(current + 1)
    } else if (current == 1) {
      // itineraryRef.current.next()
      ProductionService.saveToAudit(productionStore.data).then((res) => {
        console.log(res)
        if (res.code === '200') {
          message.success('成功')
          history.goBack()
        } else {
          message.error(res.msg)
        }
      })
    }
  }

  const prev = () => {
    setCurrent(current - 1)
  }

  /**
   * 保存草稿箱
   * @param item
   */
  const onDraft = () => {
    // productionStore.saveDraft()
    ProductionService.save(productionStore.data).then((res) => {
      if (res.code === '200') {
        message.success('成功')
        history.goBack()
      } else {
        message.error(res.msg)
      }
    })
  }

  return (
    <div className="ReleaseProduct__root">
      <StepView productionMode={productionMode} current={current} />
      <div className="steps-content">
        {current == 0 && <BaseInfo ref={baseInfoRef} />}
        {current == 1 && <Itinerary ref={itineraryRef} />}

        <div className="btnView">
          <div className="item">
            {current > 0 && (
              <div onClick={() => prev()} className="nextBtn prev">
                上一步
              </div>
            )}
            <div onClick={() => next()} className="nextBtn">
              {current === 1 ? '提交审核' : '下一步'}
            </div>
          </div>

          <div onClick={() => onDraft()} className="draftBtn">
            保存至草稿箱
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(ReleaseProductPage)
