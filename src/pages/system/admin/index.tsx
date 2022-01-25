import React, { useState, useEffect } from 'react'
import { Button, Col, Row, Form, Table, Modal, Space, Input, Select } from 'antd'
import './index.less'
import CreateAdminDialog, { DialogMode } from './components/createAdministrators'
import { AdminService } from '@/service/AdminService'
import { getRoles } from '@/service/role'
import { HttpCode } from '@/constants/HttpCode'
import { PlusOutlined } from '@ant-design/icons'

/**
 * 管理员账号
 */
const AdminListPage: React.FC = () => {
  const [form] = Form.useForm()
  const { Option } = Select
  const [roleId, setRoleId] = useState('')
  const [state, setState] = useState('1')
  const [keyword, setKeyword] = useState('')
  const [data, setData] = useState([])
  const [roleData, setRoleData] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState()
  const [showDialog, setShowDialog] = useState(false)
  const [visible, setVisible] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const [dialogMode, setDialogMode] = useState<DialogMode>('add')

  useEffect(() => {
    loadData(pageIndex)
    loadRoleData()
  }, [pageIndex])

  const loadData = (pageIndex) => {
    form.validateFields().then((query) => {
      AdminService.list({ current: pageIndex, pageSize: pageSize, ...query }).then((res) => {
        setData(res.data?.records ?? [])
        setTotal(res.data.total)
      })
    })
  }

  const loadRoleData = () => {
    getRoles({ state: 0 }).then((res) => {
      setRoleData(res.data ?? [])
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
      title: '添加日期',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          <span onClick={() => _editDialog(record)} className="operation">
            编辑
          </span>
          <span
            onClick={() => {
              _delete(record)
            }}
            className="operation"
          >
            删除
          </span>
        </Space>
      ),
    },
  ]

  const onFinish = (values: any) => {
    loadData(pageIndex)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const _delete = (record) => {
    console.log(record)
    setSelectedData(record)
    setVisible(true)
  }

  const _comDelete = () => {
    AdminService.del(selectedData.systemUserId).then((res) => {
      if (res.code === HttpCode.success) {
        setVisible(false)
        loadData(pageIndex)
      }
    })
  }

  /**重置 */
  const resetTable = () => {
    form.resetFields()
    setPageIndex(1)
    loadData(1)
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
    loadData(pageIndex)
  }
  const _addAdmin = () => {
    setDialogMode('add')
    setShowDialog(true)
  }
  return (
    <div className="admin__root">
      {/* <div className="admin-header">
        <span className="header-title">管理员账号</span>
        
      </div> */}
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
              <Form.Item name="keyword">
                <Input placeholder="姓名/手机号" />
              </Form.Item>
            </Col>
            <Col span={2} className="table-from-label">
              角色
            </Col>
            <Col span={6}>
              <Form.Item name="roleId">
                <Select style={{ width: 120 }} placeholder="请选择">
                  {roleData?.map((item: any, index) => {
                    return (
                      <Option value={item.id} key={item.id}>
                        {item.roleName}
                      </Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item>
                <Space>
                  <Button htmlType="submit">查询</Button>
                  <Button htmlType="button" onClick={resetTable}>
                    重置
                  </Button>
                </Space>
              </Form.Item>
            </Col>
            <Col span={4} style={{ textAlign: 'right' }}>
              <Form.Item>
                <Space>
                  <Button type="primary" icon={<PlusOutlined />} htmlType="button" onClick={_addAdmin}>
                    添加管理员
                  </Button>
                </Space>
              </Form.Item>
            </Col>
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
          showQuickJumper: true,
          pageSize: pageSize,
          total: total,
        }}
      />
      {showDialog && (
        <CreateAdminDialog
          data={selectedData}
          mode={dialogMode}
          onSuccess={_onDialogSuccess}
          show={showDialog}
          onClose={_onDialogClose}
        />
      )}

      <Modal
        title="提示"
        visible={visible}
        okText="确认删除"
        cancelText="取消"
        onOk={_comDelete}
        onCancel={handleCancel}
      >
        <span>是否确认删除?</span>
      </Modal>
    </div>
  )
}
export default AdminListPage
