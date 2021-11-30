import { Space, Table, Tag, Form, Row, Col, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { InputTemp, SelectTemp } from '@/components/filter/formItem'

/**
 * 运营中心-商品管理-商品审核
 */

const CommodityAuditPage: React.FC = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const columns = [
    {
      title: '编号',
      align: 'center',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '商品名称',
      align: 'center',
      dataIndex: 'account',
    },
    {
      title: '现售价',
      align: 'center',
      dataIndex: 'password',
    },
    {
      title: '创建时间',
      align: 'center',
      dataIndex: 'name',
    },
    {
      title: '创建人',
      align: 'center',
      dataIndex: 'role',
    },
    {
      title: '最近编辑时间',
      align: 'center',
      dataIndex: 'createtime',
    },
    {
      title: '最近编辑人',
      align: 'center',
      dataIndex: 'state',
    },
    {
      title: '状态',
      align: 'center',
      dataIndex: 'state',
    },
    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button>审核</Button>
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
              商品名称
            </Col>
            <Col span={4}>
              <InputTemp name="name" />
            </Col>
            <Col span={2} className="table-from-label">
              状态
            </Col>
            <Col span={4}>
              <SelectTemp name="name" />
            </Col>
            <Form.Item wrapperCol={{ offset: 2, span: 0 }}>
              <Space>
                <Button type="primary">查询</Button>
                <Button>重置</Button>
              </Space>
            </Form.Item>
          </Row>
        </Form>
      </div>
      <Table rowKey="id" columns={columns} dataSource={[...data]} pagination={{ onChange: onChange }} />
    </div>
  )
}

export default CommodityAuditPage
