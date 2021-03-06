import { Space, Table, Tag, Form, Row, Col, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import AEVersionDialog, { DialogMode } from '../version-c/components/AEVersionDialog'
import { VersionService } from '@/service/VersionService'
import { PlusOutlined } from '@ant-design/icons'

/**
 * 系统中心-版本管理-C端版本管理
 */

const VersionCPage: React.FC = () => {
  const [form] = Form.useForm()
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
    VersionService.list({ current: pageIndex, size: pageSize, platform: 2 }).then((res) => {
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
      title: '版本号',
      dataIndex: 'clientVersionNo',
    },
    {
      title: '版本Code',
      dataIndex: 'minorVersionNo',
    },
    {
      title: '客户端类型',
      dataIndex: 'clientType',
      render: (text: any, record: any) => {
        if (record?.clientType == '1') {
          return 'H5'
        } else if (record?.clientType == '2') {
          return '小程序'
        } else if (record?.clientType == '3') {
          return 'ios手机'
        } else if (record?.clientType == '4') {
          return 'ios_pad'
        } else if (record?.clientType == '5') {
          return '安卓手机'
        } else if (record?.clientType == '6') {
          return '安卓pad'
        }
      },
    },
    {
      title: '下载链接',
      dataIndex: 'fileUrl',
    },
    {
      title: '更多内容',
      dataIndex: 'versionContent',
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
    {
      title: '是否强制更新',
      dataIndex: 'mandatoryUpdate',
      render: (text: any, record: any) => {
        if (record.mandatoryUpdate == 1) {
          return `是`
        } else if (record.mandatoryUpdate == 0) {
          return `否`
        }
      },
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
        </Space>
      ),
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
                  <Button type="primary" icon={<PlusOutlined />} onClick={_addVersion}>
                    添加版本记录
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
          showQuickJumper: true,
          pageSize: pageSize,
          total: total,
        }}
      />

      {showDialog && (
        <AEVersionDialog
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

export default VersionCPage
