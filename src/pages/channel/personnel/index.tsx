import React, { useState, useEffect } from 'react'
import { Form, Col, Row, Button, Table, Space, Pagination } from 'antd'
import { InputTemp, SelectTemp, LowAndHighTemp } from '@/components/filter/formItem'
import './component/StructureTree'
import './index.less'
import CreatePerson from './add'
import StructureTree from './component/StructureTree'
import { getPerson, getRoles } from '@/service/PersonService'
import Prefecture from './component/Prefecture'
/*
 * 人员管理
 */
const PersonnelManagement: React.FC = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState([])

  const columns = [
    {
      title: '人员ID',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '手机号',
      dataIndex: 'tel',
    },
    {
      title: '责任区域',
      dataIndex: 'prefecture',
    },
    {
      title: '人员类型',
      dataIndex: 'type',
    },
    {
      title: '角色权限',
      dataIndex: 'role',
    },
    {
      title: '创建方',
      dataIndex: 'Creator',
    },
    {
      title: '创建平台',
      dataIndex: 'platform',
    },
    {
      title: '状态',
      dataIndex: 'state',
      render: (text: any, record: any) => {
        if (record.state == 0) {
          return `下线`
        } else {
          return `上线`
        }
      },
    },
    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button>编辑</Button>
          <Button>查看</Button>
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
  // useEffect(() => {
  //   getPerson().then((res) => {
  //     setData(res.data)
  //   })
  // }, [])
  return (
    <div className="channel-list">
      <div className="person-top">
        <h1>人员管理</h1>
      </div>
      <div>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Row gutter={[12, 12]}>
            <Col span={7}>
              <InputTemp name="username" placeholder="渠道名称/责任区域" />
            </Col>
            <Col span={1} className="table-from-label">
              状态
            </Col>
            <Col span={3}>
              <SelectTemp name="state" />
            </Col>
            <Col span={2} className="table-from-label">
              人员类型
            </Col>
            <Col span={3}>
              <SelectTemp name="type" />
            </Col>
            <Form.Item wrapperCol={{ offset: 12, span: 0 }}>
              <Space size={16}>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button htmlType="button">重置</Button>
              </Space>
            </Form.Item>
          </Row>
        </Form>
      </div>
      <div className="person-button">
        <CreatePerson />
      </div>
      <div></div>
      <Row gutter={[24, 0]}>
        <Col span={4}>
          <StructureTree />
        </Col>
        <Col span={20}>
          <Table
            rowKey="id"
            columns={columns}
            scroll={{ x: 'max-content' }}
            dataSource={[...data]}
            pagination={{ onChange: onChange }}
          />
        </Col>
      </Row>
      <div className="page">
        <Pagination total={50} showSizeChanger showQuickJumper showTotal={(total) => `Total ${total} items`} />
      </div>
    </div>
  )
}

export default PersonnelManagement
