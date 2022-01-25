/*
 * @Description:退改政策
 * @LastEditTime: 2022-01-24 16:14:32
 */
import React, { useState, useEffect } from 'react'
import { Form, Col, Row, Button, Table, Space, Modal, message } from 'antd'
import './index.less'
import AEAddDialog, { DialogMode } from './components/AEAddDialog'
import { ConfigRefundService } from '@/service/OrderService'
import { HttpCode } from '@/constants/HttpCode'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { formateTime } from '@/utils/timeUtils'
import { PlusOutlined } from '@ant-design/icons'
const RefundReason: React.FC = () => {
  const [data, setData] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [total, setTotal] = useState()

  const [showDialog, setShowDialog] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const [dialogMode, setDialogMode] = useState<DialogMode>('add')

  useEffect(() => {
    loadData(pageIndex)
  }, [pageIndex])

  const loadData = (pageIndex) => {
    ConfigRefundService.list({ current: pageIndex, size: pageSize }).then((res) => {
      setData(res.data.records)
      setTotal(res.data.total)
    })
  }

  const columns = [
    {
      title: '序号',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '退款理由',
      dataIndex: 'dictValue',
    },
    {
      title: '创建人',
      dataIndex: 'createUser',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: (text, record, index) => `${formateTime(record.createTime)}`,
    },

    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          <span className="operation" onClick={() => _editDialog(record)}>
            编辑
          </span>
          <span className="operation" onClick={() => _delItem(record)}>
            删除
          </span>
        </Space>
      ),
    },
  ]

  /**删除 */
  const _delItem = (record) => {
    Modal.confirm({
      title: '删除内容页？',
      content: '将删除该内容页及其已填写信息内容',
      okText: '确认',
      okType: 'primary',
      cancelText: '返回填写',
      onOk: () => {
        ConfigRefundService.del({ id: record.id }).then((res) => {
          if (res.code === HttpCode.success) {
            loadData(pageIndex)
            message.success('删除成功')
          }
        })
      },
    })
  }
  /**编辑 */
  const _editDialog = (record) => {
    setDialogMode('edit')
    setSelectedData(record)
    setShowDialog(true)
  }

  const onFinish = () => {
    setDialogMode('add')
    setSelectedData(null)
    setShowDialog(true)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
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
    <div className="channel-list">
      <div>
        <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Row gutter={[10, 0]} justify="end">
            <Col>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                    添加
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
          showSizeChanger: false,
          showQuickJumper: true,
          pageSize: pageSize,
          total: total,
        }}
      />
      <AEAddDialog
        data={selectedData}
        mode={dialogMode}
        onSuccess={_onDialogSuccess}
        show={showDialog}
        onClose={_onDialogClose}
      />
    </div>
  )
}

export default RefundReason
