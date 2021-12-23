import React, { useState, useEffect } from 'react'
import { Radio, Row, Col, Space, Input, Select, Button, Form, DatePicker, Table } from 'antd'
import { SelectState, OrderRoute, OrderType, OrderState } from '@/components/filter/formItem'
import './index.less'
/**
 * 订单列表
 */
const OrderListPage: React.FC = () => {
  const [form] = Form.useForm()
  const { Option } = Select
  const { RangePicker } = DatePicker
  const [tabValue, setTabValue] = useState('全部')
  const [selData, setSelData] = useState('渠道名称')
  const [data, setData] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState()

  const options = [
    { label: '全部', value: '全部', innerWidth: '40px' },
    { label: '待付款(34)', value: '待付款(34)' },
    { label: '待确认(302)', value: '待确认(302)' },
    { label: '已完成', value: '已完成' },
    { label: '已失效', value: '已失效' },
  ]

  useEffect(() => {
    loadData(pageIndex)
  }, [pageIndex])

  const loadData = (pageIndex) => {
    // AdminService.list({ current: pageIndex, pageSize: pageSize, }).then((res) => {
    //   setData(res.data.records)
    //   setTotal(res.data.total)
    // })
  }

  const columns = [
    {
      title: '订单编号',
      dataIndex: 'systemUserId',
    },
    {
      title: '下单时间',
      dataIndex: 'nickName',
    },
    {
      title: '商品名称',
      dataIndex: 'mobile',
    },
    {
      title: '单价',
      dataIndex: 'roleName',
    },
    {
      title: '营销活动',
      dataIndex: 'state',
    },
    {
      title: '下单数量',
      dataIndex: 'createTime',
    },
    {
      title: '应付款',
      dataIndex: 'createTime',
    },
    {
      title: '实付款',
      dataIndex: 'createTime',
    },
    {
      title: '付款方式',
      dataIndex: 'createTime',
    },
    {
      title: '付款时间',
      dataIndex: 'createTime',
    },
    {
      title: '买家手机号',
      dataIndex: 'createTime',
    },
    {
      title: '下单途径',
      dataIndex: 'createTime',
    },
    {
      title: '订单类型',
      dataIndex: 'createTime',
    },
    {
      title: '订单/售后状态',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button>详情</Button>
        </Space>
      ),
    },
  ]

  const selectData = [
    {
      key: '1',
      value: '渠道名称',
    },
    {
      key: '2',
      value: '订单编号',
    },
    {
      key: '3',
      value: '商品名称',
    },
    {
      key: '4',
      value: '买家手机号',
    },
    {
      key: '5',
      value: '始发地',
    },
  ]

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="order__root">
      <div className="order-header">
        <span className="header-title">订单列表</span>
        <span className="header-btn">
          <span>46</span>
          &nbsp;笔待分配订单&nbsp;&nbsp;
          <span>去分配</span>
        </span>
      </div>
      <div className="order-tabs">
        <Radio.Group
          options={options}
          onChange={(e) => {
            setTabValue(e.target.value)
          }}
          value={tabValue}
          optionType="button"
          buttonStyle="solid"
        />
      </div>
      <div className="order-form">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Row gutter={[5, 0]} style={{ paddingLeft: '40px' }}>
            <Col span={6}>
              <Select value={selData} style={{ width: 120 }} onChange={(value) => setSelData(value)}>
                {selectData?.map((item) => {
                  return (
                    <Option value={item.value} key={item.key}>
                      {item.value}
                    </Option>
                  )
                })}
              </Select>
              {selData === '渠道名称' ? (
                <Select value={selData} style={{ width: 120 }} onChange={(value) => setSelData(value)}>
                  {selectData?.map((item) => {
                    return (
                      <Option value={item.value} key={item.key}>
                        {item.value}
                      </Option>
                    )
                  })}
                </Select>
              ) : (
                <Input style={{ width: 120 }} />
              )}
            </Col>
            <Col span={2} className="table-from-label">
              下单时间
            </Col>
            <Col span={4}>
              <Form.Item>
                <RangePicker showTime />
              </Form.Item>
            </Col>
            <Col span={2} className="table-from-label">
              订单类型
            </Col>
            <Col span={2}>
              <OrderType name="orderType" />
            </Col>
            <Col span={2} className="table-from-label">
              下单途径
            </Col>
            <Col span={2}>
              <OrderRoute name="orderRoute" />
            </Col>
          </Row>
          <Row gutter={[5, 0]} style={{ marginLeft: '-52px' }} justify="start">
            <Col span={4} className="table-from-label">
              订单/售后状态
            </Col>
            <Col span={2}>
              <OrderState name="state" />
            </Col>
            <Form.Item wrapperCol={{ offset: 4, span: 0 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button htmlType="button">重置</Button>
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
          showSizeChanger: true,
          showQuickJumper: true,
          pageSize: pageSize,
          total: total,
        }}
      />
    </div>
  )
}
export default OrderListPage
