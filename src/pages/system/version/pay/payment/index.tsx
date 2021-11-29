/* eslint-disable react/display-name */
import { InputTemp, SelectTemp, TimePickerTemp, DatePickerTemp, RangePickerTemp, LowAndHighTemp } from '@/components/filter/formItem'
import { delUser, userList } from '@/service/user'
import { Button, Col, Form, Row, Space, Table, Divider, } from 'antd'
import React, { useEffect, useState } from 'react'
// import AddUserDialog, { DialogMode } from './components/AddUserDialog'
import './index.less'

/**
 * 系统中心-支付配置
 */
const PaymentPage: React.FC = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [showDialog, setShowDialog] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
//   const [dialogMode, setDialogMode] = useState<DialogMode>('add')

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
      align:'center',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '模版名称',
      align:'center',
      dataIndex: 'name',
    },
    {
      title: '支付类型',
      dataIndex: 'type',
      align:'center',
    },
    {
        title: '状态',
        dataIndex: 'state',
        align:'center',
    },
    {
        title: '渠道',
        dataIndex: 'way',
        align:'center',
    },
    {
      title: '操作',
      align:'center',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button onClick={() => showAddDialog(record, false)}>编辑</Button>
          <Button danger onClick={() => _onDelProject(record)}>
            删除
          </Button>
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
    // setDialogMode(add ? 'add' : 'edit')
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
        <div>
            <h1 style={{marginLeft:'20px'}}>支付模块</h1>
        </div>
        <Divider/>
        <Button style={{float:'right',marginBottom:'20px'}}>新增</Button>
      <Table rowKey="id" columns={columns} dataSource={[...data]} pagination={{ onChange: onChange }} />
      {/* <AddUserDialog
        data={selectedData}
        mode={dialogMode}
        onSuccess={_onDialogSuccess}
        show={showDialog}
        onClose={_onDialogClose}
      /> */}
    </div>
  )
}

export default PaymentPage
