import { useStore } from '@/store/context'
import { getJWT } from '@/utils/biz'
import { Button, Col, Form, Input, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import './index.less'

/**
 * 登录页面
 */
const LoginPage: React.FC = () => {
  const { adminStore } = useStore()
  useEffect(() => {
    if (getJWT()) {
      // 已经登录，跳转到首页
      location.href = '/'
    }
  }, [])

  const onFinish = (values: any) => {
    console.log('Success:', values)
    adminStore.login(values.account, values.password)
  }

  const onFinishFailed = (errorInfo: any) => {
    // console.log('Failed:', errorInfo)
  }

  return (
    <div className="LoginPage__root">
      <Row className="content">
        <Col span={8}></Col>
        <Col span={8}>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 12 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item label="账号" name="account" rules={[{ required: true, message: '请输入账号' }]}>
              <Input />
            </Form.Item>

            <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={8}></Col>
      </Row>
    </div>
  )
}

export default observer(LoginPage)
