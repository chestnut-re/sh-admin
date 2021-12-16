import React, { useState, useEffect } from 'react'
import { Form, Col, Row, Button, Table, Space } from 'antd'
import './index.less'
import AEBannerDialog, { DialogMode } from './components/AEBannerDialog'
import { BannerService } from '@/service/BannerService'
import { HttpCode } from '@/constants/HttpCode'
// import { format } from 'path'

/**
 * App营销-Banner管理-List
 */
const BannerListPage: React.FC = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState()

  const [showDialog, setShowDialog] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const [dialogMode, setDialogMode] = useState<DialogMode>('add')

  useEffect(() => {
    loadData(pageIndex)
  }, [pageIndex])

  const loadData = (pageIndex) => {
    BannerService.list({ current: pageIndex, size: pageSize }).then((res) => {
      console.log(res)
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
      title: '主题图',
      dataIndex: 'bannerImg',
      render: (text: any, record: any) => <img src={record.bannerImg} alt="" />,
    },
    {
      title: '主题名称',
      dataIndex: 'title',
    },
    {
      title: '链接',
      dataIndex: 'bannerUrl',
    },
    {
      title: '状态',
      dataIndex: 'state',
      render: (text: any, record: any) => {
        if (record.state == 0) {
          return `下线`
        } else {
          return `上线`
        }
      },
    },
    {
      title: '展示时段',
      dataIndex: 'endDate',
      render: (text: any, record: any) => `${record.startDate}~${record.endDate}`,
    },
    {
      title: '剩余展示时长',
      dataIndex: 'startDate',
      render: (text: any, record: any) => {
        const temp = new Date().getTime()
        const end = new Date(record.endDate).getTime()
        const surplus = (end - temp) / 86400000
        return `${date_format(surplus)}`
      },
    },
    {
      title: '添加人',
      dataIndex: 'updateUser',
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
    BannerService.del({ id: record.id }).then((res) => {
      if (res.code === HttpCode.success) {
        loadData(pageIndex)
      }
    })
  }

  /**编辑 */
  const _editDialog = (record) => {
    setDialogMode('edit')
    setSelectedData(record)
    setShowDialog(true)
  }

  /**时间 */
  //时分秒换算
  const date_format = (micro_second) => {
    // 总秒数
    const second = Math.floor(micro_second / 1000)
    // 天数
    const day = Math.floor(second / 3600 / 24)
    // 小时
    const hr = Math.floor((second / 3600) % 24)
    // 分钟
    const min = Math.floor((second / 60) % 60)
    // 秒
    const sec = Math.floor(second % 60)
    return day + '天' + hr + '小时' + min + '分钟' + sec + '秒'
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

  return (
    <div className="channel-list">
      <div>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
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
          showSizeChanger: true,
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
