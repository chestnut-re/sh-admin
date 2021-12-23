/*
 * @Description: 渠道分佣方案
 * @LastEditTime: 2021-12-23 18:50:08
 */
import { Space, Table, Tag, Form, Row, Col, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { InputTemp, SelectTemp } from '@/components/filter/formItem'
const CommissionSchemePage: React.FC = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const columns = [
    {
      title: '编号',
      align: 'center',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '方案名称',
      align: 'center',
      dataIndex: 'account',
    },
    {
      title: '方案类型',
      align: 'center',
      dataIndex: 'password',
    },
    {
      title: '分佣比例',
      align: 'center',
      dataIndex: 'name',
    },
    {
      title: '创建方',
      align: 'center',
      dataIndex: 'role',
    },
    {
      title: '创建时间',
      align: 'center',
      dataIndex: 'createtime',
    },
    {
      title: '状态',
      align: 'center',
      dataIndex: 'state',
    },
    {
      title: '累计使用渠道数',
      align: 'center',
      dataIndex: 'state',
    },
    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button>编辑</Button>
          <Button danger>删除</Button>
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
    <div className="commission-scheme__root">
      <div>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Row justify="end">
            <Form.Item wrapperCol={{ span: 0 }}>
              <Space>
                <Button type="primary">创建商品分佣方案</Button>
                <Button type="primary">创建KPI分佣方案</Button>
              </Space>
            </Form.Item>
          </Row>
          <Row gutter={[10, 0]}>
            <Col span={2} className="table-from-label">
              方案名称
            </Col>
            <Col span={4}>
              <InputTemp name="name" />
            </Col>
            <Col span={2} className="table-from-label">
              方案类型
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
            <Form.Item wrapperCol={{ offset: 2, span: 0 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button type="primary" htmlType="submit">
                  重置
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

export default CommissionSchemePage
