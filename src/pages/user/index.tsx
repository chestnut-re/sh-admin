/* eslint-disable react/display-name */
import { Space, Table, Tag, Form, Row, Col, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { InputTemp, SelectTemp, } from '@/components/filter/formItem'

const TablePage: React.FC = () => {
  const [form] = Form.useForm()
  // const [data, setData] = useState([])
  const columns=[
    {
      title: '序号',
      align:'center',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '账号',
      align:'center',
      dataIndex: 'account',
    },
    {
      title: '密码',
      align:'center',
      dataIndex: 'password',
    },
    {
      title: '用户名称',
      align:'center',
      dataIndex: 'name',
    },
    {
      title: '所属角色',
      align:'center',
      dataIndex: 'role',
    },
    {
      title: '创建时间',
      align:'center',
      dataIndex: 'createtime',
    },
    {
      title: '状态',
      align:'center',
      dataIndex: 'state',
    },
    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button>编辑</Button>
          <Button danger>
            删除
          </Button>
        </Space>
      ),
    },
  ]

  const data= [
      {
        id: '1',
        account: 'id1',
        password: '123',
      },
      {
        id: '2',
        account: 'id2',
        password: '123',
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
              用户名
            </Col>
            <Col span={4}>
              <InputTemp name="username" />
            </Col>
            <Col span={2} className="table-from-label">
              状态
            </Col>
            <Col span={4}>
              <SelectTemp name="gender" />
            </Col>
            <Form.Item wrapperCol={{ offset: 2, span: 0 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
              <Button type="primary">
                新增用户
              </Button>
            </Space>
          </Form.Item>
          </Row>

        </Form>
      </div>
      <Table rowKey="id" columns={columns} dataSource={[...data]} pagination={{ onChange: onChange }} />
    </div>
  )
}

export default TablePage
