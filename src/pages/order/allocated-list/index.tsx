import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Radio, Row, Col, Space, Input, Select, Button, Form, DatePicker, Table } from 'antd'
import { SelectState, OrderRoute, OrderType, OrderState } from '@/components/filter/formItem'
import './index.less'
import { OrderService } from '@/service/OrderService'
import ChannelService from '@/service/ChannelService'
import { HttpCode } from '@/constants/HttpCode'
import dayjs from 'dayjs'
/**
 * 订单列表
 */
const AllocatedListPage: React.FC = () => {
  const history = useHistory()
  const [form] = Form.useForm()
  const { Option } = Select
  const { RangePicker } = DatePicker
  const [data, setData] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState()
  const [channelData, setChannelData] = useState([])

  useEffect(() => {
    // loadData(pageIndex)
    getChannel()
  }, [pageIndex])

  const loadData = (pageIndex) => {
    form.validateFields().then((query) => {
      const payBeginTime = query.time ? dayjs(query.time[0]).format('YYYY-MM-DD HH:mm:ss') : ''
      const payEndTime = query.time ? dayjs(query.time[1]).format('YYYY-MM-DD HH:mm:ss') : ''
      OrderService.list({
        current: pageIndex,
        size: pageSize,
        payBeginTime,
        payEndTime,
        channelId: query.channelId,
        orderType: query.orderType,
        source: query.source,
        state: query.state,
      }).then((res) => {
        setData(res.data.records)
        setTotal(res.data.total)
      })
    })
  }

  const getChannel = () => {
    ChannelService.list({ pages: 1, size: 10 }).then((res) => {
      if (res.code === HttpCode.success) {
        setChannelData(res.data?.records ?? [])
        console.log(channelData, 'ccc')
      }
    })
  }

  const columns = [
    {
      title: '订单编号',
      dataIndex: 'orderNo',
    },
    {
      title: '下单时间',
      dataIndex: 'orderTime',
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
    },
    {
      title: '单价',
      dataIndex: 'unitPrice',
    },
    {
      title: '营销活动',
      dataIndex: 'state', //无
    },
    {
      title: '下单数量',
      dataIndex: 'orderCount', //无
    },
    {
      title: '应付款',
      dataIndex: 'createTime', //无
    },
    {
      title: '实付款',
      dataIndex: 'payAmount',
    },
    {
      title: '付款方式',
      dataIndex: 'createTime',
    },
    {
      title: '付款时间',
      dataIndex: 'payTime',
    },
    {
      title: '买家手机号',
      dataIndex: 'orderUserPhone',
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
      dataIndex: 'state',
    },
    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button
            onClick={() => {
              toDetails(record)
            }}
          >
            详情
          </Button>
          <Button>分配</Button>
        </Space>
      ),
    },
  ]

  const toDetails = (record: any) => {
    history.push('/order/order-list/order-details', {
      id: record.id,
    })
  }

  const onFinish = (values: any) => {
    loadData(pageIndex)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  /**重置 */
  const resetTable = () => {
    form.resetFields()
    setPageIndex(1)
    loadData(1)
  }

  return (
    <div className="allocated__root">
      <div className="allocated-header">
        <span className="header-title">待分配列表</span>
      </div>
      <div className="allocated-form">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Row gutter={[5, 0]} style={{ paddingLeft: '40px' }}>
            {/* <Col span={6}>
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
            </Col> */}
            <Col span={2} className="table-from-label">
              渠道名称
            </Col>
            <Col span={4}>
              <Form.Item name="channelId">
                <Select value={channelData} style={{ width: 120 }}>
                  {channelData?.map((item: any) => {
                    return (
                      <Option value={item.id} key={item.id}>
                        {item.name}
                      </Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={2} className="table-from-label">
              下单时间
            </Col>
            <Col span={4}>
              <Form.Item name="time">
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
              <OrderRoute name="source" />
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
                <Button htmlType="button" onClick={resetTable}>
                  重置
                </Button>
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
export default AllocatedListPage
