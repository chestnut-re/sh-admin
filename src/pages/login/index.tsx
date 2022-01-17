/*
 * @Description: 
 * @LastEditTime: 2022-01-17 14:48:46
 */
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
  const [form] = Form.useForm()
  const { adminStore } = useStore()
  useEffect(() => {
    //TODO: test
    form.setFieldsValue({
      // username: 'qwrqerewty',
      // password: '6623664xing',
      username: '',
      password: '',
    })

    if (getJWT()) {
      // 已经登录，跳转到首页
      window.location.href = '/'
    }
  }, [])

  const onFinish = (values: any) => {
    adminStore.login(values.username, values.password)
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
            form={form}
          >
            <Form.Item label="账号" name="username" rules={[{ required: true, message: '请输入账号' }]}>
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
