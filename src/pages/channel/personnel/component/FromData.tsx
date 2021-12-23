import { Button, Form, Input, InputNumber, Space } from 'antd'
import React, { useState } from 'react'
import Prefecture from './Prefecture'
import SelectData from './SelectData'
import SwitchData from './SwitchData'

const FromData: React.FC = () => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  }
  const [visible, setVisible] = useState(false)
  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: '请填写${label}!',
    // types: {
    //   email: '${label} is not a valid email!',
    //   number: '${label} is not a valid number!',
    // },
    number: {
      range: '${0} must be between ${0} and ${100}',
    },
  }
  const onFinish = (values: any) => {
    console.log(values)
  }
  const showUserModal = () => {
    setVisible(true)
  }
  return (
    <div>
      <Form {...layout} name="nest-messages" size="large" onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item name={['person', 'prefecture']} label="责任区域" rules={[{ required: true }]}>
          <Prefecture />
        </Form.Item>
        <Form.Item name={['person', 'channel']} label="归属渠道">
          <Input placeholder="渠道名称" />
        </Form.Item>
        <Form.Item name={['person', 'dependence']} label="从属关系" rules={[{ required: true }]}>
          <SelectData />
        </Form.Item>
        <Form.Item name={['person', 'name']} label="姓名">
          <Input />
        </Form.Item>
        <Form.Item name={['person', 'we-chat']} label="微信号">
          <Input />
        </Form.Item>
        <Form.Item name={['person', 'tel']} label="手机号/账号" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['person', 'subsidy']} label="定制补贴">
          <InputNumber />
          &nbsp;&nbsp;&nbsp;&nbsp;%
        </Form.Item>
        <Space>权限配置</Space>
        <Form.Item name={['person', 'role-name']} label="角色名称" rules={[{ required: true }]}>
          <SelectData></SelectData>
        </Form.Item>
        <Form.Item name={['person', 'switch']} label="是否启用" rules={[{ required: true }]}>
          <SwitchData />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button htmlType="submit" type="primary">
            保存
          </Button>
          <Button htmlType="button" style={{ margin: '50px 80px' }} onClick={showUserModal}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default FromData
