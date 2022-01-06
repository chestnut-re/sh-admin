import { Space, Table, Tag, Form, Row, Col, Button, Checkbox } from 'antd'
import React, { useEffect, useState } from 'react'
import AEVersionDialog, { DialogMode } from './components/AEVersionDialog'
import { VersionService } from '@/service/VersionService'

/**
 * 系统中心-版本管理-C端版本管理
 */

const TemplateCPage: React.FC = () => {
  const [form] = Form.useForm()
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
    // VersionService.list({ searchCount: pageIndex, size: pageSize, platform: 2 }).then((res) => {
    //   setData(res.data.records)
    //   setTotal(res.data.total)
    // })
  }

  const data = [
    {
      clientVersionNo: '订单创建时',
    },
  ]

  const columns = [
    {
      title: '序号',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '消息类型',
      dataIndex: 'clientVersionNo',
    },
    {
      title: '站内消息',
      dataIndex: 'fileUrl',
      render: (text: any, record: any) => {
        return (
          <Space>
            <Checkbox>是否发送</Checkbox>
            <Button>编辑内容</Button>
            <Button>查看内容</Button>
          </Space>
        )
      },
    },
    {
      title: '手机短信',
      dataIndex: 'versionContent',
      render: (text: any, record: any) => {
        return (
          <Space>
            <Checkbox>是否发送</Checkbox>
            <Button>编辑内容</Button>
            <Button>查看内容</Button>
          </Space>
        )
      },
    },
    {
      title: 'APP消息推送',
      dataIndex: 'remark',
      render: (text: any, record: any) => {
        return (
          <Space>
            <Checkbox>是否发送</Checkbox>
            <Button>编辑内容</Button>
            <Button>查看内容</Button>
          </Space>
        )
      },
    },
  ]

  /**编辑 */
  const _editDialog = (record) => {
    setDialogMode('edit')
    setSelectedData(record)
    setShowDialog(true)
  }

  const onFinish = (values: any) => {
    setShowDialog(true)
    setDialogMode('add')
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
  const _addVersion = () => {
    setDialogMode('add')
    setShowDialog(true)
  }
  return (
    <div className="page-root">
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
      <AEVersionDialog
        data={selectedData}
        mode={dialogMode}
        onSuccess={_onDialogSuccess}
        show={showDialog}
        onClose={_onDialogClose}
      />
    </div>
  )
}

export default TemplateCPage
