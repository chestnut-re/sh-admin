import React, { useState, useEffect } from 'react'
import { Form, Button, Input, Row, Col, Select, Space, Table } from 'antd'
import './index.less'

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

  const channelList = [
    {
      key: 1,
      value: '全部',
    },
    {
      key: 2,
      value: '分中心一',
    },
    {
      key: 3,
      value: '分中心二',
    },
    {
      key: 4,
      value: '分中心三',
    },
    {
      key: 5,
      value: '分中心四',
    },
  ]
  const personList = [
    {
      key: 1,
      value: '全部',
    },
    {
      key: 2,
      value: '张三',
    },
    {
      key: 3,
      value: '李四',
    },
    {
      key: 4,
      value: '王五',
    },
    {
      key: 5,
      value: '赵六',
    },
  ]

  const columns = [
    {
      title: '序号',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '姓名',
      dataIndex: 'nickName',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
    },
    {
      title: '账户总额',
      dataIndex: 'roleName',
    },
    {
      title: '待释放金额',
      dataIndex: 'state',
    },
    {
      title: '可提现金额',
      dataIndex: 'createTime',
    },
    {
      title: '所属渠道',
    },
  ]

  const onFinish = (values: any) => {
    console.log('Success:', values, channel, person)
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
              渠道
            </Col>
            <Col span={4}>
              <Select defaultValue="全部" style={{ width: 120 }} onChange={(value) => setChannel(value)}>
                {channelList.map((item) => {
                  return (
                    <Option value={item.value} key={item.key}>
                      {item.value}
                    </Option>
                  )
                })}
              </Select>
            </Col>
            <Col span={2} className="table-from-label">
              人员
            </Col>
            <Col span={4}>
              <Select defaultValue="全部" style={{ width: 120 }} onChange={(value) => setPerson(value)}>
                {personList.map((item) => {
                  return (
                    <Option value={item.value} key={item.key}>
                      {item.value}
                    </Option>
                  )
                })}
              </Select>
            </Col>
            <Col span={8}>
              <Form.Item name="admin">
                <Input placeholder="请输入人员名称" />
              </Form.Item>
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
        <div>
          <div>账户总额</div>
          <div>
            <span>100850</span>
            <span>&nbsp;&nbsp;元</span>
          </div>
        </div>
        <div>
          <div>运营账户</div>
          <div>
            <span>100850</span>
            <span>&nbsp;&nbsp;元</span>
          </div>
        </div>
        <div>
          <div>提现中</div>
          <div>
            <span>2000</span>
            <span>&nbsp;&nbsp;元</span>
          </div>
        </div>
        <div>
          <div>待释放</div>
          <div>
            <span>180.50</span>
            <span>&nbsp;&nbsp;元</span>
          </div>
        </div>
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
