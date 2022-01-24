import { Space, Table, Tag, Form, Row, Col, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { InputTemp, SelectTemp } from '@/components/filter/formItem'

/**
 * 系统中心-权限管理-角色管理
 */

const RolePage: React.FC = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const columns = [
    {
      title: '序号',
      align: 'center',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '用户姓名',
      align: 'center',
      dataIndex: 'account',
    },
    {
      title: '手机号',
      align: 'center',
      dataIndex: 'password',
    },
    {
      title: '渠道来源',
      align: 'center',
      dataIndex: 'name',
    },
    {
      title: '职责',
      align: 'center',
      dataIndex: 'role',
    },
    {
      title: '部门',
      align: 'center',
      dataIndex: 'createtime',
    },
    {
      title: '分配角色',
      align: 'center',
      dataIndex: 'state',
    },
    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          <span className="operation">编辑</span>
          <span className="operation">删除</span>
        </Space>
      ),
    },
  ]
  const onFinish = (values: any) => {
    console.log('Success:', values)
    // loadData()
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const onChange = () => {
    console.log(1)
  }
  return (
    <div className="page-root">
      <div>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Row gutter={[10, 0]}>
            <Col span={2} className="table-from-label">
              角色名称
            </Col>
            <Col span={4}>
              <InputTemp name="name" />
            </Col>
            <Col span={2} className="table-from-label">
              渠道
            </Col>
            <Col span={4}>
              <SelectTemp name="gender" />
            </Col>
            <Form.Item wrapperCol={{ offset: 1, span: 12 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  取消
                </Button>
                <Button type="primary" htmlType="submit">
                  确定
                </Button>
                <Button type="primary">添加角色</Button>
              </Space>
            </Form.Item>
          </Row>
        </Form>
      </div>
      <Table rowKey="id" columns={columns} dataSource={[...data]} pagination={{ onChange: onChange }} />
    </div>
  )
}

export default RolePage
