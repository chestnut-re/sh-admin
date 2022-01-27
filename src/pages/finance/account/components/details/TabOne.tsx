import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Table, DatePicker, Select, Button, Space } from 'antd'
import { FinanceAccountService } from '@/service/FinanceAccountService'
import dayjs from 'dayjs'
import { HttpCode } from '@/constants/HttpCode'
interface Props {
  data: any
}
const TabOnePage: React.FC<Props> = ({ data }) => {
  const [form] = Form.useForm()
  const { RangePicker } = DatePicker
  const { Option } = Select
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState()
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    if (data) {
      loadTableData(pageIndex)
    }
  }, [data, pageIndex])

  const loadTableData = (pageIndex) => {
    form
      .validateFields()
      .then((formData) => {
        const startDate = formData.time ? dayjs(formData.time[0]).format('YYYY-MM-DD HH:mm:ss') : ''
        const endDate = formData.time ? dayjs(formData.time[1]).format('YYYY-MM-DD HH:mm:ss') : ''
        FinanceAccountService.detailsList({
          current: pageIndex,
          pageSize: pageSize,
          startDate,
          endDate,
          phone: data?.phone,
          type: 1,
          balanceType: formData.balanceType,
        }).then((res) => {
          if (res.code === HttpCode.success) {
            setTableData(res.data?.records ?? [])
            setTotal(res.data.total)
          }
        })
      })
      .catch((e) => {
        console.error(e)
      })
  }

  const columns = [
    {
      title: '序号',
      className: 'table-light-color',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '订单编号',
      dataIndex: 'orderNo',
      className: 'table-light-color',
    },
    {
      title: '分佣类型',
      dataIndex: 'typeName',
      className: 'table-light-color',
    },
    {
      title: '收支金额(¥)',
      dataIndex: 'amount',
      className: 'table-light-color',
    },
    {
      title: '时间',
      dataIndex: 'time',
      className: 'table-light-color',
    },
  ]

  const onFinish = (values: any) => {
    loadTableData(pageIndex)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="list__root">
      <div className="list-form">
        <Form
          name="basic"
          initialValues={{ channelId: 0 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Row gutter={[5, 0]}>
            <Col span={2} className="table-from-label">
              收支状态
            </Col>
            <Col span={4}>
              <Form.Item name="balanceType">
                <Select style={{ width: 120 }}>
                  <Option value={''} key="0">
                    全部
                  </Option>
                  <Option value={1} key="1">
                    收入
                  </Option>
                  <Option value={2} key="2">
                    支出
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={2} className="table-from-label">
              时间筛选
            </Col>
            <Col span={4}>
              <Form.Item name="time">
                <RangePicker showTime />
              </Form.Item>
            </Col>
            <Form.Item wrapperCol={{ offset: 2, span: 12 }}>
              <Space>
                <Button htmlType="submit">查询</Button>
                <Button htmlType="submit">重置</Button>
              </Space>
            </Form.Item>
          </Row>
        </Form>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        scroll={{ x: 'max-content' }}
        dataSource={[...tableData]}
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
export default TabOnePage
