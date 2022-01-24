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
  const [detail, setDetail] = useState<any>('0')
  const [columns, setColumns] = useState<any>([])
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

  const columnsX = [
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
  const columnsT = [
    {
      title: '订单编号',
      dataIndex: 'nickName',
    },
    {
      title: '退款账号',
      dataIndex: 'mobile',
    },
    {
      title: '支出现金(¥)',
      dataIndex: 'roleName',
    },
    {
      title: '支出乐豆',
      dataIndex: 'state',
    },
    {
      title: '支出时间',
      dataIndex: 'state',
    },
  ]
  const columnsY = [
    {
      title: '订单编号',
      dataIndex: 'nickName',
    },
    {
      title: '渠道名称',
      dataIndex: 'mobile',
    },
    {
      title: '收支金额(¥)',
      dataIndex: 'roleName',
    },
    {
      title: '支出时间',
      dataIndex: 'state',
    },
  ]
  const columnsFY = [
    {
      title: '订单编号',
      dataIndex: 'nickName',
    },
    {
      title: '订单类型',
      dataIndex: 'mobile',
    },
    {
      title: '收支金额(¥)',
      dataIndex: 'roleName',
    },
    {
      title: '收支时间',
      dataIndex: 'state',
    },
  ]
  const columnsD = [
    {
      title: '账户平台',
      dataIndex: 'nickName',
    },
    {
      title: '待释放类型',
      dataIndex: 'mobile',
    },
    {
      title: '订单编号',
      dataIndex: 'nickName',
    },
    {
      title: '账户',
      dataIndex: 'mobile',
    },
    {
      title: '待释放金额(¥)',
      dataIndex: 'roleName',
    },
    {
      title: '待释放金额下发时间',
      dataIndex: 'state',
    },
  ]
  const columnsFL = [
    {
      title: '订单编号',
      dataIndex: 'nickName',
    },
    {
      title: '账户',
      dataIndex: 'mobile',
    },
    {
      title: '返利乐豆(¥)',
      dataIndex: 'roleName',
    },
    {
      title: '乐豆下发时间',
      dataIndex: 'state',
    },
  ]

  useEffect(() => {
    if (detail == '0') {
      setColumns(columnsX)
    } else if (detail == '1') {
      setColumns(columnsT)
    } else if (detail == '2') {
      setColumns(columnsY)
    } else if (detail == '3') {
      setColumns(columnsFY)
    } else if (detail == '4') {
      setColumns(columnsD)
    } else if (detail == '5') {
      setColumns(columnsFL)
    }
  }, [detail])
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
                <Select style={{ width: 120 }} onChange={(value) => setDetail(value)}>
                  <Option value={0}>销售明细</Option>
                  <Option value={1}>退款明细</Option>
                  <Option value={2}>运营资金明细</Option>
                  <Option value={3}>分佣明细</Option>
                  <Option value={4}>待释放明细</Option>
                  <Option value={5}>返利明细</Option>
                </Select>
              </Form.Item>
            </Col>
            <Form.Item wrapperCol={{ offset: 1, span: 12 }}>
              <Space>
                <Button htmlType="submit">查询</Button>
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
