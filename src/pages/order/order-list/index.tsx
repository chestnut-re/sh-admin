import React, { useState, useEffect } from 'react'
import { Radio, Row, Col, Space, Input, Select, Button, Form } from 'antd'
import './index.less'
/**
 * 订单列表
 */
const OrderListPage: React.FC = () => {
  const [form] = Form.useForm()
  const [tabValue, setTabValue] = useState('全部')
  const options = [
    { label: '全部', value: '全部', innerWidth: '40px' },
    { label: '待付款(34)', value: '待付款(34)' },
    { label: '待确认(302)', value: '待确认(302)' },
    { label: '已完成', value: '已完成' },
    { label: '已失效', value: '已失效' },
  ]

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="order__root">
      <div className="order-header">
        <span className="header-title">订单列表</span>
        <span className="header-btn">
          <span>46</span>
          &nbsp;笔待分配订单&nbsp;&nbsp;
          <span>去分配</span>
        </span>
      </div>
      <div className="order-tabs">
        <Radio.Group
          options={options}
          onChange={(e) => {
            setTabValue(e.target.value)
          }}
          value={tabValue}
          optionType="button"
          buttonStyle="solid"
        />
      </div>
      <div className="order-form">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Row gutter={[5, 0]} style={{ paddingLeft: '40px' }}>
            <Col span={8}>
              <Input name="admin" />
            </Col>
            <Col span={2} className="table-from-label">
              角色
            </Col>
            <Col span={4}>
              <Select defaultValue="全部" style={{ width: 120 }} onChange={(value) => setRole(value)}>
                {/* {roleData?.map((item) => {
                  return (
                    <Option value={item.value} key={item.key}>
                      {item.value}
                    </Option>
                  )
                })} */}
              </Select>
            </Col>
            <Col span={2} className="table-from-label">
              状态
            </Col>
            <Col span={4}>
              <Select defaultValue="全部" style={{ width: 120 }} onChange={(value) => setState(value)}>
                {/* {stateList.map((item) => {
                  return (
                    <Option value={item.value} key={item.key}>
                      {item.value}
                    </Option>
                  )
                })} */}
              </Select>
            </Col>
            <Form.Item wrapperCol={{ offset: 2, span: 0 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button
                  htmlType="submit"
                  // onClick={() => {
                  //   setRole('全部')
                  //   setState('全部')
                  // }}
                >
                  重置
                </Button>
              </Space>
            </Form.Item>
          </Row>
          <Row style={{ paddingLeft: '40px' }}>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="button">
                  添加
                </Button>
              </Space>
            </Form.Item>
          </Row>
        </Form>
      </div>
    </div>
  )
}
export default OrderListPage
