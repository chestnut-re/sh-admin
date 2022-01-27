/*
 * @Description: 活动审核
 * @LastEditTime: 2022-01-26 16:53:14
 */
import React, { useState, useEffect } from 'react'
import { Form, Col, Row, Button, Table, Space, Radio,Select } from 'antd'
import './index.less'
import { InputTemp } from '@/components/filter/formItem'
import { rebateService } from '@/service/marketService'
import DEDialog from '@/components/components/Dedialog'
import ShowReviewActivity from './components/ShowReviewActivity'
import dayjs from 'dayjs'
const ReviewActivity: React.FC = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState()
  const [checkState, setCheckState] = useState(undefined)
  const [deShowDialog, setDeShowDialog] = useState(false)
  const [ActRecord, setActRecord] = useState('')
  const [showType, setShowType] = useState('')
  useEffect(() => {
    loadData(pageIndex)
  }, [pageIndex])
const enumState = {
  0:'全部',
  1:'商品',
  2:'清单'
}
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
      dataIndex: 'rebateName',
    },
    {
      title: '创建人',
      dataIndex: 'createUserName',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: (text: any, record) => `${dayjs(record?.createTime).format('YYYY-MM-DD HH:mm:ss')}`,
    },
    {
      title: '审核内容',
      render: (text: any, record) => `${record?.type=='1'?'商品':'清单'}`,
    },
    {
      title: '状态',
      dataIndex: 'state',
      render: (text: any, record: any) => {
        if (record.auditResult == 0) {
          return `待审核`
        } else if (record.auditResult == 1) {
          return `审核通过`
        } else if (record.auditResult == 2) {
          return `驳回`
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
      fixed: 'right',
      render: (text: any, record: any) => (
        <Space size="middle">
          {record.auditResult == 0 ? (
            <span
              className="operation"
              onClick={() => {
                setDeShowDialog(true)
                setActRecord(JSON.stringify(record))
                setShowType('update')
              }}
            >
              审核
            </span>
          ) : (
            <span
              className="operation"
              onClick={() => {
                setDeShowDialog(true)
                setActRecord(JSON.stringify(record))
                setShowType('show')
              }}
            >
              查看
            </span>
          )}
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
        <Form name="basic" initialValues={{ auditResult: undefined, type: '0' }}  onFinish={onFinish} form={form}>
          <Row gutter={[20, 10]}>
            <Col  className="table-from-label"></Col>
            <Col >
              <Form.Item label="" name="auditResult">
                <Radio.Group
                  value={checkState}
                  onChange={(value) => {
                    setCheckState(value.target.value)
                    loadData(pageIndex)
                  }}
                >
                  <Radio.Button value={undefined}>全部</Radio.Button>
                  <Radio.Button value="0">待审核</Radio.Button>
                  <Radio.Button value="1">通过</Radio.Button>
                  <Radio.Button value="2">驳回</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col >
              <InputTemp name="idOrName" placeholder="清单ID/清单名称" />
            </Col>
            <Col  className="table-from-label">
              状态
            </Col>
            <Col span={2}>
              <Form.Item name="type">
                <Select allowClear>
                  {Object.keys(enumState)
                    .sort()
                    .map((item) => {
                      return (
                        <Select.Option key={item} value={item}>
                          {enumState[item]}
                        </Select.Option>
                      )
                    })}
                </Select>
              </Form.Item>
            </Col>

            <Form.Item wrapperCol={{ offset: 1, span: 12 }}>
              <Space>
                <Button htmlType="submit">查询</Button>
                <Button onClick={resetTable}>重置</Button>
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
        data={() => (
          <ShowReviewActivity
            data={ActRecord}
            onSuccess={() => {
              loadData(pageIndex)
              setDeShowDialog(false)
            }}
            showType={showType}
          ></ShowReviewActivity>
        )}
        // data={() => <ShowRefund data={selectedData} editGo={_editGo}></ShowRefund>}
      ></DEDialog>
    </div>
  )
}

export default ReviewActivity
