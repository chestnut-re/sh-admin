import { Space, Table, Tag, Form, Row, Col, Button, DatePicker, Input } from 'antd'
import React, { useEffect, useState } from 'react'
/**
 * 系统中心-版本管理-B端版本管理
 */

const OpinionBPage: React.FC = () => {
  const [form] = Form.useForm()
  const { RangePicker } = DatePicker
  const [data, setData] = useState([])
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState()

  useEffect(() => {
    loadData(pageIndex)
  }, [pageIndex])

  const loadData = (pageIndex) => {
    // BannerService.list({ current: pageIndex, size: pageSize }).then((res) => {
    //   console.log(res)
    //   setData(res.data.records)
    //   setTotal(res.data.total)
    // })
  }

  const columns = [
    {
      title: '序号',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '账号',
      dataIndex: 'account',
    },
    {
      title: '昵称',
      dataIndex: 'password',
    },
    {
      title: '反馈图片',
      dataIndex: 'name',
    },
    {
      title: '文字描述',
      dataIndex: 'role',
    },
    {
      title: '反馈时间',
      dataIndex: 'createtime',
    },
  ]

  const onFinish = (values: any) => {}

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
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
              账号
            </Col>
            <Col span={4}>
              <Form.Item name="time">
                <Input />
              </Form.Item>
            </Col>
            <Col span={2} className="table-from-label">
              时间
            </Col>
            <Col span={4}>
              <Form.Item name="time">
                <RangePicker showTime />
              </Form.Item>
            </Col>
            <Form.Item wrapperCol={{ offset: 2, span: 0 }}>
              <Space>
                <Button type="primary">查询</Button>
              </Space>
            </Form.Item>
          </Row>
        </Form>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        scroll={{ x: 'max-content' }}
        dataSource={[...data]}
        pagination={{
          onChange: setPageIndex,
          showQuickJumper: true,
          pageSize: pageSize,
          total: total,
        }}
      />
    </div>
  )
}

export default OpinionBPage
