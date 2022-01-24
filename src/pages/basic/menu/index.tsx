import React, { useState } from 'react'
import { Form, Button, Table, Col, Row, Space } from 'antd'
import { SelectTemp } from '@/components/filter/formItem'

/**
 * 系统中心-权限管理-菜单管理
 */

const MenuPage: React.FC = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const columns = [
    {
      title: '序号',
      align: 'center',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '菜单名称',
      align: 'center',
      dataIndex: 'account',
    },
    {
      title: '所属角色',
      align: 'center',
      dataIndex: 'password',
    },
    {
      title: '创建时间',
      align: 'center',
      dataIndex: 'name',
    },
    {
      title: '更新时间',
      align: 'center',
      dataIndex: 'role',
    },
    {
      title: '状态',
      align: 'center',
      dataIndex: 'createtime',
    },
    {
      title: '是否公共',
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
              菜单显示
            </Col>
            <Col span={4}>
              <SelectTemp name="gender" />
            </Col>
            <Col span={2} className="table-from-label">
              状态
            </Col>
            <Col span={4}>
              <SelectTemp name="gender" />
            </Col>
            <Form.Item wrapperCol={{ offset: 1, span: 12 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  搜索
                </Button>
                <Button type="primary">添加菜单</Button>
              </Space>
            </Form.Item>
          </Row>
        </Form>
      </div>
      <Table rowKey="id" columns={columns} dataSource={[...data]} pagination={{ onChange: onChange }} />
    </div>
  )
}

export default MenuPage
