import React, { useState, useEffect } from 'react'
import { Form, Col, Row, Button, Table, Space, Modal, message } from 'antd'
import './index.less'
import AEBannerDialog, { DialogMode } from './components/AEActivityDialog'
import { ActivitiesService } from '@/service/ActivitiesService'
import { HttpCode } from '@/constants/HttpCode'
import RemainTime from '@/components/tableColumn/RemainTime'
import ImageColumn from '@/components/tableColumn/ImageColumn'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import {status} from './utils'
/**
 * App营销-Activity管理-List
 */
const BannerListPage: React.FC = () => {
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
    ActivitiesService.list({ current: pageIndex, size: pageSize }).then((res) => {
      setData(res.data?.records ?? [])
      setTotal(res.data.total)
    })
  }

  const columns = [
    {
      title: '排序编号',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '主题预览图',
      dataIndex: 'activityImg',
      render: (text: any, record: any) => <ImageColumn url={record.activityImg} />,
    },
    {
      title: '专题页头图',
      dataIndex: 'activityDetailImg',
      render: (text: any, record: any) => <ImageColumn url={record.activityDetailImg} />,
    },
    {
      title: '主题名称',
      dataIndex: 'activityTitle',
    },
    {
      title: '关联商品数量',
      dataIndex: 'goodsIdList',
      render: (text, record, index) => `${(record.goodsIdList ?? '').split(',')?.length}`,
    },
    {
      title: '链接',
      dataIndex: 'activityUrl',
    },
    {
      title: '状态',
      dataIndex: 'state',
      render: (text, record, index) => `${status[record.state]}`,
    },
    {
      title: '展示时段',
      dataIndex: 'endDate',
      render: (text: any, record: any) => `${record.startDate}~${record.endDate}`,
    },
    {
      title: '剩余展示时长',
      dataIndex: 'endDate',
      render: (text: any, record: any) => {
        return <RemainTime endDate={record.endDate} />
      },
    },
    {
      title: '添加人',
      dataIndex: 'updateUserName',
      render: (text: any, record: any) => `${record.createChannelName}-${record.updateUserName}`,
    },
    {
      title: '添加时间',
      dataIndex: 'updateTime',
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
        ActivitiesService.del({ id: record.id }).then((res) => {
          if (res.code === HttpCode.success) {
            loadData(pageIndex)
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
            <Form.Item wrapperCol={{ offset: 1, span: 12 }}>
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
    </div>
  )
}

export default BannerListPage
