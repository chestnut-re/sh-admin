import { useStore } from '@/store/context'
import { getPriceFromTravels } from '@/store/productStore'
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
    console.log(productionDetailStore)
  }
  return (
    <div className="TravelInfo__root">
      <h4>2. 行程信息</h4>
      <div className="time">
        <div>出行时间:{productionDetailStore.data?.travelMode == 0 ? '固定时间' : '约定时间'}</div>
        <div>截止下单时间: {productionDetailStore.data?.orderDeadline}小时</div>
        <div>截止退款时间: {productionDetailStore.data?.refundDeadline}小时</div>
        <div>始发地: {productionDetailStore.data?.departureCity}</div>
      </div>
      <div className="tabs">
        <Tabs onChange={callback} type="card">
          {productionDetailStore.data?.goodsPrices?.map((item, index) => {
            return (
              <TabPane tab={`${item.startDate} · ¥${item.personCostPrice / 100}`} key={index}>
                <div className="all-day">
                  <div className="math-box">
                    <Row className="math">
                      <Col span={1}></Col>
                      <Col span={23}>
                        <Row>
                          <Col className="math-value" span={1}>
                            行程时间
                          </Col>
                          <Col className="math-value" span={3}>
                            行程安排
                          </Col>
                          <Col span={20}>
                            <Row>
                              <Col className="math-value" span={11}>
                                项目
                              </Col>
                              <Col className="math-value" span={8}>
                                备注
                              </Col>
                              <Col className="math-value" span={2}>
                                供应成本价
                              </Col>
                              <Col className="math-value" span={2}>
                                市场标价
                              </Col>
                              <Col className="math-value" span={1}>
                                现售价
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
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
                                        交通：飞机\{e.travelGoods.airTicket.departAirport}飞
                                        {e.travelGoods.airTicket.arriveAirport}\{e.travelGoods.airTicket.aircraftCabin}
                                      </Col>
                                      <Col span={8} className="remark">
                                        {e.travelGoods.airTicket.remark}
                                      </Col>
                                      <Col span={2} className="money">
                                        ¥{e.travelGoods.airTicket.personCostPrice}
                                      </Col>
                                      <Col span={2} className="money">
                                        ¥{e.travelGoods.airTicket.personMarkPrice}
                                      </Col>
                                      <Col span={1} className="money">
                                        ¥{e.travelGoods.airTicket.personCurrentPrice}
                                      </Col>
                                    </Row>
                                  )}
                                  {e.travelGoods.hotel && (
                                    <Row>
                                      <Col span={11} className="travelGoods">
                                        酒店：{e.travelGoods.hotel.hotelName}\{e.travelGoods.hotel.roomType}
                                      </Col>
                                      <Col span={8} className="remark">
                                        {e.travelGoods.hotel.remark}
                                      </Col>
                                      <Col span={2} className="money">
                                        ¥{e.travelGoods.hotel.personCostPrice}
                                      </Col>
                                      <Col span={2} className="money">
                                        ¥{e.travelGoods.hotel.personMarkPrice}
                                      </Col>
                                      <Col span={1} className="money">
                                        ¥{e.travelGoods.hotel.personCurrentPrice}
                                      </Col>
                                    </Row>
                                  )}
                                  {e.travelGoods.restaurant && (
                                    <Row>
                                      <Col span={11} className="travelGoods">
                                        餐饮：{e.travelGoods.restaurant.restaurantName}\限
                                        {e.travelGoods.restaurant.limitPeople}人
                                      </Col>
                                      <Col span={8} className="remark">
                                        {e.travelGoods.restaurant.remark}
                                      </Col>
                                      <Col span={2} className="money">
                                        ¥{e.travelGoods.restaurant.personCostPrice}
                                      </Col>
                                      <Col span={2} className="money">
                                        ¥{e.travelGoods.restaurant.personMarkPrice}
                                      </Col>
                                      <Col span={1} className="money">
                                        ¥{e.travelGoods.restaurant.personCurrentPrice}
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
                                      <Col span={8} className="remark">
                                        {e.travelGoods.scenicSpot.remark}
                                      </Col>
                                      <Col span={2} className="money">
                                        ¥{e.travelGoods.scenicSpot.personCostPrice}
                                      </Col>
                                      <Col span={2} className="money">
                                        ¥{e.travelGoods.scenicSpot.personMarkPrice}
                                      </Col>
                                      <Col span={1} className="money">
                                        ¥{e.travelGoods.scenicSpot.personCurrentPrice}
                                      </Col>
                                    </Row>
                                  )}
                                  {e.travelGoods.bus && (
                                    <Row>
                                      <Col span={11} className="travelGoods">
                                        交通：大巴\{e.travelGoods.bus.departureStation}\车型：
                                        {e.travelGoods.bus.busType}
                                        \使用类型：{e.travelGoods.bus.busUseType}
                                      </Col>
                                      <Col span={8} className="remark">
                                        {e.travelGoods.bus.remark}
                                      </Col>
                                      <Col span={2} className="money">
                                        ¥{e.travelGoods.bus.personCostPrice}
                                      </Col>
                                      <Col span={2} className="money">
                                        ¥{e.travelGoods.bus.personMarkPrice}
                                      </Col>
                                      <Col span={1} className="money">
                                        ¥{e.travelGoods.bus.personCurrentPrice}
                                      </Col>
                                    </Row>
                                  )}
                                  {e.travelGoods.train && (
                                    <Row>
                                      <Col span={11} className="travelGoods">
                                        交通：火车\{e.travelGoods.train.departureStation}到
                                        {e.travelGoods.train.arrivalStation}
                                        \类型：{e.travelGoods.train.trainsType}\{e.travelGoods.train.seat}
                                      </Col>
                                      <Col span={8} className="remark">
                                        {e.travelGoods.train.remark}
                                      </Col>
                                      <Col span={2} className="money">
                                        ¥{e.travelGoods.train.personCostPrice}
                                      </Col>
                                      <Col span={2} className="money">
                                        ¥{e.travelGoods.train.personMarkPrice}
                                      </Col>
                                      <Col span={1} className="money">
                                        ¥{e.travelGoods.train.personCurrentPrice}
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
                  <div className="math-box">
                    <Row className="math">
                      <Col span={1}></Col>
                      <Col span={23}>
                        <Row>
                          <Col span={1}></Col>
                          <Col span={3}></Col>
                          <Col span={20}>
                            <Row>
                              <Col className="math-name" span={19}>
                                合计
                              </Col>
                              <Col className="math-value" span={2}>
                                ¥{item.personCostPrice / 100}
                              </Col>
                              <Col className="math-value" span={2}>
                                ¥{item.personMarkPrice / 100}
                              </Col>
                              <Col className="math-value" span={1}>
                                ¥{item.personCurrentPrice / 100}
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
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
