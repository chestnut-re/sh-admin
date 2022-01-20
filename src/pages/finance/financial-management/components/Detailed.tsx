import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Select, Space, Table, DatePicker, Radio } from 'antd'
import './index.less'
import { HttpCode } from '@/constants/HttpCode'

/**财务管理-财务明细 */
const DetailedPage: React.FC = () => {
  const [form] = Form.useForm()
  const { RangePicker } = DatePicker
  const { Option } = Select
  const [data, setData] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState()

  useEffect(() => {
    loadData(pageIndex)
  }, [pageIndex])

  const loadData = (pageIndex) => {
    // AdminService.list({ current: pageIndex, pageSize: pageSize }).then((res) => {
    //   console.log(res)
    //   setData(res.data.records)
    //   setTotal(res.data.total)
    // })
  }

  const columns = [
    {
      title: '订单编号',
      dataIndex: 'nickName',
    },
    {
      title: '入账现金(¥)',
      dataIndex: 'mobile',
    },
    {
      title: '入账乐豆',
      dataIndex: 'roleName',
    },
    {
      title: '入账时间',
      dataIndex: 'state',
    },
  ]

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className="list__root">
      <div className="list-form">
        <Form name="basic" initialValues={{ l: 0 }} onFinish={onFinish} onFinishFailed={onFinishFailed} form={form}>
          <Row gutter={[5, 0]}>
            <Col span={6}>
              <Form.Item name="channelId">
                <Radio.Group
                // value={checkState}
                // onChange={(value) => {
                //   setCheckState(value.target.value)
                //   loadData(pageIndex)
                // }}
                >
                  <Radio.Button value="0">今天</Radio.Button>
                  <Radio.Button value="1">近7天</Radio.Button>
                  <Radio.Button value="2">近30天</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={2} className="table-from-label">
              选择时间
            </Col>
            <Col span={4}>
              <Form.Item name="time">
                <RangePicker showTime />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="l">
                <Select style={{ width: 120 }}>
                  <Option value={0}>销售明细</Option>
                  <Option value={1}>退款明细</Option>
                  <Option value={2}>运营资金明细</Option>
                  <Option value={3}>分佣明细</Option>
                  <Option value={4}>待释放明细</Option>
                </Select>
              </Form.Item>
            </Col>
            <Form.Item wrapperCol={{ offset: 1, span: 12 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button htmlType="button">重置</Button>
                <Button htmlType="button">导出</Button>
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
export default DetailedPage
