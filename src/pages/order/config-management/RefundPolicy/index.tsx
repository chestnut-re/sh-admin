/*
 * @Description:退改政策
 * @LastEditTime: 2022-01-06 18:43:02
 */
import React, { useState, useEffect } from 'react'
import { Form, Col, Row, Button, Table, Space, Modal, message } from 'antd'
import './index.less'
import AEAddDialog, { DialogMode } from './components/AEAddDialog'
import { ConfigManagementService } from '@/service/OrderService'
import { HttpCode } from '@/constants/HttpCode'
import RemainTime from '@/components/tableColumn/RemainTime'
import ImageColumn from '@/components/tableColumn/ImageColumn'
import { ExclamationCircleOutlined } from '@ant-design/icons'

const RefundPolicyPage: React.FC = () => {
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
    ConfigManagementService.list({ current: pageIndex, size: pageSize }).then((res) => {
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
      dataIndex: 'policyName',
    },
    {
      title: '创建人',
      dataIndex: 'createUser',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },

    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button onClick={() => _editDialog(record)}>编辑</Button>
          <Button onClick={() => _delItem(record)}>删除</Button>
        </Space>
      ),
    },
  ]

  /**删除 */
  const _delItem = (record) => {
    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '确定要删除当前',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        ConfigManagementService.del({ id: record.id }).then((res) => {
          if (res.code === HttpCode.success) {
            loadData(pageIndex)
          } else {
            message.error(res.message)
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
          <Row gutter={[10, 0]}>
            <Form.Item wrapperCol={{ offset: 2, span: 0 }}>
              <Space>
                <Button type="primary" htmlType="submit">
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

export default RefundPolicyPage