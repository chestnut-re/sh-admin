import { useStore } from '@/store/context'
import { formateTime } from '@/utils/timeUtils'
import { Col, Form, Input, InputNumber, Modal, Radio, Row, Select, TimePicker } from 'antd'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Map } from 'react-amap'
import MapComp from '../MapComp'
import PriceItem from '../PriceItem'

interface Props {
  visible: boolean
  activeKey: string | undefined
  onCancel: () => void
}

/**添加交通 */
const TransportationDialog: React.FC<Props> = ({ visible, onCancel, activeKey }) => {
  const { productionStore } = useStore()
  const [form] = Form.useForm()

  const [refresh, setRefresh] = useState<number>(1)
  const updatePage = () => {
    let a = refresh
    setRefresh(++a)
  }

  useEffect(() => {
    form.setFieldsValue({ transportation: 1 })
  }, [])

  /**提交 */
  const handleOk = () => {
    form.validateFields().then((query) => {
      query.departureTime = formateTime(query.departureTime, 'HH:mm')
      console.log('query', query)
      if (query.latlng && query.latlng.length === 2) {
        query.longitude = query.latlng[0]
        query.latitude = query.latlng[1]
      }
      if (query.transportation === 1) {
        productionStore.addTravelDetail(activeKey, 1, query)
      } else if (query.transportation === 2) {
        productionStore.addTravelDetail(activeKey, 6, query)
      } else if (query.transportation === 3) {
        productionStore.addTravelDetail(activeKey, 2, query)
      }
      form.resetFields()
      onCancel()
    })
  }

  const handleCancel = () => {
    form.resetFields()
    onCancel()
  }

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  }

  return (
    <Modal
      centered
      title={'交通'}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={1000}
      cancelText="取消"
      okText="保存提交"
    >
      <Form form={form}>
        <Row>
          <Col span={12}>
            <Form.Item {...layout} name="transportation" label="交通方式" rules={[{ required: true }]}>
              <Select style={{ width: 120 }} onChange={updatePage}>
                <Select.Option value={1}>飞机</Select.Option>
                <Select.Option value={2}>火车</Select.Option>
                <Select.Option value={3}>大巴</Select.Option>
              </Select>
            </Form.Item>

            {form.getFieldValue('transportation') == 1 && (
              <>
                <Form.Item {...layout} name="airline" label="航空公司" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item {...layout} name="departAirport" label="出发机场" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item {...layout} name="arriveAirport" label="到达机场" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item {...layout} name="departureTime" label="起飞时间" rules={[{ required: true }]}>
                  <TimePicker format={'HH:mm'} />
                </Form.Item>
                <Form.Item {...layout} name="aircraftCabin" label="出行舱位" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </>
            )}

            {form.getFieldValue('transportation') == 2 && (
              <>
                <Form.Item {...layout} name="trainsType" label="车次类型" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item {...layout} name="departureStation" label="出发站" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item {...layout} name="arrivalStation" label="到达站" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item {...layout} name="departureTime" label="发车时间" rules={[{ required: true }]}>
                  <TimePicker format={'HH:mm'} />
                </Form.Item>
                <Form.Item {...layout} name="seat" label="选择席位" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </>
            )}

            {form.getFieldValue('transportation') == 3 && (
              <>
                <Form.Item {...layout} name="trainsType" label="车型" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item {...layout} name="departureStation" label="出发站" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item {...layout} name="arrivalStation" label="使用权限" rules={[{ required: true }]}>
                  <Radio.Group>
                    <Radio value={'租赁'}>租赁</Radio>
                    <Radio value={'自有'}>自有</Radio>
                  </Radio.Group>
                </Form.Item>
              </>
            )}

            <PriceItem />

            <Form.Item {...layout} name={'remark'} label="其他备注">
              <Input.TextArea placeholder="可填写: 优势信息" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item {...layout} name={'latlng'}>
              <MapComp />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default TransportationDialog
