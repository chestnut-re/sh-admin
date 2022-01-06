/*
 * @Description: 任务清单
 * @LastEditTime: 2022-01-06 17:17:17
 */
import React, { useState, useEffect } from 'react'
import { Form, Col, Row, Button, Table, Space, Modal, message } from 'antd'
import './index.less'
import AEBannerDialog, { DialogMode } from './components/AETaskDialog'
import { taskService } from '@/service/marketService'
import { HttpCode } from '@/constants/HttpCode'
import RemainTime from '@/components/tableColumn/RemainTime'
import ImageColumn from '@/components/tableColumn/ImageColumn'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import DEDialog from '../rebate-activity/components/DEDialog'
const TaskListPage: React.FC = () => {
  const [data, setData] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [total, setTotal] = useState()
  const [showDialog, setShowDialog] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const [dialogMode, setDialogMode] = useState<DialogMode>('add')
  const [deShowDialog, setDeShowDialog] = useState(false)
  useEffect(() => {
    loadData(pageIndex)
  }, [pageIndex])

  const loadData = (pageIndex) => {
    taskService.list({ current: pageIndex, size: pageSize }).then((res) => {
      setData(res.data.records)
      setTotal(res.data.total)
    })
  }

  const columns = [
    {
      title: '清单ID',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '清单名称',
      dataIndex: 'name',
      render: (text: any, record: any) => <ImageColumn url={record.activityImg} />,
    },
    {
      title: '关联商品数量',
      dataIndex: 'activityDetailImg',
      render: (text: any, record: any) => `${record.taskInventoryGood.length}`,
    },
    {
      title: '状态',
      dataIndex: 'activityTitle',
      render: (text: any, record: any) => `${record.state == 0 ? '启用' : '禁用'}`,
    },

    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setDeShowDialog(!deShowDialog)
              setSelectedData(record)
            }}
          >
            查看
          </Button>
          <Button onClick={() => _editState(record)}>{record.state != 0 ? '启用' : '禁用'}</Button>
          <Button onClick={() => _delItem(record)}>删除</Button>
        </Space>
      ),
    },
  ]
  const _editState = (record) => {
    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '确定要改变当前状态吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        taskService.editState({ id: record.id, state: record.state == 0 ? 1 : 0 }).then((res) => {
          if (res.code === HttpCode.success) {
            loadData(pageIndex)
          } else {
            message.error(res.message)
          }
        })
      },
    })
  }
  /**删除 */
  const _delItem = (record) => {
    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '确定要删除当前',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        taskService.del({ id: record.id }).then((res) => {
          if (res.code === HttpCode.success) {
            message.success('删除成功了')
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
    // setShowDialog(true)
  }

  const onFinish = () => {
    setDialogMode('add')
    setSelectedData(null)
    // setShowDialog(true)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const _onDialogSuccess = () => {
    setSelectedData(null)
    // setShowDialog(false)
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
      <AEBannerDialog
        data={selectedData}
        mode={dialogMode}
        onSuccess={_onDialogSuccess}
        show={showDialog}
        onClose={_onDialogClose}
      />
      <DEDialog show={deShowDialog} data={selectedData}></DEDialog>
    </div>
  )
}

export default TaskListPage