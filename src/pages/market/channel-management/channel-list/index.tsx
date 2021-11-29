import React, { useState, useEffect } from 'react'
import { Form, Col, Row, Button, Table, Space } from 'antd'
import { InputTemp, SelectTemp, LowAndHighTemp } from '@/components/filter/formItem'
import './index.less'

/**
 * 营销中心-渠道管理-渠道列表
 */

const ChannelListPage: React.FC = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState([])

  const columns = [
    {
      title: '编号',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '创建日期',
      dataIndex: 'time',
    },
    {
      title: '创建方',
      dataIndex: 'name',
    },
    {
      title: '创建平台',
      dataIndex: 'name',
    },
    {
      title: '归属',
      dataIndex: 'name',
    },
    {
      title: '渠道名称',
      dataIndex: 'name',
    },
    {
      title: '渠道职称',
      dataIndex: 'name',
    },
    {
      title: '责任区域',
      dataIndex: 'name',
    },
    {
      title: '下一道渠道数',
      dataIndex: 'name',
    },
    {
      title: '状态',
      dataIndex: 'name',
    },
    {
      title: '分佣',
      dataIndex: 'name',
    },

    {
      title: '运营资金余额',
      dataIndex: 'name',
    },
    {
      title: '激励佣',
      dataIndex: 'name',
    },
    {
      title: '激励佣配置方',
      dataIndex: 'name',
    },
    {
      title: 'KPI进度',
      dataIndex: 'name',
    },
    {
      title: '累计销售额',
      dataIndex: 'name',
    },
    {
      title: '累计销量',
      dataIndex: 'name',
    },
    {
      title: '退款订单量',
      dataIndex: 'name',
    },
    {
      title: '累计上架商品量',
      dataIndex: 'name',
    },
    {
      title: '积分下发额',
      dataIndex: 'name',
    },
    {
      title: '积分消耗额',
      dataIndex: 'name',
    },
    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button>编辑</Button>
          <Button>删除</Button>
        </Space>
      ),
    },
  ]

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const onChange = () => {
    console.log(1)
  }

  return (
    <div className="channel-list">
      <div>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Row gutter={[10, 0]}>
            <Col span={3} className="table-from-label">
              渠道名称
            </Col>
            <Col span={5}>
              <InputTemp name="username" />
            </Col>
            <Col span={3} className="table-from-label">
              归属渠道名称
            </Col>
            <Col span={5}>
              <InputTemp name="username" />
            </Col>
            <Col span={3} className="table-from-label">
              状态
            </Col>
            <Col span={5}>
              <SelectTemp name="gender" />
            </Col>
          </Row>
          <Row gutter={[10, 0]}>
            <Col span={3} className="table-from-label">
              累计销量
            </Col>
            <Col span={5}>
              <LowAndHighTemp name="high" />
            </Col>
            <Col span={3} className="table-from-label">
              累计销售额
            </Col>
            <Col span={5}>
              <LowAndHighTemp name="high" />
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
      </div>
      <Table
        rowKey="id"
        columns={columns}
        scroll={{ x: 'max-content' }}
        dataSource={[...data]}
        pagination={{ onChange: onChange }}
      />
    </div>
  )
}

export default ChannelListPage
