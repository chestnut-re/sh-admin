/* eslint-disable react/display-name */
import { InputTemp, SelectTemp } from '@/components/filter/formItem'
import { delUser, userList } from '@/service/user'
import { Button, Col, Form, Input, Row, Select, Space, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import AddUserDialog, { DialogMode } from './components/AddUserDialog'
import './index.less'

/**
 * 用户中心
 */
const UserPage: React.FC = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [showDialog, setShowDialog] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const [dialogMode, setDialogMode] = useState<DialogMode>('add')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = (params = {}) => {
    form.validateFields().then((query) => {
      userList({ ...params, ...query }).then((res) => {
        setData(res.data?.list)
      })
    })
  }

  const columns = [
    {
      title: '序号',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '账号',
      dataIndex: 'account',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '角色',
      dataIndex: 'rolesNames',
      render: (text: any, record: any) => <span>{JSON.stringify(record.rolesNames)}</span>,
    },
    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          {/* <Button danger onClick={() => _onDelProject(record)}>
            删除
          </Button> */}
          <Button onClick={() => showAddDialog(record, false)}>编辑</Button>
        </Space>
      ),
    },
  ]

  const onChange = (pageNum: number) => {
    loadData({ pageNum })
  }

  const _onDelProject = (record) => {
    delUser(record.id).then((res) => {
      if (res.code === 200) {
        loadData()
      }
    })
  }

  const showAddDialog = (record, add = true) => {
    setDialogMode(add ? 'add' : 'edit')
    setShowDialog(true)
    setSelectedData(record)
  }

  const _onDialogSuccess = () => {
    setSelectedData(null)
    setShowDialog(false)
    loadData()
  }

  const _onDialogClose = () => {
    setSelectedData(null)
    setShowDialog(false)
  }

  const onFinish = (values: any) => {
    console.log('Success:', values)
    loadData()
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const onReset = () => {
    form.resetFields()
  }

  return (
    <div className="page-root">
      <Space>
        <div className="title">用户管理</div>
        <Button type="primary" onClick={showAddDialog}>
          添加用户
        </Button>
      </Space>
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
              文本筛选
            </Col>
            <Col span={4}>
              <InputTemp name="username" />
            </Col>
            <Col span={2} className="table-from-label">
              选择项筛选
            </Col>
            <Col span={4}>
              <SelectTemp name="gender" />
            </Col>
          </Row>

          <Form.Item wrapperCol={{ offset: 2, span: 0 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button htmlType="button" onClick={onReset}>
                清除
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
      <Table rowKey="id" columns={columns} dataSource={[...data]} pagination={{ onChange: onChange }} />
      <AddUserDialog
        data={selectedData}
        mode={dialogMode}
        onSuccess={_onDialogSuccess}
        show={showDialog}
        onClose={_onDialogClose}
      />
    </div>
  )
}

export default UserPage
