import React, { useState, useEffect } from 'react'
import { Button, Col, Row, Form, Table, Pagination, Space, Input, Select } from 'antd'
import './index.less'
import CreateAdminDialog, { DialogMode } from './components/createAdministrators'
import { AdminService } from '@/service/AdminService'
import { getRoles } from '@/service/role'

/**
 * 管理员账号
 */
const AdminListPage: React.FC = () => {
  const [form] = Form.useForm()
  const { Option } = Select
  const [roleId, setRoleId] = useState()
  const [state, setState] = useState()
  const [keyword, setKeyword] = useState('')
  const [data, setData] = useState([])
  const [roleData, setRoleData] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState()
  const [showDialog, setShowDialog] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const [dialogMode, setDialogMode] = useState<DialogMode>('add')

  useEffect(() => {
    loadData(pageIndex)
    loadRoleData()
  }, [pageIndex])

  const loadData = (pageIndex) => {
    AdminService.list({ current: pageIndex, pageSize: pageSize, keyword, state, roleId }).then((res) => {
      setData(res.data.records)
      setTotal(res.data.total)
    })
  }

  const loadRoleData = () => {
    getRoles({ state: 0 }).then((res) => {
      setRoleData(res.data)
    })
  }

  const columns = [
    {
      title: '编号',
      dataIndex: 'systemUserId',
    },
    {
      title: '用户名',
      dataIndex: 'nickName',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
    },
    {
      title: '角色',
      dataIndex: 'roleName',
    },
    {
      title: '状态',
      dataIndex: 'state',
      render: (text: any, record: any) => {
        if (record.state == 0) {
          return `禁用`
        } else {
          return `正常`
        }
      },
    },
    {
      title: '添加日期',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button onClick={() => _editDialog(record)}>编辑</Button>
          <Button>删除</Button>
        </Space>
      ),
    },
  ]
  const stateList = [
    {
      key: '',
      value: '全部',
    },
    {
      key: 0,
      value: '禁用',
    },
    {
      key: 1,
      value: '正常',
    },
  ]

  const onFinish = (values: any) => {
    loadData(pageIndex)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const onChange = (pageNum: number) => {
    console.log(pageNum)
  }
  const handleChange = (value: any) => {
    console.log(`selected ${value}`)
  }
  const _onDialogSuccess = () => {
    setSelectedData(null)
    setShowDialog(false)
    loadData(pageIndex)
  }

  const _editDialog = (record) => {
    setDialogMode('edit')
    setSelectedData(record)
    setShowDialog(true)
  }

  const _onDialogClose = () => {
    setSelectedData(null)
    setShowDialog(false)
  }
  const _addAdmin = () => {
    setDialogMode('add')
    setShowDialog(true)
  }
  return (
    <div className="admin__root">
      <div className="admin-header">
        <span className="header-title">管理员账号</span>
        <Button type="primary" onClick={_addAdmin}>
          添加管理员
        </Button>
      </div>
      <div className="admin-form">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Row gutter={[5, 0]} style={{ paddingLeft: '40px' }}>
            <Col span={8}>
              <Input
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value)
                }}
                placeholder="姓名/手机号"
              />
            </Col>
            <Col span={2} className="table-from-label">
              角色
            </Col>
            <Col span={4}>
              <Select style={{ width: 120 }} placeholder="请选择" onChange={(value, e) => setRoleId(e.key)}>
                {roleData?.map((item, index) => {
                  return (
                    <Option value={item.roleName} key={item.id}>
                      {item.roleName}
                    </Option>
                  )
                })}
              </Select>
            </Col>
            <Col span={2} className="table-from-label">
              状态
            </Col>
            <Col span={4}>
              <Select
                placeholder="请选择"
                style={{ width: 120 }}
                onChange={(value, e) => {
                  setState(e.key)
                }}
              >
                {stateList.map((item) => {
                  return (
                    <Option value={item.value} key={item.key}>
                      {item.value}
                    </Option>
                  )
                })}
              </Select>
            </Col>
            <Form.Item wrapperCol={{ offset: 2, span: 0 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button
                  htmlType="submit"
                  onClick={() => {
                    setRoleId('')
                    setState('')
                  }}
                >
                  重置
                </Button>
              </Space>
            </Form.Item>
          </Row>
          <Row style={{ paddingLeft: '40px' }}>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="button">
                  添加
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
        pagination={{
          onChange: setPageIndex,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSize: pageSize,
          total: total,
        }}
      />
      <CreateAdminDialog
        data={selectedData}
        mode={dialogMode}
        onSuccess={_onDialogSuccess}
        show={showDialog}
        onClose={_onDialogClose}
      />
    </div>
  )
}
export default AdminListPage
