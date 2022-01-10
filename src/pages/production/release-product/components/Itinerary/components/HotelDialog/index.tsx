import { useStore } from '@/store/context'
import { Col, Form, Input, Modal, Row, Select } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import MapComp from '../MapComp'
import PriceItem from '../PriceItem'

interface Props {
  visible: boolean
  activeKey: string | undefined
  onCancel: () => void
}

/**酒店Dialog */
const HotelDialog: React.FC<Props> = ({ visible, onCancel, activeKey }) => {
  const { productionStore } = useStore()
  const [form] = Form.useForm()

  /**提交 */
  const handleOk = () => {
    form.validateFields().then((query) => {
      console.log('query', query)
      if (query.latlng && query.latlng.length === 2) {
        query.longitude = query.latlng[0]
        query.latitude = query.latlng[1]
      }
      productionStore.addTravelDetail(activeKey, 3, query)
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
      title="添加酒店"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={1000}
      cancelText="取消"
      okText="保存"
    >
      <Form form={form}>
        <Row>
          {/* 添加酒店 */}
          <Col span={12}>
            <Form.Item
              {...layout}
              name="hotelName"
              label="酒店名称"
              rules={[{ required: true, message: '请输入酒店名称' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item {...layout} name="roomType" label="选择房型" rules={[{ required: true, message: '请选择房型' }]}>
              <Select placeholder="房型" allowClear>
                <Select.Option value="单人间">单人间</Select.Option>
                <Select.Option value="大床双人间">大床双人间</Select.Option>
                <Select.Option value="双床双人间">双床双人间</Select.Option>
                <Select.Option value="单人床双人间">单人床双人间</Select.Option>
                <Select.Option value="三人间">三人间</Select.Option>
                <Select.Option value="套房">套房</Select.Option>
              </Select>
            </Form.Item>
            <PriceItem />
            <Form.Item {...layout} name={'remark'} label="其他备注">
              <Input.TextArea placeholder="可填写：酒店距景区" />
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

export default observer(HotelDialog)
