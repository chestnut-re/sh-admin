import React, { useState, useEffect } from 'react'
import { Button, Col, Row, Form, Table, Pagination, Space, Input, Select } from 'antd'
import './index.less'
import CreateAdminDialog, { DialogMode } from './components/createAdministrators'
import { AdminService } from '@/service/AdminService'

/**
 * 管理员账号
 */
const AdminListPage: React.FC = () => {
  const [form] = Form.useForm()
  const { Option } = Select
  const [role, setRole] = useState('全部')
  const [state, setState] = useState('全部')
  const [data, setData] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState()
  const [showDialog, setShowDialog] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const [dialogMode, setDialogMode] = useState<DialogMode>('add')

  useEffect(() => {
    loadData(pageIndex)
  }, [pageIndex])

  const loadData = (pageIndex) => {
    AdminService.list({ current: pageIndex, pageSize: pageSize }).then((res) => {
      console.log(res)
      setData(res.data.records)
      setTotal(res.data.total)
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

  const roleList = [
    {
      key: 1,
      value: '全部',
    },
    {
      key: 2,
      value: '超管',
    },
    {
      key: 3,
      value: '运营管家',
    },
    {
      key: 4,
      value: '运营商品小二',
    },
    {
      key: 5,
      value: '运营营销小二',
    },
    {
      key: 6,
      value: '运营渠道小二',
    },
    {
      key: 7,
      value: '运营财务小二',
    },
    {
      key: 8,
      value: '分中心',
    },
  ]
  const stateList = [
    {
      key: 1,
      value: '全部',
    },
    {
      key: 2,
      value: '禁用',
    },
    {
      key: 3,
      value: '正常',
    },
  ]

  const onFinish = (values: any) => {
    console.log('Success:', values, role, state)
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
              <Input name="admin" />
            </Col>
            <Col span={2} className="table-from-label">
              角色
            </Col>
            <Col span={4}>
              <Select defaultValue="全部" style={{ width: 120 }} onChange={(value) => setRole(value)}>
                {roleList.map((item) => {
                  return (
                    <Option value={item.value} key={item.key}>
                      {item.value}
                    </Option>
                  )
                })}
              </Select>
            </Col>
            <Col span={2} className="table-from-label">
              状态
            </Col>
            <Col span={4}>
              <Select defaultValue="全部" style={{ width: 120 }} onChange={(value) => setState(value)}>
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
                    setRole('全部')
                    setState('全部')
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
