import { useStore } from '@/store/context'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Button, Col, Form, Row, Space, Table, Divider } from 'antd'
import { InputTemp, SelectTemp, LowAndHighTemp } from '@/components/filter/formItem'
import './index.less'

/**
 * 运营中心-商品列表
 */

const ProductionListPage: React.FC = observer(() => {
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [getResult, setGetResult] = useState('')
  const store = useStore()

  const columns = [
    {
      title: '商品ID',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '商品名称',
      dataIndex: 'name',
    },
    {
      title: '出行类型',
      dataIndex: 'type',
    },
    {
      title: '始发地',
      dataIndex: 'place',
    },
    {
      title: '最近出发时间',
      dataIndex: 'time',
    },
    {
      title: '现售价',
      dataIndex: 'price',
    },
    {
      title: '累计销量',
      dataIndex: 'num',
    },
    {
      title: '已上架分中心',
      dataIndex: 'center',
    },
    {
      title: '上架时间',
      dataIndex: 'time',
    },
    {
      title: '状态',
      dataIndex: 'state',
    },
    {
      title: '支持抵扣',
      dataIndex: 'methods',
    },
    {
      title: '商品分佣',
      dataIndex: 'methods',
    },
    {
      title: '营销活动',
      dataIndex: 'active',
    },
    {
      title: '创建人',
      dataIndex: ' people',
    },
    {
      title: '创建时间',
      dataIndex: 'methods',
    },
    {
      title: '最新编辑人',
      dataIndex: 'active',
    },
    {
      title: '最新编辑时间',
      dataIndex: 'active',
    },
    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button>详情</Button>
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

  const onChange = (pageNum: number) => {
    console.log(pageNum)
  }

  return (
    <div className="ProductionList__root">
      <h1 className="title">商品库</h1>
      <Divider />
      <div>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Row gutter={[5, 0]} style={{ paddingLeft: '10px' }}>
            {/* <Col span={1} className="table-from-label">
            </Col> */}
            <Col span={2}>
              <InputTemp name="username" />
            </Col>
            <Col span={2} className="table-from-label">
              出行类型
            </Col>
            <Col span={2}>
              <SelectTemp name="gender" />
            </Col>
            <Col span={2} className="table-from-label">
              出发时间
            </Col>
            <Col span={4}>
              <LowAndHighTemp name="high" />
            </Col>
            <Col span={2} className="table-from-label">
              现售价
            </Col>
            <Col span={4}>
              <LowAndHighTemp name="high" />
            </Col>
            <Col span={2} className="table-from-label">
              累计销量
            </Col>
            <Col span={4}>
              <LowAndHighTemp name="high" />
            </Col>
          </Row>
          <Row gutter={[10, 0]}>
            <Col span={2} className="table-from-label">
              状态
            </Col>
            <Col span={2}>
              <SelectTemp name="gender" />
            </Col>
            <Col span={2} className="table-from-label">
              已上架
            </Col>
            <Col span={2}>
              <InputTemp name="username" />
            </Col>
            <Col span={2} className="table-from-label">
              商品分佣
            </Col>
            <Col span={2}>
              <SelectTemp name="gender" />
            </Col>
            <Col span={2} className="table-from-label">
              营销活动
            </Col>
            <Col span={2}>
              <SelectTemp name="gender" />
            </Col>
            <Col span={2} className="table-from-label">
              支持抵扣
            </Col>
            <Col span={2}>
              <SelectTemp name="gender" />
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
})

export default ProductionListPage
