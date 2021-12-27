import React, { useEffect, useState, useImperativeHandle } from 'react'
import { Row, Col, Form, DatePicker, Button, Divider, Tabs } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import './index.less'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react-lite'
import HotelDialog from './components/HotelDialog'
import TravelModel from './components/TravelMode'
import LimitOrderTime from './components/LimitOrderTime'
import LimitRefundTime from './components/LimitOrderTime'
import { createPanesData } from '../../utils'
import Travel from './components/Travel'

interface Props {}

/**行程消息 */
const Itinerary: React.FC<Props> = (props, ref) => {
  const { productionStore } = useStore()
  const [activeKey, setActiveKey] = useState<string>()
  const [modalType, setModalType] = useState({})

  const [newAddDataIndex, setNewAddDataIndex] = useState(0)

  const [itineraryData, setItineraryData] = useState({})

  const [hotelDialogVisible, setHotelDialogVisible] = useState(false)

  useImperativeHandle(ref, () => ({
    next,
  }))

  useEffect(() => {
    productionStore.initData()
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
    }
  }

  const onTabsChange = (activeKey) => {
    setActiveKey(activeKey)
  }

  /**
   * 添加一天行程
   */
  const addTravel = () => {
    productionStore.addTravelOneDay(activeKey)
  }

  /**
   * 添加一条数据
   */
  const addADataInput = (e) => {
    const { value } = e.target
    const data = { ...itineraryData }

    data['travelTitle'] = value
    setItineraryData(data)
  }

  const panesData = createPanesData(productionStore.data)
  console.log(panesData)

  return (
    <div className="Itinerary__root">
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
        <div className="content">
          <div className="body">
            <Tabs
              type="editable-card"
              hideAdd
              onChange={onTabsChange}
              activeKey={activeKey}
              onEdit={onEdit}
              tabBarExtraContent={<Button onClick={() => productionStore.copyGood()}>复制</Button>}
            >
              {panesData.map((item) => (
                <Tabs.TabPane tab={item.title} key={item.key}>
                  <Travel data={item.travelDetails} />
                </Tabs.TabPane>
              ))}
            </Tabs>
          </div>

          <div className="footer">
            <div className="item">
              <Button icon={<PlusOutlined />} onClick={() => setHotelDialogVisible(true)} type="dashed">
                添加酒店
              </Button>
              <Button icon={<PlusOutlined />} onClick={() => {}} type="dashed">
                添加景区
              </Button>
              <Button icon={<PlusOutlined />} onClick={() => {}} type="dashed">
                添加饭店
              </Button>
              <Button icon={<PlusOutlined />} onClick={() => {}} type="dashed">
                添加交通
              </Button>
              <Button icon={<PlusOutlined />} onClick={addTravel} type="dashed">
                行程+1天
              </Button>
              <Button icon={<PlusOutlined />} onClick={() => {}} type="dashed">
                添加一条
              </Button>
            </div>
            <div className="item">现售价 合计：￥ 1000</div>
          </div>
        </div>
      </Row>

      <HotelDialog
        visible={hotelDialogVisible}
        onCancel={() => {
          setHotelDialogVisible(false)
        }}
      />
    </div>
  )
}

export default observer(Itinerary, { forwardRef: true })
