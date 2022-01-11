/*
 * @Description: 活动审核
 * @LastEditTime: 2022-01-11 11:37:28
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
  const [deShowDialog, setDeShowDialog] = useState(false)
  const [ActRecord, setActRecord] = useState('')
  const [showType, setShowType] = useState('')
  useEffect(() => {
    loadData(pageIndex)
  }, [pageIndex])

  const loadData = (pageIndex) => {
    const params = form.getFieldsValue()
    rebateService.list({ current: pageIndex, size: pageSize, ...params, auditResult: checkState }).then((res) => {
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
      dataIndex: 'rebateName',
    },
    {
      title: '创建人',
      dataIndex: 'createUserName',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
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
      title: '驳回原因',
      dataIndex: 'refuseReason',
    },
    {
      title: '审核人',
      dataIndex: 'auditUserName',
    },
    {
      title: '审核时间',
      dataIndex: 'auditTime',
    },
    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setDeShowDialog(true)
              setActRecord(JSON.stringify(record))
              setShowType('show')
            }}
          >
            查看
          </Button>
          <Button
            onClick={() => {
              setDeShowDialog(true)
              setActRecord(JSON.stringify(record))
              setShowType('update')
            }}
          >
            审核
          </Button>
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
                  loadData(pageIndex)
                }}
              >
                <Radio.Button value="">全部</Radio.Button>
                <Radio.Button value="0">待审核</Radio.Button>
                <Radio.Button value="1">通过</Radio.Button>
                <Radio.Button value="2">驳回</Radio.Button>
              </Radio.Group>
            </Col>

            <Col span={3}>
              <InputTemp name="idOrName" placeholder="清单ID/清单名称" />
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
        data={() => <ShowReviewActivity data={ActRecord} showType={showType}></ShowReviewActivity>}
        // data={() => <ShowRefund data={selectedData} editGo={_editGo}></ShowRefund>}
      ></DEDialog>
    </div>
  )
}

export default ReviewActivity
