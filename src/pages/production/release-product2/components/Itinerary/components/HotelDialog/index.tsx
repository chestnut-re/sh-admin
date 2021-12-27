import { Col, Form, Input, Modal, Row, Select } from 'antd'
import React from 'react'

interface Props {
  visible: boolean
  onCancel: () => void
}

/**酒店Dialog */
const HotelDialog: React.FC<Props> = ({ visible, onCancel }) => {
  const [hotelForm] = Form.useForm()

  const handleOk = () => {
    console.log('ok')
    console.log(hotelForm.getFieldsValue());
    
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
      title="添加酒店"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={1000}
      cancelText="取消"
      okText="保存"
    >
      <Row>
        {/* 添加酒店 */}
        <Col span={12}>
          <Form form={hotelForm}>
            <Form.Item {...layout} name="note" label="酒店名称" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item {...layout} name="gender" label="选择房型" rules={[{ required: true }]}>
              <Select
                placeholder="房型"
                // onChange={onGenderChange}
                allowClear
              >
                <Select.Option value="male">大床放</Select.Option>
                <Select.Option value="female">双人床</Select.Option>
                <Select.Option value="other">套房</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item {...layout} label="供应成本价格" style={{ marginBottom: 0 }}>
              <Form.Item
                name="year"
                rules={[{ required: true }]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
              >
                <Input placeholder="成人价" />
              </Form.Item>
              <Form.Item
                name="month"
                rules={[{ required: true }]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
              >
                <Input placeholder="儿童价" />
              </Form.Item>
            </Form.Item>
            <Form.Item {...layout} label="市场标价" style={{ marginBottom: 0 }}>
              <Form.Item
                name="year"
                rules={[{ required: true }]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
              >
                <Input placeholder="成人价" />
              </Form.Item>
              <Form.Item
                name="month"
                rules={[{ required: true }]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
              >
                <Input placeholder="儿童价" />
              </Form.Item>
            </Form.Item>
            <Form.Item {...layout} label="现售价" style={{ marginBottom: 0 }}>
              <Form.Item
                name="year"
                rules={[{ required: true }]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
              >
                <Input placeholder="成人价" />
              </Form.Item>
              <Form.Item
                name="month"
                rules={[{ required: true }]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
              >
                <Input placeholder="儿童价" />
              </Form.Item>
            </Form.Item>
            <Form.Item {...layout} name={['user', 'introduction']} label="其他备注">
              <Input.TextArea placeholder="可填写：酒店距景区" />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>
  )
}

export default HotelDialog
