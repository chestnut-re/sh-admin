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
      title: '商品类型标签',
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
      title: '库存',
      dataIndex: 'name',
    },
    {
      title: '现售价(¥)',
      dataIndex: 'price',
    },
    {
      title: '累计销量',
      dataIndex: 'num',
    },
    {
      title: '已上架渠道',
      dataIndex: 'center',
    },
    {
      title: '状态',
      dataIndex: 'state',
    },
    {
      title: '创建渠道',
      dataIndex: 'time',
    },
    {
      title: '创建时间',
      dataIndex: 'methods',
    },
    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button>查看</Button>
          <Button>编辑</Button>
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
            <Col span={8}>
              <InputTemp name="username" />
            </Col>
            <Col span={2} className="table-from-label">
              出行类型
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
            <Form.Item wrapperCol={{ offset: 2, span: 0 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button htmlType="button">重置</Button>
              </Space>
            </Form.Item>
          </Row>
          <Row justify="end">
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="button">
                  添加商品
                </Button>
                <Button htmlType="button" type="primary">
                  下架
                </Button>
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
