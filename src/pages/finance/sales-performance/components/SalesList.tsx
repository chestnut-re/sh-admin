import React, { useState, useEffect } from 'react'
import { Form, Button, Input, Row, Col, Select, Space, Table } from 'antd'
import './index.less'
import ChannelService from '@/service/ChannelService'
import { HttpCode } from '@/constants/HttpCode'

/**账户管理 */
const SalesListPage: React.FC = () => {
  const [form] = Form.useForm()
  const { Option } = Select
  const [channel, setChannel] = useState('全部')
  const [person, setPerson] = useState('全部')
  const [data, setData] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState()
  const [channelData, setChannelData] = useState([])

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

  const getChannel = () => {
    ChannelService.list({ pages: 1, size: 10 }).then((res) => {
      if (res.code === HttpCode.success) {
        setChannelData(res.data?.records ?? [])
      }
    })
  }

  const columns = [
    {
      title: '序号',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '订单编号',
      dataIndex: 'nickName',
    },
    {
      title: '分佣类型',
      dataIndex: 'mobile',
    },
    {
      title: '账户变化',
      dataIndex: 'roleName',
    },
    {
      title: '时间',
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
        <Form
          name="basic"
          initialValues={{ remember: true }}
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
              时间筛选
            </Col>
            <Col span={4}>
              <Form.Item name="channelId"></Form.Item>
            </Col>
            <Form.Item wrapperCol={{ offset: 2, span: 0 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button
                  htmlType="submit"
                  onClick={() => {
                    setChannel('全部')
                    setPerson('全部')
                  }}
                >
                  重置
                </Button>
              </Space>
            </Form.Item>
          </Row>
        </Form>
      </div>
      <div className="sales">
        <span>待释放：</span>
        <span></span>
        <span>支出：</span>
        <span></span>
        <span>收入：</span>
        <span></span>
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
export default SalesListPage
