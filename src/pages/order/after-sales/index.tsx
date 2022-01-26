import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Radio, Row, Col, Space, Input, Select, Button, Form, DatePicker, Table } from 'antd'
import { SelectState, OrderRoute, OrderType, OrderState } from '@/components/filter/formItem'
import './index.less'
import { AllocatedOrderService } from '@/service/OrderService'
import ChannelService from '@/service/ChannelService'
import { HttpCode } from '@/constants/HttpCode'
import dayjs from 'dayjs'
import ExamineDialog from './components/examine/ExamineDialog'
/**
 * 售后管理
 */
const AfterSalesListPage: React.FC = () => {
  const history = useHistory()
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
  const [selectedData, setSelectedData] = useState(null)
  const [showDialog, setShowDialog] = useState(false)

  const options = [
    { label: '全部', value: '全部', innerWidth: '40px' },
    { label: '退款中(12)', value: '退款中(12)' },
    { label: '退款成功', value: '退款成功' },
    { label: '退款失败', value: '退款失败' },
    { label: '已取消', value: '已取消' },
  ]

  useEffect(() => {
    loadData(pageIndex)
    getChannel()
  }, [pageIndex])

  const loadData = (pageIndex) => {
    form.validateFields().then((query) => {
      const payBeginTime = query.time ? dayjs(query.time[0]).format('YYYY-MM-DD HH:mm:ss') : ''
      const payEndTime = query.time ? dayjs(query.time[1]).format('YYYY-MM-DD HH:mm:ss') : ''
      AllocatedOrderService.afterList({
        current: pageIndex,
        size: pageSize,
        orderBeginTime: payBeginTime,
        orderEndTime: payEndTime,
        refundState: query.refundState,
        auditState: query.auditState,
        keyword: query.keyword,
      }).then((res) => {
        setData(res.data.records)
        setTotal(res.data.total)
      })
    })
  }

  const getChannel = () => {
    // ChannelService.list({ pages: 1, size: 10 }).then((res) => {
    //   if (res.code === HttpCode.success) {
    //     setChannelData(res.data?.records ?? [])
    //     console.log(channelData, 'ccc')
    //   }
    // })
  }

  const columns = [
    {
      title: '订单编号',
      dataIndex: 'orderId',
    },
    {
      title: '下单时间',
      dataIndex: 'applyTime',
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
    },
    {
      title: '退款金额',
      dataIndex: 'amount',
      render: (text: any, record: any) => {
        if (parseInt(record.amount)) {
          return (parseInt(record.amount) / 1000).toFixed(2)
        } else {
          return ''
        }
      },
    },
    {
      title: '退款代币',
      dataIndex: 'tokenAmount',
    },
    {
      title: '订单状态',
      dataIndex: 'orderStateVal',
    },
    {
      title: '申请退款时间',
      dataIndex: 'applyTime',
    },
    {
      title: '渠道审核状态',
      dataIndex: 'auditStateVal',
    },
    {
      title: '售后状态',
      dataIndex: 'refundStateVal',
    },
    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          <span className="operation" onClick={() => _editDialog(record)}>
            审核
          </span>
          {/* <Button
            onClick={() => {
              toDetails(record)
            }}
          >
            查看
          </Button> */}
        </Space>
      ),
    },
  ]

  const _editDialog = (record) => {
    setSelectedData(record)
    setShowDialog(true)
  }

  const toDetails = (record: any) => {
    history.push('/order/after-sales/details', {
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

  const _onDialogClose = () => {
    setSelectedData(null)
    setShowDialog(false)
  }

  const _onDialogSuccess = () => {
    setSelectedData(null)
    setShowDialog(false)
    loadData(pageIndex)
  }

  return (
    <div className="sales__root">
      <div className="sales-header">
        <span className="header-title">售后管理</span>
      </div>
      {/* <div className="sales-tabs">
        <Radio.Group
          options={options}
          onChange={(e) => {
            setTabValue(e.target.value)
          }}
          value={tabValue}
          optionType="button"
          buttonStyle="solid"
        />
      </div> */}
      <div className="order-form">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Row gutter={[5, 0]} style={{ paddingLeft: '40px' }}>
            <Col span={2}>
              <Form.Item name="keyword">
                <Input />
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
            <Col span={4} className="table-from-label">
              订单售后状态
            </Col>
            <Col span={2}>
              <Form.Item name="refundState">
                <Select style={{ width: 120 }}>
                  <Select.Option value={''}>全部</Select.Option>
                  <Select.Option value={2}>退款成功</Select.Option>
                  <Select.Option value={3}>退款失败</Select.Option>
                  <Select.Option value={1}>退款中</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={4} className="table-from-label">
              渠道审核状态
            </Col>
            <Col span={2}>
              <Form.Item name="auditState">
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
                  <Select.Option value={0}>待审核</Select.Option>
                  <Select.Option value={1}>已同意</Select.Option>
                  <Select.Option value={2}>已驳回</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Form.Item wrapperCol={{ offset: 0, span: 4 }}>
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
          showSizeChanger: true,
          showQuickJumper: true,
          pageSize: pageSize,
          total: total,
        }}
      />
      <ExamineDialog data={selectedData} onSuccess={_onDialogSuccess} show={showDialog} onClose={_onDialogClose} />
    </div>
  )
}
export default AfterSalesListPage
