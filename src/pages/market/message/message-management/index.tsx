import React, { useState, useEffect } from 'react'
import './index.less'
import { Button, Table, Space, Form, Row, Col, Select, DatePicker, Input } from 'antd'
import AEMessageDialog, { DialogMode } from './components/AEMessageDialog'
/**
 * 消息管理
 */
const MessageListPage: React.FC = () => {
  const [form] = Form.useForm()
  const { Option } = Select
  const { RangePicker } = DatePicker
  // const [data, setData] = useState([])
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
    // AdminService.list({ current: pageIndex, pageSize: pageSize }).then((res) => {
    //   console.log(res)
    //   setData(res.data.records)
    //   setTotal(res.data.total)
    // })
  }

  const data = [
    {
      nickName: '1',
    },
  ]

  const columns = [
    {
      title: '序号',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '消息标题',
      dataIndex: 'nickName',
    },
    {
      title: '发布内容',
      dataIndex: 'mobile',
    },

    {
      title: '推送方式',
      dataIndex: 'state',
    },
    {
      title: '推送时间',
      dataIndex: 'roleName',
    },
    {
      title: '发布人员',
      dataIndex: 'roleName',
    },
    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button onClick={() => _editDialog(record)}>查看</Button>
          <Button>删除</Button>
        </Space>
      ),
    },
  ]
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
  const _addMessage = () => {
    setDialogMode('add')
    setShowDialog(true)
  }

  const onFinish = (values: any) => {
    loadData(pageIndex)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className="message__root">
      <div className="message-header">
        <span className="header-title">消息管理</span>
      </div>
      <div className="allocated-form">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Row gutter={[5, 0]} style={{ paddingLeft: '40px' }}>
            <Col span={4}>
              <Form.Item>
                <Input placeholder="请输入消息标题" />
              </Form.Item>
            </Col>
            <Col span={2} className="table-from-label">
              发布时间
            </Col>
            <Col span={4}>
              <Form.Item name="time">
                <RangePicker showTime />
              </Form.Item>
            </Col>
            <Form.Item wrapperCol={{ offset: 4, span: 0 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button htmlType="button">重置</Button>
                <Button htmlType="button" type="primary" onClick={_addMessage}>
                  发布消息
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
      <AEMessageDialog
        data={selectedData}
        mode={dialogMode}
        onSuccess={_onDialogSuccess}
        show={showDialog}
        onClose={_onDialogClose}
      />
    </div>
  )
}
export default MessageListPage
