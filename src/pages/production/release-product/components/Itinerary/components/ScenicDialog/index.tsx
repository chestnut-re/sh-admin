import { useStore } from '@/store/context'
import { Col, Form, Input, InputNumber, Modal, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import MapComp from '../MapComp'

interface Props {
  visible: boolean
  activeKey: string | undefined
  onCancel: () => void
}

/**添加景点 */
const ScenicDialog: React.FC<Props> = ({ visible, onCancel, activeKey }) => {
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
      productionStore.addTravelDetail(activeKey, 5, query)
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
      title={'景点'}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={1000}
      cancelText="取消"
      okText="保存提交"
    >
      <Form form={form}>
        <Row>
          {/* 添加景点 */}
          <Col span={12}>
            <Form.Item {...layout} name="scenicSpotName" label="景点名称" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item {...layout} name="visitingTime" label="游览时长" rules={[{ required: true }]}>
              <InputNumber placeholder="时间(分钟)" min={0} />
            </Form.Item>
            <Form.Item {...layout} label="门票成本价格" style={{ marginBottom: 0 }}>
              <Form.Item
                name="personCostPrice"
                rules={[{ required: true, message: '请输入成人价' }]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
              >
                <InputNumber placeholder="成人价" min={0} />
              </Form.Item>
              <Form.Item
                name="childCostPrice"
                rules={[{ required: true, message: '请输入儿童价' }]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
              >
                <InputNumber placeholder="儿童价" min={0} />
              </Form.Item>
            </Form.Item>
            <Form.Item {...layout} label="门票标价" style={{ marginBottom: 0 }}>
              <Form.Item
                name="personMarkPrice"
                rules={[{ required: true, message: '请输入成人价' }]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
              >
                <InputNumber placeholder="成人价" min={0} />
              </Form.Item>
              <Form.Item
                name="childMarkPrice"
                rules={[{ required: true, message: '请输入儿童价' }]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
              >
                <InputNumber placeholder="儿童价" min={0} />
              </Form.Item>
            </Form.Item>
            <Form.Item {...layout} label="现售价" style={{ marginBottom: 0 }}>
              <Form.Item
                name="personCurrentPrice"
                rules={[{ required: true, message: '请输入成人价' }]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
              >
                <InputNumber placeholder="成人价" min={0} />
              </Form.Item>
              <Form.Item
                name="childCurrentPrice"
                rules={[{ required: true, message: '请输入儿童价' }]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
              >
                <InputNumber placeholder="儿童价" min={0} />
              </Form.Item>
            </Form.Item>
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

export default observer(ScenicDialog)
