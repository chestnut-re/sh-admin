import { Space, Table, Tag, Form, Row, Col, Button, DatePicker, Input, Image, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import ChannelService from '@/service/ChannelService'
import dayjs from 'dayjs'
import { HttpCode } from '@/constants/HttpCode'
import AEBannerDialog, { DialogMode } from './components/AEBannerDialog'
import { AllocationService } from '@/service/AllocationService'
/**
 * 分类管理
 */

const ListPage: React.FC = () => {
  const [data, setData] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState()

  const [showDialog, setShowDialog] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const [dialogMode, setDialogMode] = useState<DialogMode>('add')
  const [checkStrictly, setCheckStrictly] = React.useState(false)

  useEffect(() => {
    getList(pageIndex)
  }, [pageIndex])

  const getList = (pageIndex) => {
    AllocationService.list({ sortName: '' }).then((res) => {
      setData(res.data)
    })
  }

  const columns = [
    {
      title: '编号',
      dataIndex: 'id',
    },
    {
      title: '商品分类名称',
      dataIndex: 'sortName',
    },
    {
      title: '创建人',
      dataIndex: 'name',
    },
    {
      title: '创建时间',
      dataIndex: 'account',
    },
    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button onClick={() => _editDialog(record)}>编辑</Button>
          <Button>删除</Button>
        </Space>
      ),
    },
  ]

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows)
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows)
    },
  }

  /**编辑 */
  const _editDialog = (record) => {
    setDialogMode('edit')
    setSelectedData(record)
    setShowDialog(true)
  }

  const onFinish = (values: any) => {
    getList(pageIndex)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const _onDialogSuccess = () => {
    setSelectedData(null)
    setShowDialog(false)
    getList(pageIndex)
  }

  const _onDialogClose = () => {
    setSelectedData(null)
    setShowDialog(false)
  }

  const _add = () => {
    setShowDialog(true)
  }
  return (
    <div className="page-root">
      <div style={{ textAlign: 'right', marginBottom: '20px' }}>
        <Button type="primary" onClick={_add}>
          添加商品分类
        </Button>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        scroll={{ x: 'max-content' }}
        rowSelection={{ ...rowSelection, checkStrictly }}
        dataSource={[...data]}
        pagination={{
          onChange: setPageIndex,
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
    </div>
  )
}

export default ListPage
