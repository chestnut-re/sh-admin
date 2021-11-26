import { useStore } from '@/store/context'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Button, Col, Form, Row, Space, Table } from 'antd'
import { InputTemp, SelectTemp, LowAndHighTemp } from '@/components/filter/formItem'
import './index.less'

const ProductionListPage: React.FC = observer(() => {
  const [form] = Form.useForm()
  const [data, setData]= useState([])
  const [getResult, setGetResult] = useState('')
  const store = useStore()

  const columns=[
    {
      title: '编号',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '商品名称',
      dataIndex: 'name',
    },
    {
      title: '出行时间类型',
      dataIndex: 'type',
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
      title: '累计铺店量',
      dataIndex: 'number',
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
      title: '渠道分佣方案',
      dataIndex: 'methods',
    },
    {
      title: '营销活动',
      dataIndex: 'active',
    },
    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button>编辑</Button>
          <Button>上架</Button>
          <Button>分享商品</Button>
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
      <div>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Row gutter={[10, 0]}>
            <Col span={2} className="table-from-label">
              商品编号/名称
            </Col>
            <Col span={4}>
              <InputTemp name="username" />
            </Col>
            <Col span={2} className="table-from-label">
              出行时间类型
            </Col>
            <Col span={4}>
              <SelectTemp name="gender" />
            </Col>
            <Col span={2} className="table-from-label">
              渠道分佣方案
            </Col>
            <Col span={4}>
              <SelectTemp name="gender" />
            </Col>
            <Col span={2} className="table-from-label">
              状态
            </Col>
            <Col span={4}>
              <SelectTemp name="gender" />
            </Col>
          </Row>
          <Row gutter={[10, 0]}>
            <Col span={2} className="table-from-label">
              累计销量
            </Col>
            <Col span={4}>
              <LowAndHighTemp name="high" />
            </Col>
            <Col span={2} className="table-from-label">
              累计铺店量
            </Col>
            <Col span={4}>
              <LowAndHighTemp name="high" />
            </Col>
            <Col span={2} className="table-from-label">
              营销活动
            </Col>
            <Col span={4}>
              <SelectTemp name="gender" />
            </Col>
            <Form.Item wrapperCol={{ offset: 2, span: 0 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button htmlType="button">
                重置
              </Button>
            </Space>
          </Form.Item>
          </Row>
        </Form>
      </div>
      <Table rowKey="id" columns={columns} dataSource={[...data]} pagination={{ onChange: onChange }} />
    </div>
  )
})

export default ProductionListPage
