import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './index.less'
import { Descriptions, Tabs, Row, Col, Form, Table, DatePicker, Select, Button, Space } from 'antd'
import { FinanceAccountService } from '@/service/FinanceAccountService'
import dayjs from 'dayjs'

/**
 * 查看明细
 */
const AccountDetails: React.FC = () => {
  const [form] = Form.useForm()
  const history = useHistory<any>()
  const [data, setData] = useState<any>({})
  const { TabPane } = Tabs
  const { RangePicker } = DatePicker
  const { Option } = Select
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState()
  const [tableData, setTableData] = useState([])
  useEffect(() => {
    setData(history.location.state.record)
  }, [history.location.state.record])
  useEffect(() => {
    console.log(data)
  }, [data])

  // useEffect(() => {
  //   if (data) {
  //     loadAllData()
  //   }
  // }, [show])

  // useEffect(() => {
  //   if (data) {
  //     loadTableData(pageIndex)
  //   }
  // }, [pageIndex, show])

  const loadAllData = () => {
    FinanceAccountService.details({ phone: data?.phone }).then((res) => {
      console.log(res)
    })
  }

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
        }).then((res) => {
          setTableData(res.data.records)
          setTotal(res.data.total)
        })
      })
      .catch((e) => {
        console.error(e)
      })
  }

  const columns = [
    {
      title: '序号',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '订单编号',
      dataIndex: 'orderNo',
    },
    {
      title: '分佣类型',
      dataIndex: 'commissionTypeName',
    },
    {
      title: '账户变化',
      dataIndex: 'amount',
    },
    {
      title: '时间',
      dataIndex: 'billDate',
    },
  ]

  const onFinish = (values: any) => {
    // loadData(pageIndex)
    console.log(values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className="account-details__root">
      <div className="details-header">
        <span className="header-title">账户明细</span>
      </div>
      <div className="content">
        <Descriptions column={1} labelStyle={{ color: '#999' }}>
          <Descriptions.Item label="归属渠道">Zhou Maomao</Descriptions.Item>
          <Descriptions.Item label="姓名">1810000000</Descriptions.Item>
          <Descriptions.Item label="账号">Hangzhou, Zhejiang</Descriptions.Item>
          <Descriptions.Item label="账户余额">111</Descriptions.Item>
          <Descriptions.Item label="" contentStyle={{ color: '#999', marginLeft: 70 }}>
            除了运营资金，包含待释放跟提现中
          </Descriptions.Item>
          <Descriptions.Item label="待释放">1</Descriptions.Item>
          <Descriptions.Item label="提现中">1</Descriptions.Item>
          <Descriptions.Item label="可提现">1</Descriptions.Item>
          <Descriptions.Item label="运营资金">1</Descriptions.Item>
        </Descriptions>
      </div>
      <div className="sales-tabs">
        <Tabs defaultActiveKey="1">
          <TabPane tab="佣金" key="1">
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
                      <Form.Item name="channelId">
                        <Select style={{ width: 120 }}>
                          <Option value="0" key="0">
                            全部
                          </Option>
                          <Option value="1" key="1">
                            收入
                          </Option>
                          <Option value="2" key="2">
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
                    <Form.Item wrapperCol={{ offset: 2, span: 0 }}>
                      <Space>
                        <Button type="primary" htmlType="submit">
                          查询
                        </Button>
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
                  showSizeChanger: true,
                  showQuickJumper: true,
                  pageSize: pageSize,
                  total: total,
                }}
              />
            </div>
          </TabPane>
          <TabPane tab="提现" key="2"></TabPane>
          <TabPane tab="运营资金" key="3"></TabPane>
        </Tabs>
      </div>
    </div>
  )
}
export default AccountDetails
