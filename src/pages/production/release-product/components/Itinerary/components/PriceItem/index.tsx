import { Form, InputNumber } from 'antd'
import React from 'react'

const PriceItem: React.FC = () => {
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  }

  return (
    <>
      <Form.Item {...layout} label="供应成本价格" style={{ marginBottom: 0 }}>
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
      <Form.Item {...layout} label="市场标价" style={{ marginBottom: 0 }}>
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
      <Form.Item {...layout} label="现售价" style={{ marginBottom: 0 }} rules={[{ required: true }]}>
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
    </>
  )
}

export default PriceItem
