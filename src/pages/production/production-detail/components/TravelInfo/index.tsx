import { useStore } from '@/store/context'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Tabs } from 'antd'
const { TabPane } = Tabs
import './index.less'

/**
 * 行程信息
 */
const TravelInfo: React.FC = () => {
  const { productionDetailStore } = useStore()
  const callback = (key) => {
    console.log(key)
  }
  return (
    <div className="TravelInfo__root">
      <h4>2. 行程信息</h4>
      <div className="time">
        <div>出行时间:</div>
        <div>截止下单时间:</div>
        <div>截止退款时间:</div>
      </div>
      <div className="tabs">
        <Tabs onChange={callback} type="card">
          {productionDetailStore.data?.goodsPrices?.map((item, index) => {
            return (
              <TabPane tab={`${item.startDate} · ¥${item.personMarkPrice}`} key={index}>
                <div className="all-day">
                  {item.travels.map((li, num) => {
                    return (
                      <div className="what-day" key={num}>
                        <div className="every">{li.whatDay}</div>
                        <div className="every-info">
                          {li.travelDetails?.map((e, o) => {
                            return (
                              <div className="day-info" key={o}>
                                <div className="travelTime">{e.travelTime}</div>
                                <div className="travelTitle">{e.travelTitle}</div>
                                {e.travelGoods.airTicket && (
                                  <div className="type-pay">
                                    <div className="travelGoods">
                                      交通：{e.travelGoods.airTicket.departAirport}飞
                                      {e.travelGoods.airTicket.arriveAirport}\{e.travelGoods.airTicket.aircraftCabin}
                                    </div>
                                    <div className="remark">{e.travelGoods.airTicket.remark}</div>
                                    <div className="money">
                                      {e.travelGoods.airTicket.personCostPrice + e.travelGoods.airTicket.childCostPrice}
                                    </div>
                                    <div className="money">
                                      {e.travelGoods.airTicket.personMarkPrice + e.travelGoods.airTicket.childMarkPrice}
                                    </div>
                                    <div className="money">
                                      {e.travelGoods.airTicket.personCurrentPrice +
                                        e.travelGoods.airTicket.childCurrentPrice}
                                    </div>
                                  </div>
                                )}
                                {e.travelGoods.hotel && (
                                  <div className="type-pay">
                                    <div className="travelGoods">
                                      酒店：{e.travelGoods.hotel.hotelName}\{e.travelGoods.hotel.roomType}
                                    </div>
                                    <div className="remark">{e.travelGoods.hotel.remark}</div>
                                    <div className="money">
                                      {e.travelGoods.hotel.personCostPrice + e.travelGoods.hotel.childCostPrice}
                                    </div>
                                    <div className="money">
                                      {e.travelGoods.hotel.personMarkPrice + e.travelGoods.hotel.childMarkPrice}
                                    </div>
                                    <div className="money">
                                      {e.travelGoods.hotel.personCurrentPrice + e.travelGoods.hotel.childCurrentPrice}
                                    </div>
                                  </div>
                                )}
                                {e.travelGoods.restaurant && (
                                  <div className="type-pay">
                                    <div className="travelGoods">
                                      餐饮：{e.travelGoods.restaurant.restaurantName}\限
                                      {e.travelGoods.restaurant.limitPeople}人
                                    </div>
                                    <div className="remark">{e.travelGoods.restaurant.remark}</div>
                                    <div className="money">
                                      {e.travelGoods.restaurant.personCostPrice +
                                        e.travelGoods.restaurant.childCostPrice}
                                    </div>
                                    <div className="money">
                                      {e.travelGoods.restaurant.personMarkPrice +
                                        e.travelGoods.restaurant.childMarkPrice}
                                    </div>
                                    <div className="money">
                                      {e.travelGoods.restaurant.personCurrentPrice +
                                        e.travelGoods.restaurant.childCurrentPrice}
                                    </div>
                                  </div>
                                )}
                                {e.travelGoods.scenicSpot && (
                                  <div className="type-pay">
                                    <div className="travelGoods">
                                      景点：{e.travelGoods.scenicSpot.scenicSpotName}\限
                                      {e.travelGoods.scenicSpot.visitingTime}分钟\附加项目：
                                      {JSON.stringify(e.travelGoods.scenicSpot.additionItem)}
                                    </div>
                                    <div className="remark">{e.travelGoods.scenicSpot.remark}</div>
                                    <div className="money">
                                      {e.travelGoods.scenicSpot.personCostPrice +
                                        e.travelGoods.scenicSpot.childCostPrice}
                                    </div>
                                    <div className="money">
                                      {e.travelGoods.scenicSpot.personMarkPrice +
                                        e.travelGoods.scenicSpot.childMarkPrice}
                                    </div>
                                    <div className="money">
                                      {e.travelGoods.scenicSpot.personCurrentPrice +
                                        e.travelGoods.scenicSpot.childCurrentPrice}
                                    </div>
                                  </div>
                                )}
                                {e.travelGoods.bus && (
                                  <div className="type-pay">
                                    <div className="travelGoods">
                                      交通：{e.travelGoods.bus.departureStation}\车型：{e.travelGoods.bus.busType}
                                      \使用类型：{e.travelGoods.bus.busUseType}
                                    </div>
                                    <div className="remark">{e.travelGoods.bus.remark}</div>
                                    <div className="money">
                                      {e.travelGoods.bus.personCostPrice + e.travelGoods.bus.childCostPrice}
                                    </div>
                                    <div className="money">
                                      {e.travelGoods.bus.personMarkPrice + e.travelGoods.bus.childMarkPrice}
                                    </div>
                                    <div className="money">
                                      {e.travelGoods.bus.personCurrentPrice + e.travelGoods.bus.childCurrentPrice}
                                    </div>
                                  </div>
                                )}
                                {e.travelGoods.train && (
                                  <div className="type-pay">
                                    <div className="travelGoods">
                                      交通：{e.travelGoods.train.departureStation}到{e.travelGoods.train.arrivalStation}
                                      \类型：{e.travelGoods.train.trainsType}\{e.travelGoods.train.seat}
                                    </div>
                                    <div className="remark">{e.travelGoods.train.remark}</div>
                                    <div className="money">
                                      {e.travelGoods.train.personCostPrice + e.travelGoods.train.childCostPrice}
                                    </div>
                                    <div className="money">
                                      {e.travelGoods.train.personMarkPrice + e.travelGoods.train.childMarkPrice}
                                    </div>
                                    <div className="money">
                                      {e.travelGoods.train.personCurrentPrice + e.travelGoods.train.childCurrentPrice}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </TabPane>
            )
          })}
        </Tabs>
      </div>
      {/* <div>{JSON.stringify(productionDetailStore.data?.goodsPrices)}</div> */}
    </div>
  )
}

export default observer(TravelInfo)
