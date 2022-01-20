import React, { useState, useEffect } from 'react'
import './index.less'
import { Button, Table, Space, Form, Row, Col, Select, DatePicker, Input, message } from 'antd'
import AEMessageDialog, { DialogMode } from './components/AEMessageDialog'
import { MessageService } from '@/service/MessageService'
import dayjs from 'dayjs'
import { HttpCode } from '@/constants/HttpCode'
/**
 * 消息管理
 */
const MessageListPage: React.FC = () => {
  const [form] = Form.useForm()
  const { RangePicker } = DatePicker
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
    form.validateFields().then((query) => {
      const beginTime = query.time ? dayjs(query.time[0]).format('YYYY-MM-DD HH:mm:ss') : ''
      const endTime = query.time ? dayjs(query.time[1]).format('YYYY-MM-DD HH:mm:ss') : ''
      MessageService.list({
        current: pageIndex,
        size: pageSize,
        title: query.title,
        createTimeStart: beginTime,
        createTimeEnd: endTime,
      }).then((res) => {
        setData(res.data.records)
        setTotal(res.data.total)
      })
    })
  }

  const columns = [
    {
      title: '序号',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '消息标题',
      dataIndex: 'pushTitle',
    },
    {
      title: '发布内容',
      dataIndex: 'pushContent',
    },

    {
      title: '推送方式',
      dataIndex: 'messageType',
      render: (text: any, record: any) => {
        if (record?.messageType == '0') {
          return `APP推送`
        } else if (record?.messageType == '1') {
          return `站内信`
        } else if (record?.messageType == '2') {
          return `短信`
        }
      },
    },
    {
      title: '推送时间',
      dataIndex: 'createTime',
    },
    {
      title: '发布人员',
      dataIndex: 'createUser',
    },
    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button onClick={() => _editDialog(record)}>查看</Button>
          <Button onClick={() => _delete(record)}>删除</Button>
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

  const _delete = (record) => {
    MessageService.del(record.id).then((res) => {
      if (res.code === HttpCode.success) {
        message.success('删除成功')
        loadData(pageIndex)
      }
    })
  }

  const _reset = () => {
    form.resetFields()
    loadData(pageIndex)
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
              <Form.Item name="title">
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
            <Form.Item wrapperCol={{ offset: 4, span: 12 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button htmlType="button" onClick={_reset}>
                  重置
                </Button>
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
