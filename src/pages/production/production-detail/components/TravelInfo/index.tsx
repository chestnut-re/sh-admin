import { useStore } from '@/store/context'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Tabs, Col, Row } from 'antd'
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
                      <Row className="what-day" key={num}>
                        <Col className="every" span={1}>
                          {li.whatDay}
                        </Col>
                        <Col className="every-info" span={23}>
                          {li.travelDetails?.map((e, o) => {
                            return (
                              <Row className="day-info" key={o}>
                                <Col span={1} className="travelTime">
                                  {e.travelTime}
                                </Col>
                                <Col span={3} className="travelTitle">
                                  {e.travelTitle}
                                </Col>
                                {/* <p>交通</p> */}
                                <Col span={20} className="type-pay">
                                  {e.travelGoods.airTicket && (
                                    <Row>
                                      <Col span={11} className="travelGoods">
                                        交通：{e.travelGoods.airTicket.departAirport}飞
                                        {e.travelGoods.airTicket.arriveAirport}\{e.travelGoods.airTicket.aircraftCabin}
                                      </Col>
                                      <Col span={10} className="remark">
                                        {e.travelGoods.airTicket.remark}
                                      </Col>
                                      <Col span={1} className="money">
                                        {e.travelGoods.airTicket.personCostPrice +
                                          e.travelGoods.airTicket.childCostPrice}
                                      </Col>
                                      <Col span={1} className="money">
                                        {e.travelGoods.airTicket.personMarkPrice +
                                          e.travelGoods.airTicket.childMarkPrice}
                                      </Col>
                                      <Col span={1} className="money">
                                        {e.travelGoods.airTicket.personCurrentPrice +
                                          e.travelGoods.airTicket.childCurrentPrice}
                                      </Col>
                                    </Row>
                                  )}
                                  {e.travelGoods.hotel && (
                                    <Row>
                                      <Col span={11} className="travelGoods">
                                        酒店：{e.travelGoods.hotel.hotelName}\{e.travelGoods.hotel.roomType}
                                      </Col>
                                      <Col span={10} className="remark">
                                        {e.travelGoods.hotel.remark}
                                      </Col>
                                      <Col span={1} className="money">
                                        {e.travelGoods.hotel.personCostPrice + e.travelGoods.hotel.childCostPrice}
                                      </Col>
                                      <Col span={1} className="money">
                                        {e.travelGoods.hotel.personMarkPrice + e.travelGoods.hotel.childMarkPrice}
                                      </Col>
                                      <Col span={1} className="money">
                                        {e.travelGoods.hotel.personCurrentPrice + e.travelGoods.hotel.childCurrentPrice}
                                      </Col>
                                    </Row>
                                  )}
                                  {e.travelGoods.restaurant && (
                                    <Row>
                                      <Col span={11} className="travelGoods">
                                        餐饮：{e.travelGoods.restaurant.restaurantName}\限
                                        {e.travelGoods.restaurant.limitPeople}人
                                      </Col>
                                      <Col span={10} className="remark">
                                        {e.travelGoods.restaurant.remark}
                                      </Col>
                                      <Col span={1} className="money">
                                        {e.travelGoods.restaurant.personCostPrice +
                                          e.travelGoods.restaurant.childCostPrice}
                                      </Col>
                                      <Col span={1} className="money">
                                        {e.travelGoods.restaurant.personMarkPrice +
                                          e.travelGoods.restaurant.childMarkPrice}
                                      </Col>
                                      <Col span={1} className="money">
                                        {e.travelGoods.restaurant.personCurrentPrice +
                                          e.travelGoods.restaurant.childCurrentPrice}
                                      </Col>
                                    </Row>
                                  )}
                                  {e.travelGoods.scenicSpot && (
                                    <Row>
                                      <Col span={11} className="travelGoods">
                                        景点：{e.travelGoods.scenicSpot.scenicSpotName}\限
                                        {e.travelGoods.scenicSpot.visitingTime}分钟\附加项目：
                                        {JSON.stringify(e.travelGoods.scenicSpot.additionItem)}
                                      </Col>
                                      <Col span={10} className="remark">
                                        {e.travelGoods.scenicSpot.remark}
                                      </Col>
                                      <Col span={1} className="money">
                                        {e.travelGoods.scenicSpot.personCostPrice +
                                          e.travelGoods.scenicSpot.childCostPrice}
                                      </Col>
                                      <Col span={1} className="money">
                                        {e.travelGoods.scenicSpot.personMarkPrice +
                                          e.travelGoods.scenicSpot.childMarkPrice}
                                      </Col>
                                      <Col span={1} className="money">
                                        {e.travelGoods.scenicSpot.personCurrentPrice +
                                          e.travelGoods.scenicSpot.childCurrentPrice}
                                      </Col>
                                    </Row>
                                  )}
                                  {e.travelGoods.bus && (
                                    <Row>
                                      <Col span={11} className="travelGoods">
                                        交通：{e.travelGoods.bus.departureStation}\车型：{e.travelGoods.bus.busType}
                                        \使用类型：{e.travelGoods.bus.busUseType}
                                      </Col>
                                      <Col span={10} className="remark">
                                        {e.travelGoods.bus.remark}
                                      </Col>
                                      <Col span={1} className="money">
                                        {e.travelGoods.bus.personCostPrice + e.travelGoods.bus.childCostPrice}
                                      </Col>
                                      <Col span={1} className="money">
                                        {e.travelGoods.bus.personMarkPrice + e.travelGoods.bus.childMarkPrice}
                                      </Col>
                                      <Col span={1} className="money">
                                        {e.travelGoods.bus.personCurrentPrice + e.travelGoods.bus.childCurrentPrice}
                                      </Col>
                                    </Row>
                                  )}
                                  {e.travelGoods.train && (
                                    <Row>
                                      <Col span={11} className="travelGoods">
                                        交通：{e.travelGoods.train.departureStation}到
                                        {e.travelGoods.train.arrivalStation}
                                        \类型：{e.travelGoods.train.trainsType}\{e.travelGoods.train.seat}
                                      </Col>
                                      <Col span={10} className="remark">
                                        {e.travelGoods.train.remark}
                                      </Col>
                                      <Col span={1} className="money">
                                        {e.travelGoods.train.personCostPrice + e.travelGoods.train.childCostPrice}
                                      </Col>
                                      <Col span={1} className="money">
                                        {e.travelGoods.train.personMarkPrice + e.travelGoods.train.childMarkPrice}
                                      </Col>
                                      <Col span={1} className="money">
                                        {e.travelGoods.train.personCurrentPrice + e.travelGoods.train.childCurrentPrice}
                                      </Col>
                                    </Row>
                                  )}
                                </Col>
                              </Row>
                            )
                          })}
                        </Col>
                      </Row>
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
