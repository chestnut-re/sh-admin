import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Radio, Row, Col, Space, Input, Select, Button, Form, DatePicker, Table } from 'antd'
import { SelectState, OrderRoute, OrderType, OrderState } from '@/components/filter/formItem'
import './index.less'
import OrderDetailsPage from './components/order-details/OrderDetails'
import { OrderService } from '@/service/OrderService'
import ChannelService from '@/service/ChannelService'
import { HttpCode } from '@/constants/HttpCode'
import dayjs from 'dayjs'
import StateStyle from '@/components/state'
/**
 * 订单列表
 */
const OrderListPage: React.FC = () => {
  const history = useHistory<any>()
  const [form] = Form.useForm()
  const { Option } = Select
  const { RangePicker } = DatePicker
  const [tabValue, setTabValue] = useState('全部')
  const [data, setData] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState()
  const [channelData, setChannelData] = useState([])
  const [formData, setFormData] = useState({})

  const options = [
    { label: '全部', value: '全部', innerWidth: '40px' },
    { label: '待付款(34)', value: '待付款(34)' },
    { label: '待核销(302)', value: '待核销(302)' },
    { label: '已完成', value: '已完成' },
    { label: '已失效', value: '已失效' },
  ]

  useEffect(() => {
    loadData(pageIndex)
    // getChannel()
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
      }).then((res) => {
        setData(res.data?.records ?? [])
        setTotal(res.data.total)
      })
    })
  }

  // const getChannel = () => {
  //   ChannelService.list({ pages: 1, size: 10 }).then((res) => {
  //     if (res.code === HttpCode.success) {
  //       setChannelData(res.data?.records ?? [])
  //     }
  //   })
  // }

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
      render: (text: any, record: any) => {
        return (
          <span
            className="table-con-underline"
            onClick={() => {
              toDetails(record)
            }}
          >
            {record?.goodsName}
          </span>
        )
      },
    },
    {
      title: '单价',
      dataIndex: 'unitPrice',
      render: (text: any, record: any) => {
        if (parseInt(record.unitPrice)) {
          return (parseInt(record.unitPrice) / 1000).toFixed(2)
        } else {
          return ''
        }
      },
    },
    {
      title: '营销活动',
      dataIndex: 'activityTypeVal',
      render: (text: any, record: any) => {
        if (record?.activityTypeVal) {
          return <span className="table-con-underline">{record?.activityTypeVal}</span>
        } else {
          return `- -`
        }
      },
    },
    {
      title: '下单数量',
      dataIndex: 'orderCount',
      render: (text: any, record: any) => {
        return <span className="table-con-underline">{record?.orderCount}</span>
      },
    },
    {
      title: '应付款',
      dataIndex: 'originPrice',
      render: (text: any, record: any) => {
        return (parseInt(record.originPrice) / 1000).toFixed(2)
      },
    },
    {
      title: '实付款',
      dataIndex: 'payAmount',
      render: (text: any, record: any) => {
        return (parseInt(record.payAmount) / 1000).toFixed(2)
      },
    },
    {
      title: '付款方式',
      dataIndex: 'payTypeVal',
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
      dataIndex: 'sourceVal',
    },
    {
      title: '订单类型',
      dataIndex: 'orderTypeVal',
    },
    {
      title: '订单状态',
      dataIndex: 'stateVal',
      render: (text, record) => {
        if (record?.stateVal == '待付款') {
          return (
            <>
              <StateStyle color="yellow" />
              {record?.stateVal}
            </>
          )
        } else if (record?.stateVal == '待核销') {
          return (
            <>
              <StateStyle color="orange" />
              {record?.stateVal}
            </>
          )
        } else if (record?.stateVal == '已完成') {
          return (
            <>
              <StateStyle color="green" />
              {record?.stateVal}
            </>
          )
        } else if (record?.stateVal == '已失效') {
          return (
            <>
              <StateStyle color="red" />
              {record?.stateVal}
            </>
          )
        }
      },
    },
    {
      title: '操作',
      fixed: 'right',
      render: (text: any, record: any) => (
        <Space size="middle">
          <span
            className="operation"
            onClick={() => {
              toDetails(record)
            }}
          >
            详情
          </span>
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

  const _toDetails = () => {
    history.push('/order/allocated-list', {})
  }

  return (
    <div className="order__root">
      <div className="order-header">
        {/* <span className="header-title">订单列表</span> */}
        {/* <span className="header-btn">
          <span>46</span>
          &nbsp;笔待分配订单&nbsp;&nbsp;
          <span onClick={_toDetails}>去分配</span>
        </span> */}
      </div>
      <div className="order-tabs">
        {/* <Radio.Group
          options={options}
          onChange={(e) => {
            setTabValue(e.target.value)
          }}
          value={tabValue}
          optionType="button"
          buttonStyle="solid"
        /> */}
      </div>
      <div className="order-form">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Row gutter={[0, 0]}>
            <Col span={2}>
              <Form.Item name="orderNoLike">
                <Input placeholder="商品名称/订单编号" />
              </Form.Item>
            </Col>
            <Col span={2} className="table-from-label">
              下单时间
            </Col>
            <Col span={2}>
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
            <Col span={4} className="table-from-label">
              订单状态
            </Col>
            <Col span={2}>
              <OrderState name="state" />
            </Col>
            <Form.Item wrapperCol={{ offset: 4, span: 2 }}>
              <Space>
                <Button htmlType="submit">查询</Button>
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
          showQuickJumper: true,
          pageSize: pageSize,
          total: total,
        }}
      />
    </div>
  )
}
export default OrderListPage
