import { useStore } from '@/store/context'
import { Col, Form, Input, InputNumber, Modal, Row, Select } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Map } from 'react-amap'
import MapComp from '../MapComp'
import PriceItem from '../PriceItem'

interface Props {
  visible: boolean
  activeKey: string | undefined
  onCancel: () => void
}

/**添加饭店 */
const MealDialog: React.FC<Props> = ({ visible, onCancel, activeKey }) => {
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
      productionStore.addTravelDetail(activeKey, 4, query)
      form.resetFields()
      onCancel()
    })
  }

  const handleCancel = () => {
    onCancel()
  }

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  }

  return (
    <Modal
      centered
      title={'饭店'}
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
            <Form.Item {...layout} name="restaurantName" label="饭店名称" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item {...layout} name="limitPeople" label="团餐人限">
              <InputNumber min={0} />
            </Form.Item>
            <PriceItem />
            <Form.Item {...layout} name={'remark'} label="其他备注">
              <Input.TextArea placeholder="可填写：该景点的独有的特点，或其他优势" />
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

export default observer(MealDialog)
