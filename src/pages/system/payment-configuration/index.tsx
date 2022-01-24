import React, { useState, useEffect } from 'react'
import './index.less'
import { Button, Table, Space } from 'antd'
import AEPaymentDialog, { DialogMode } from './components/AEPaymentDialog'
/**
 * 支付配置
 */
const PaymentConfigurationPage: React.FC = () => {
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
    // AdminService.list({ current: pageIndex, pageSize: pageSize }).then((res) => {
    //   console.log(res)
    //   setData(res.data.records)
    //   setTotal(res.data.total)
    // })
  }
  const columns = [
    {
      title: '序号',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '模版名称',
      dataIndex: 'nickName',
    },
    {
      title: '支付类型',
      dataIndex: 'mobile',
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
      title: '渠道',
      dataIndex: 'roleName',
    },
    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          <span className="operation" onClick={() => _editDialog(record)}>
            编辑
          </span>
          <span className="operation">删除</span>
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
  const _addAdmin = () => {
    setDialogMode('add')
    setShowDialog(true)
  }
  return (
    <div className="pay__root">
      <div className="pay-header">
        <span className="header-title">支付配置</span>
        <Button type="primary" onClick={_addAdmin}>
          创建
        </Button>
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
      {showDialog && (
        <AEPaymentDialog
          data={selectedData}
          mode={dialogMode}
          onSuccess={_onDialogSuccess}
          show={showDialog}
          onClose={_onDialogClose}
        />
      )}
    </div>
  )
}
export default PaymentConfigurationPage
