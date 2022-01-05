import React, { useState, useEffect } from 'react'
import { Form, Table, Input, Select, Row, Col, Space, Button } from 'antd'

/**
 * 选择服务方列表
 */
const ServiceList: React.FC = () => {
  const [form] = Form.useForm()
  const { Option } = Select
  // const [data, setData] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState()

  const data = [
    {
      systemUserId: '111',
    },
  ]

  const columns = [
    {
      title: '姓名',
      dataIndex: 'systemUserId',
    },
    {
      title: '订单关联',
      dataIndex: 'nickName',
    },
    {
      title: '所属归属',
      dataIndex: 'mobile',
    },
    {
      title: '责任区域',
      dataIndex: 'roleName',
    },
    {
      title: '手机号',
      dataIndex: 'createTime',
    },
    {
      title: '团建奖金',
      dataIndex: 'roleName',
    },
    {
      title: '当前返利',
      dataIndex: 'createTime',
    },
  ]

  const onFinish = (values: any) => {
    // loadData(pageIndex)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const rowSelection = {
    type: 'radio',
    onSelect: (selectedRowKeys, selectedRows) => {
      console.log(selectedRowKeys, selectedRows)
    },
  }

  return (
    <div className="service__root">
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
      >
        <Row gutter={[5, 0]} style={{ paddingLeft: '40px' }}>
          <Col span={8}>
            <Form.Item name="keyword">
              <Input placeholder="姓名/手机号" />
            </Form.Item>
          </Col>
          <Col span={2} className="table-from-label">
            关系归属
          </Col>
          <Col span={4}>
            <Form.Item name="roleId">
              <Select style={{ width: 120 }} placeholder="请选择">
                {/* {roleData?.map((item: any, index) => {
                    return (
                      <Option value={item.id} key={item.id}>
                        {item.roleName}
                      </Option>
                    )
                  })} */}
              </Select>
            </Form.Item>
          </Col>
          <Col span={2} className="table-from-label">
            责任区域
          </Col>
          <Col span={4}>
            <Form.Item name="roleId">
              <Select style={{ width: 120 }} placeholder="请选择">
                {/* {roleData?.map((item: any, index) => {
                    return (
                      <Option value={item.id} key={item.id}>
                        {item.roleName}
                      </Option>
                    )
                  })} */}
              </Select>
            </Form.Item>
          </Col>
          <Form.Item wrapperCol={{ offset: 2, span: 0 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button htmlType="button">重置</Button>
            </Space>
          </Form.Item>
        </Row>
      </Form>
      <Table
        rowKey="id"
        columns={columns}
        scroll={{ x: 'max-content' }}
        rowSelection={rowSelection}
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
export default ServiceList
