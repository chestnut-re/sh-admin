import React, { useState, useEffect } from 'react'
import { Form, Col, Row, Button, Table, Space, Modal } from 'antd'
import './index.less'
import AEBannerDialog, { DialogMode } from './components/AEBannerDialog'
import { BannerService } from '@/service/BannerService'
import { HttpCode } from '@/constants/HttpCode'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import ImageColumn from '@/components/tableColumn/ImageColumn'
import RemainTime from '@/components/tableColumn/RemainTime'
import { PlusOutlined } from '@ant-design/icons'

/**
 * App营销-Banner管理-List
 */
const BannerListPage: React.FC = () => {
  dayjs.extend(duration)
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState()
  const [visible, setVisible] = useState(false)

  const [showDialog, setShowDialog] = useState(false)
  const [selectedData, setSelectedData] = useState<any>()
  const [dialogMode, setDialogMode] = useState<DialogMode>('add')

  useEffect(() => {
    loadData(pageIndex)
  }, [pageIndex])

  const loadData = (pageIndex) => {
    BannerService.list({ current: pageIndex, size: pageSize }).then((res) => {
      console.log(res)
      setData(res.data?.records ?? [])
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
      render: (text: any, record: any) => <ImageColumn url={record.bannerImg} />,
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
        } else if (record.state == 1) {
          return `待上线`
        } else if (record.state == 2) {
          return `上线`
        }
      },
    },
    {
      title: '展示排序',
      dataIndex: 'sort',
    },
    {
      title: '展示时段',
      dataIndex: 'endDate',
      render: (text: any, record: any) => `${record.startDate}~${record.endDate}`,
      // render: (text: any, record: any) =>
      //   record.startDate && record.endDate
      //     ? `${dayjs(record.startDate.split('+')[0]).format('YYYY-MM-DD HH:mm:ss')}~${dayjs(
      //         record.endDate.split('+')[0]
      //       ).format('YYYY-MM-DD HH:mm:ss')}`
      //     : null,
    },
    {
      title: '剩余展示时长',
      dataIndex: 'remainingDisplayTime',
      // render: (text: any, record: any) => {
      //   return <RemainTime endDate={record.endDate} />
      // },
    },
    {
      title: '添加人',
      dataIndex: 'updateUserName',
    },
    {
      title: '添加时间',
      dataIndex: 'updateTime',
    },
    {
      title: '操作',
      fixed: 'right',
      render: (text: any, record: any) => (
        <Space size="middle">
          <span className="operation" onClick={() => _editDialog(record)}>
            编辑
          </span>
          <span className="operation" onClick={() => _delete(record)}>
            删除
          </span>
        </Space>
      ),
    },
  ]

  /**删除 */
  const _delItem = () => {
    if (!selectedData) return
    BannerService.del({ id: selectedData.id }).then((res) => {
      if (res.code === HttpCode.success) {
        loadData(pageIndex)
        setVisible(false)
      }
    })
  }

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

  const onPaginationChange = (page: number, pageSize: number) => {
    setPageIndex(page)
    setPageSize(pageSize)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const _delete = (record) => {
    setVisible(true)
    setSelectedData(record)
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
          <Row gutter={[10, 0]} justify="end">
            <Col>
              <Form.Item>
                <Space>
                  <Button type="primary" icon={<PlusOutlined />} htmlType="submit">
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
          onChange: onPaginationChange,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSize: pageSize,
          total: total,
        }}
      />
      {showDialog && (
        <AEBannerDialog
          data={selectedData}
          mode={dialogMode}
          onSuccess={_onDialogSuccess}
          show={showDialog}
          onClose={_onDialogClose}
        />
      )}

      <Modal title="提示" visible={visible} okText="确认删除" cancelText="取消" onOk={_delItem} onCancel={handleCancel}>
        <span>是否确认删除?</span>
      </Modal>
    </div>
  )
}

export default BannerListPage
