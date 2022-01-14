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
    debugger
    console.log(productionStore.data)
    setActiveKey(productionStore.data.goodsPrices[0].key)
  }, [])

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
                <Button icon={<PlusOutlined />} onClick={() => setHotelDialogVisible(true)} type="dashed">
                  添加酒店
                </Button>
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setScenicDialogVisible(true)
                  }}
                  type="dashed"
                >
                  添加景区
                </Button>
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setMealDialogVisible(true)
                  }}
                  type="dashed"
                >
                  添加饭店
                </Button>
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setTransportationDialogVisible(true)
                  }}
                  type="dashed"
                >
                  添加交通
                </Button>
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => {
                    productionStore.addTravelDetail(activeKey, 0, {})
                  }}
                  type="dashed"
                >
                  添加一条
                </Button>
                <Button icon={<PlusOutlined />} onClick={addTravel} type="dashed">
                  行程+1天
                </Button>
              </div>
              <div></div>
              {/* <div className="item">供应成本价: ￥{productionStore.data.goodsPrices[0].personCostPrice / 100}</div> */}
              {/* <div className="item">市场标价: ￥{productionStore.data.goodsPrices[0].personMarkPrice / 100}</div> */}
              <div className="item">现售价 合计: ￥{productionStore.getCurrentPrice(activeKey) / 100}</div>
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
