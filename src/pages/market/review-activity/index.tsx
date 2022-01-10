/*
 * @Description: 活动审核
 * @LastEditTime: 2022-01-10 11:20:06
 */
import React, { useState, useEffect } from 'react'
import { Form, Col, Row, Button, Table, Space, Radio } from 'antd'
import './index.less'
import { InputTemp } from '@/components/filter/formItem'
import { rebateService } from '@/service/marketService'
import DEDialog from '@/components/components/Dedialog'
import ShowReviewActivity from './components/ShowReviewActivity'
const ReviewActivity: React.FC = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState()
  const [checkState, setCheckState] = useState('')
  const [deShowDialog, setDeShowDialog] = useState(true)
  const [dialogMode, setDialogMode] = useState('add')
  useEffect(() => {
    form.setFieldsValue({
      rebateId: '1478979552465346560',
    })
    loadData(pageIndex)
  }, [pageIndex])

  const loadData = (pageIndex) => {
    const params = form.getFieldsValue()
    rebateService.list({ current: pageIndex, size: pageSize, ...params }).then((res) => {
      setData(res.data.records)
      setTotal(res.data.total)
    })
  }

  const columns = [
    {
      title: '活动ID',
      render: (text, record, index) => `${index + 1}`,
    },

    {
      title: '活动名称',
      dataIndex: 'planName',
    },
    {
      title: '创建人',
      dataIndex: 'planName',
    },
    {
      title: '创建时间',
      dataIndex: 'planName',
    },
    {
      title: '活动名称',
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
      title: '审核人',
      dataIndex: 'bannerUrl',
    },
    {
      title: '审核时间',
      dataIndex: 'bannerUrl',
    },
    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button onClick={() => _editDialog(record)}>查看</Button>
          <Button onClick={() => _editDialog(record)}>审核</Button>
        </Space>
      ),
    },
  ]

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

  const onPaginationChange = (page: number, pageSize: number) => {
    setPageIndex(page)
    setPageSize(pageSize)
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
              <InputTemp name="rebateId" placeholder="清单ID/清单名称" />
            </Col>
            <Form.Item wrapperCol={{ offset: 2, span: 0 }}>
              <Space>
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
          showSizeChanger: false,
          showQuickJumper: true,
          pageSize: pageSize,
          total: total,
        }}
      />

      <DEDialog
        show={deShowDialog}
        onChange={() => setDeShowDialog(false)}
        data={() => <ShowReviewActivity></ShowReviewActivity>}
        // data={() => <ShowRefund data={selectedData} editGo={_editGo}></ShowRefund>}
      ></DEDialog>
    </div>
  )
}

export default ReviewActivity
