import { Space, Table, Tag, Form, Row, Col, Button, DatePicker, Input, Image } from 'antd'
import React, { useEffect, useState } from 'react'
import { OpinionService } from '@/service/OpinionService'
import ImageColumn from '@/components/tableColumn/ImageColumn'
/**
 * 基础信息管理-意见反馈
 */

const OpinionCPage: React.FC = () => {
  const [form] = Form.useForm()
  const { RangePicker } = DatePicker
  const [data, setData] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState()

  useEffect(() => {
    loadData(pageIndex)
  }, [pageIndex])

  const loadData = (pageIndex) => {
    OpinionService.list({ current: pageIndex, size: pageSize }).then((res) => {
      console.log(res)
      setData(res.data.records)
      setTotal(res.data.total)
    })
  }

  const columns = [
    {
      title: '序号',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '账号',
      dataIndex: 'phoneNumber',
    },
    {
      title: '昵称',
      dataIndex: 'userNickName',
    },
    {
      title: '反馈图片',
      dataIndex: 'feedbackImgUrl',
      render: (text: any, record: any) => {
        const imgs = record.feedbackImgUrl?.split(',')
        return (
          <Image.PreviewGroup>
            {imgs.map((item: any, index: any) => {
              return <Image src={item} key={index} style={{ width: 40, height: 40, marginRight: 4 }} />
            })}
          </Image.PreviewGroup>
        )
      },
    },
    {
      title: '文字描述',
      dataIndex: 'feedbackDescription',
    },
    {
      title: '反馈时间',
      dataIndex: 'feedbackTime',
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

export default OpinionCPage
