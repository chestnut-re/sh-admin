import React, { useEffect, useState } from 'react'
import { InputTemp, SelectTemp, RangePickerTemp } from '@/components/filter/formItem'
import { Form, Table, Col, Row, Space, Button } from 'antd'

/**
 * 系统中心-意见反馈
 */

const OpinionPage: React.FC = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const columns = [
    {
      title: '序号',
      align: 'center',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '用户角色',
      align: 'center',
      dataIndex: 'account',
    },
    {
      title: '联系电话',
      align: 'center',
      dataIndex: 'password',
    },
    {
      title: '反馈图片',
      align: 'center',
      dataIndex: 'name',
    },
    {
      title: '反馈详情',
      align: 'center',
      dataIndex: 'role',
    },
    {
      title: '反馈状态',
      align: 'center',
      dataIndex: 'createtime',
    },
    {
      title: '反馈时间',
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
              反馈者
            </Col>
            <Col span={4}>
              <InputTemp name="name" />
            </Col>
            <Col span={2} className="table-from-label">
              反馈类型
            </Col>
            <Col span={4}>
              <SelectTemp name="gender" />
            </Col>
            <Col span={2} className="table-from-label">
              反馈时间
            </Col>
            <Col span={4}>
              <RangePickerTemp name="gender" />
            </Col>
            <Form.Item wrapperCol={{ offset: 2, span: 0 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  搜索
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

export default OpinionPage
