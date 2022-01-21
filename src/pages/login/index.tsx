/*
 * @Description:
 * @LastEditTime: 2022-01-21 14:25:16
 */
import { useStore } from '@/store/context'
import { getJWT } from '@/utils/biz'
import { Button, Col, Form, Input, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import logo from '@/assets/img/logo.png'
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
        {/* <Col span={8}></Col> */}
        <Col span={24}>
          <Form
            name="basic"
            className="login"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
          >
            <img className="loginImg" src={logo} alt="" />
            <div className="name">山海管理后台</div>
            <Form.Item label="" className="username" name="username" rules={[{ required: true, message: '用户名输入错误' }]}>
              <Input placeholder="请输入用户名" />
            </Form.Item>
            <div className="mb16"></div>
            <Form.Item label="" className="password" name="password" rules={[{ required: true, message: '密码输入错误' }]}>
              <Input.Password placeholder="请输入密码" />
            </Form.Item>
            <div className="mb16"></div>
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button type="primary" className="btn" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </Col>
        {/* <Col span={8}></Col> */}
      </Row>
    </div>
  )
}

export default observer(LoginPage)
