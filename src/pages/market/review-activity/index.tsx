/*
 * @Description: 活动审核
 * @LastEditTime: 2022-01-05 18:18:02
 */
import React, { useState, useEffect } from 'react'
import { Form, Col, Row, Button, Table, Space, Radio, DatePicker } from 'antd'
import './index.less'
import { HttpCode } from '@/constants/HttpCode'
import AEDialog, { DialogMode } from './components/AEDialog'
import { InputTemp, StatusRoute } from '@/components/filter/formItem'
import { ProductionCommission } from '@/service/ProductionCommission'
import TimeColumn from '@/components/tableColumn/TimeColumn'
import DEDialog from './components/DEDialog'
const ReviewActivity: React.FC = () => {
  const { RangePicker } = DatePicker
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState()
  const [checkState, setCheckState] = useState('')
  const [showDialog, setShowDialog] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const [dialogMode, setDialogMode] = useState<DialogMode>('add')
  const [deShowDialog, setDeShowDialog] = useState(false)
  useEffect(() => {
    loadData(pageIndex)
  }, [pageIndex])

  const loadData = (pageIndex) => {
    const params = form.getFieldsValue()
    console.log(params)

    ProductionCommission.list({ current: pageIndex, size: pageSize, ...params }).then((res) => {
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
      title: '方案名称',
      dataIndex: 'planName',
    },
    {
      title: '状态',
      dataIndex: 'state',
      render: (text: any, record: any) => {
        if (record.state == 0) {
          return `未使用`
        } else if (record.state == 1) {
          return `使用中`
        }
      },
    },
    {
      title: '现关联商品量',
      dataIndex: 'bannerUrl',
    },
    {
      title: '关联分中心',
      dataIndex: 'bannerUrl',
    },
    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button onClick={() => _editDialog(record)}>查看详情</Button>
          {/* <Button onClick={() => _delItem(record)}>删除</Button> */}
        </Space>
      ),
    },
  ]

  /**删除 */
  const _delItem = (record) => {
    ProductionCommission.del({ id: record.id }).then((res) => {
      if (res.code === HttpCode.success) {
        loadData(pageIndex)
      }
    })
  }

  /**编辑 */
  const _editDialog = (record) => {
    setDeShowDialog(true)
    // setDialogMode('edit')
    setSelectedData(record)
    // setShowDialog(true)
  }

  /**添加 */
  const showAdd = () => {
    setShowDialog(true)
    setDialogMode('add')
  }

  /**筛选 */
  const onFinish = () => {
    setPageIndex(1)
    loadData(1)
  }

  /**重置 */
  const resetTable = () => {
    form.resetFields()
    setPageIndex(1)
    loadData(1)
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
  const onCloseDetail = () => {
    setDeShowDialog(false)
  }
  return (
    <div className="rebateActivity__root">
      <div>
        <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} form={form}>
          <Row gutter={[10, 10]}>
            <Col span={1} className="table-from-label"></Col>
            <Col span={3}>
              <Radio.Group
                value={checkState}
                onChange={(value) => {
                  setCheckState(value.target.value)
                }}
              >
                <Radio.Button value="">全部</Radio.Button>
                <Radio.Button value="0">待审核</Radio.Button>
                <Radio.Button value="1">通过</Radio.Button>
                <Radio.Button value="2">驳回</Radio.Button>
              </Radio.Group>
            </Col>

            <Col span={3}>
              <InputTemp name="planName" placeholder="清单ID/清单名称" />
            </Col>
         
            <Col span={1} className="table-from-label">
              状态
            </Col>
            <Col span={3}>
              <StatusRoute name="state" />
            </Col>

            <Form.Item wrapperCol={{ offset: 2, span: 0 }}>
              <Space>
                <Button type="primary" onClick={showAdd}>
                  添加
                </Button>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button type="primary" onClick={resetTable}>
                  重置
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
          onChange: onPaginationChange,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSize: pageSize,
          total: total,
        }}
      />
      <AEDialog
        data={selectedData}
        mode={dialogMode}
        onSuccess={_onDialogSuccess}
        show={showDialog}
        onClose={_onDialogClose}
      />
      <DEDialog show={deShowDialog} onClose={onCloseDetail}>
        {' '}
      </DEDialog>
    </div>
  )
}

export default ReviewActivity
