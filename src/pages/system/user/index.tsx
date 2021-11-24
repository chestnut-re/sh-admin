/* eslint-disable react/display-name */
import { delUser, userList } from '@/service/user'
import { Button, Space, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import AddUserDialog, { DialogMode } from './components/AddUserDialog'
import './index.less'

const UserPage: React.FC = () => {
  const [pageIndex, setPageIndex] = useState(0)
  const [data, setData] = useState([])
  const [showDialog, setShowDialog] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const [dialogMode, setDialogMode] = useState<DialogMode>('add')

  useEffect(() => {
    loadData(pageIndex)
  }, [pageIndex])

  const loadData = (pageIndex) => {
    userList(pageIndex).then((res) => {
      setData(res.data)
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
    setPageIndex(pageNum)
  }

  const _onDelProject = (record) => {
    delUser(record.id).then((res) => {
      if (res.code === 200) {
        loadData(pageIndex)
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
    loadData(pageIndex)
  }

  const _onDialogClose = () => {
    setSelectedData(null)
    setShowDialog(false)
  }

  return (
    <div className="page-root">
      <Space>
        <div className="title">用户管理</div>
        <Button type="primary" onClick={showAddDialog}>
          添加用户
        </Button>
      </Space>
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
