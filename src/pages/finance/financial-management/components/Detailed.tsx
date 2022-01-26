import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Select, Space, Table, DatePicker, Radio } from 'antd'
import './index.less'
import { FinancialManagementService } from '@/service/FinanceAccountService'
import dayjs from 'dayjs'
import { getCookie } from '@/utils/cookies'
import { UploadOutlined } from '@ant-design/icons'

/**财务管理-财务明细 */
const DetailedPage: React.FC = () => {
  const [form] = Form.useForm()
  const { RangePicker } = DatePicker
  const { Option } = Select
  const [data, setData] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState()
  const [detail, setDetail] = useState<any>('1')
  const [columns, setColumns] = useState<any>([])
  const [checkTime, setCheckTime] = useState('0')
  useEffect(() => {
    loadData(pageIndex)
  }, [pageIndex])

  const loadData = (pageIndex) => {
    form.validateFields().then((query) => {
      const payBeginTime = query.time ? dayjs(query.time[0]).format('YYYY-MM-DD HH:mm:ss') : ''
      const payEndTime = query.time ? dayjs(query.time[1]).format('YYYY-MM-DD HH:mm:ss') : ''
      let params = {}
      if (payEndTime !== '' && payBeginTime !== '') {
        params = {
          startDate: payBeginTime,
          endDate: payEndTime,
        }
      } else {
        params = {
          days: checkTime,
        }
      }
      FinancialManagementService.list({
        current: pageIndex,
        pageSize: pageSize,
        detailType: detail,
        ...params,
      }).then((res) => {
        setData(res.data?.records ?? [])
        setTotal(res.data.total)
      })
    })
  }

  const columnsX = [
    {
      title: '订单编号',
      dataIndex: 'orderNo',
    },
    {
      title: '入账现金(¥)',
      dataIndex: 'payAmount',
    },
    {
      title: '入账乐豆',
      dataIndex: 'tokenAmount',
    },
    {
      title: '入账时间',
      dataIndex: 'time',
    },
  ]
  const columnsT = [
    {
      title: '订单编号',
      dataIndex: 'subOrderNo',
    },
    {
      title: '退款账号',
      dataIndex: 'account',
    },
    {
      title: '支出现金(¥)',
      dataIndex: 'payAmount',
    },
    {
      title: '支出乐豆',
      dataIndex: 'tokenAmount',
    },
    {
      title: '支出时间',
      dataIndex: 'refundTime',
    },
  ]
  const columnsY = [
    {
      title: '订单编号',
      dataIndex: 'subOrderNo',
    },
    {
      title: '渠道名称',
      dataIndex: 'channelNm',
    },
    {
      title: '收支金额(¥)',
      dataIndex: 'amount',
    },
    {
      title: '支出时间',
      dataIndex: 'time',
    },
  ]
  const columnsFY = [
    {
      title: '订单编号',
      dataIndex: 'subOrderNo',
    },
    {
      title: '订单类型',
      dataIndex: 'typeNm',
    },
    {
      title: '收支金额(¥)',
      dataIndex: 'amount',
    },
    {
      title: '收支时间',
      dataIndex: 'time',
    },
  ]
  const columnsD = [
    {
      title: '账户平台',
      dataIndex: 'userType',
    },
    {
      title: '待释放类型',
      dataIndex: 'typeNm',
    },
    {
      title: '订单编号',
      dataIndex: 'subOrderNo',
    },
    {
      title: '账户',
      dataIndex: 'account',
    },
    {
      title: '待释放金额(¥)',
      dataIndex: 'amount',
    },
    {
      title: '待释放金额下发时间',
      dataIndex: 'time',
    },
  ]
  const columnsFL = [
    {
      title: '订单编号',
      dataIndex: 'subOrderNo',
    },
    {
      title: '账户',
      dataIndex: 'account',
    },
    {
      title: '返利乐豆(¥)',
      dataIndex: 'amount',
    },
    {
      title: '乐豆下发时间',
      dataIndex: 'time',
    },
  ]

  useEffect(() => {
    if (detail == '1') {
      setColumns(columnsX)
    } else if (detail == '2') {
      setColumns(columnsT)
    } else if (detail == '3') {
      setColumns(columnsY)
    } else if (detail == '4') {
      setColumns(columnsFY)
    } else if (detail == '5') {
      setColumns(columnsD)
    } else if (detail == '6') {
      setColumns(columnsFL)
    }
  }, [data])

  useEffect(() => {
    loadData(pageIndex)
  }, [checkTime])

  // useEffect(() => {
  //   setCheckTime('0')
  // }, [form.resetFields()])

  const _export = () => {
    form.validateFields().then((query) => {
      const beginTime = query.time ? dayjs(query.time[0]).format('YYYY-MM-DD HH:mm:ss') : ''
      const endTime = query.time ? dayjs(query.time[1]).format('YYYY-MM-DD HH:mm:ss') : ''
      let url = ''
      if (beginTime !== '' && endTime !== '') {
        url =
          '/api/wallet/a/fianceDetailExport?' +
          getCookie('auth') +
          '&detailType=' +
          detail +
          '&startDate=' +
          beginTime +
          '&endDate=' +
          endTime
      } else {
        url = '/api/wallet/a/fianceDetailExport?' + getCookie('auth') + '&detailType=' + detail + '&days=' + checkTime
      }
      window.open(url)
    })
  }

  const onFinish = (values: any) => {
    console.log('Success:', values)
    loadData(pageIndex)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const _reset = () => {
    form.resetFields()
    setCheckTime('')
    loadData(pageIndex)
  }

  return (
    <div className="list__root">
      <div className="list-form">
        <Form
          name="basic"
          initialValues={{ detailType: '销售明细' }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Row gutter={[5, 0]}>
            <Col span={6}>
              <Form.Item name="days">
                <Radio.Group
                  onChange={(value) => {
                    setCheckTime(value.target.value)
                  }}
                >
                  <Radio.Button value="0">今天</Radio.Button>
                  <Radio.Button value="7">近7天</Radio.Button>
                  <Radio.Button value="30">近30天</Radio.Button>
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
              <Form.Item name="detailType">
                <Select style={{ width: 120 }} onChange={(value) => setDetail(value)}>
                  <Option value={1}>销售明细</Option>
                  <Option value={2}>退款明细</Option>
                  <Option value={3}>运营资金明细</Option>
                  <Option value={4}>分佣明细</Option>
                  <Option value={5}>待释放明细</Option>
                  <Option value={6}>返利明细</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item>
                <Space>
                  <Button htmlType="submit">查询</Button>
                  <Button htmlType="button" onClick={_reset}>
                    重置
                  </Button>
                </Space>
              </Form.Item>
            </Col>
            <Col span={4} style={{ textAlign: 'right' }}>
              <Form.Item>
                <Space>
                  <Button type="primary" icon={<UploadOutlined />} htmlType="button" onClick={_export}>
                    导出
                  </Button>
                </Space>
              </Form.Item>
            </Col>
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
