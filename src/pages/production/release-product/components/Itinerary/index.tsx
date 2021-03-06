import React, { useEffect, useState, useImperativeHandle } from 'react'
import { Row, Col, Button, Tabs, Popover } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import './index.less'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react-lite'
import HotelDialog from './components/HotelDialog'
import TravelModel from './components/TravelMode'
import { createPanesData } from '../../utils'
import Travel from './components/Travel'
import ScenicDialog from './components/ScenicDialog'
import MealDialog from './components/MealDialog'
import TransportationDialog from './components/TransportationDialog'
import OriginLocation from './components/OriginLocation'
import { StickyContainer, Sticky } from 'react-sticky'
import DateTimeDialog from './components/DateTimeDialog'
import LimitOrderTime from './components/LimitOrderTime'
import LimitRefundTime from './components/LimitRefundTime'
import add2 from '@/assets/img/add2.png'
/**
 * 行程信息
 */
const Itinerary = (props, ref) => {
  const { productionStore } = useStore()
  const [activeKey, setActiveKey] = useState<string>()

  const [showDateTimeDialog, setShowDateTimeDialog] = useState<boolean>(false)

  const [hotelDialogVisible, setHotelDialogVisible] = useState(false)
  const [scenicDialogVisible, setScenicDialogVisible] = useState(false)
  const [mealDialogVisible, setMealDialogVisible] = useState(false)
  const [transportationDialogVisible, setTransportationDialogVisible] = useState(false)

  useImperativeHandle(ref, () => ({
    next,
  }))

  useEffect(() => {
    console.log('Itinerary next', productionStore)
    setActiveKey(productionStore.data.goodsPrices[0].key)
  }, [productionStore.data.travelMode])

  const next = () => {
    console.log('Itinerary next')
    // const value = form.getFieldsValue()
    // console.log(value)
    // productionStore.addBaseInfo(value)
  }

  const onEdit = (targetKey, action) => {
    if (action === 'remove') {
      productionStore.removeGood(targetKey)
      const pD = createPanesData(productionStore.data)
      setActiveKey(pD[pD.length - 1].key)
    }
  }
  // const printFn = (values) => {

  // }
  const onTabsChange = (activeKey) => {
    setActiveKey(activeKey)
  }

  /**
   * 添加一天行程
   */
  const addTravel = () => {
    productionStore.addTravelOneDay(activeKey)
  }

  const onTabClick = (_activeKey: string) => {
    console.log('click', _activeKey)
    if (activeKey === _activeKey) {
      setShowDateTimeDialog(true)
    }
  }

  const panesData = createPanesData(productionStore.data)
  console.log(panesData)

  const dialogMode = productionStore.data.travelMode == 0 ? 'single' : 'scope'

  return (
    <div className="Itinerary__root">
      <StickyContainer>
        <Row>
          <Col span={8}>
            <TravelModel />
          </Col>
          <Col span={8}>
            <LimitOrderTime />
          </Col>
          <Col span={8}>
            <LimitRefundTime />
          </Col>
        </Row>
        <Row>
          <OriginLocation />
        </Row>
        <Row>
          <div className="content">
            <div className="body">
              <Tabs
                type="editable-card"
                hideAdd
                onChange={onTabsChange}
                activeKey={activeKey}
                onEdit={onEdit}
                onTabClick={onTabClick}
                renderTabBar={(props, DefaultTabBar) => {
                  return (
                    <Sticky bottomOffset={80}>
                      {({ style }) => <DefaultTabBar {...props} className="site-custom-tab-bar" style={{ ...style }} />}
                    </Sticky>
                  )
                }}
                tabBarExtraContent={
                  dialogMode === 'single' ? <Button onClick={() => productionStore.copyGood()}>复制</Button> : <></>
                }
              >
                {panesData.map((item) => (
                  <Tabs.TabPane tab={item.title} key={item.key}>
                    <Travel data={item.travels} activeKey={activeKey} />
                  </Tabs.TabPane>
                ))}
              </Tabs>
            </div>

            <div className="footer">
              <div className="item">
                <Button className="item-btn" onClick={() => setHotelDialogVisible(true)} type="dashed">
                  <img className="img" src={add2} />
                  添加酒店
                </Button>
                <Button
                  className="item-btn"
                  onClick={() => {
                    setScenicDialogVisible(true)
                  }}
                  type="dashed"
                >
                  <img className="img" src={add2} />
                  添加景区
                </Button>
                <Button
                  className="item-btn"
                  onClick={() => {
                    setMealDialogVisible(true)
                  }}
                  type="dashed"
                >
                  <img className="img" src={add2} />
                  添加饭店
                </Button>
                <Button
                  className="item-btn"
                  onClick={() => {
                    setTransportationDialogVisible(true)
                  }}
                  type="dashed"
                >
                  <img className="img" src={add2} />
                  添加交通
                </Button>
                <Button
                  className="item-btn"
                  onClick={() => {
                    productionStore.addTravelDetail(activeKey, 0, {})
                  }}
                  type="dashed"
                >
                  <img className="img" src={add2} />
                  添加一条
                </Button>
                <Button className="item-btn" onClick={addTravel} type="dashed">
                  <img className="img" src={add2} />
                  行程+1天
                </Button>
              </div>
              <div></div>
              {/* <div className="item">供应成本价: ￥{productionStore.data.goodsPrices[0].personCostPrice}</div> */}
              {/* <div className="item">市场标价: ￥{productionStore.data.goodsPrices[0].personMarkPrice}</div> */}
              <div className="item">
                现售价 合计: <span className="price">￥{productionStore.getCurrentPrice(activeKey)}</span>
              </div>
            </div>
          </div>
        </Row>

        <HotelDialog
          visible={hotelDialogVisible}
          activeKey={activeKey}
          onCancel={() => {
            setHotelDialogVisible(false)
          }}
        />
        <ScenicDialog
          visible={scenicDialogVisible}
          activeKey={activeKey}
          onCancel={() => {
            setScenicDialogVisible(false)
          }}
        />
        <MealDialog
          visible={mealDialogVisible}
          activeKey={activeKey}
          onCancel={() => {
            setMealDialogVisible(false)
          }}
        />
        <TransportationDialog
          visible={transportationDialogVisible}
          activeKey={activeKey}
          onCancel={() => {
            setTransportationDialogVisible(false)
          }}
        />
      </StickyContainer>

      <DateTimeDialog
        activeKey={activeKey}
        show={showDateTimeDialog}
        onClose={() => setShowDateTimeDialog(false)}
        mode={dialogMode}
      />
    </div>
  )
}

export default observer(Itinerary, { forwardRef: true })
