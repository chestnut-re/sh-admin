import { Space, Table, Tag, Form, Row, Col, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { InputTemp, SelectTemp } from '@/components/filter/formItem'

/**
 * 系统中心-版本管理-B端版本管理
 */

const VersionBPage: React.FC = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const columns = [
    {
      title: '序号',
      align: 'center',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '版本号',
      align: 'center',
      dataIndex: 'account',
    },
    {
      title: '版本状态',
      align: 'center',
      dataIndex: 'password',
    },
    {
      title: '发布者',
      align: 'center',
      dataIndex: 'name',
    },
    {
      title: '更新内容',
      align: 'center',
      dataIndex: 'role',
    },
    {
      title: '下载链接',
      align: 'center',
      dataIndex: 'createtime',
    },
    {
      title: '版本迭代时间',
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
              版本号
            </Col>
            <Col span={4}>
              <InputTemp name="name" />
            </Col>
            <Col span={2} className="table-from-label">
              版本名称
            </Col>
            <Col span={4}>
              <InputTemp name="name" />
            </Col>
            <Col span={2} className="table-from-label">
              发布时间
            </Col>
            <Col span={4}>
              <InputTemp name="name" />
            </Col>
            <Form.Item wrapperCol={{ offset: 2, span: 0 }}>
              <Space>
                <Button type="primary">新建版本</Button>
              </Space>
            </Form.Item>
          </Row>
        </Form>
      </div>
      <Table rowKey="id" columns={columns} dataSource={[...data]} pagination={{ onChange: onChange }} />
    </div>
  )
}

export default VersionBPage
