import { observer } from 'mobx-react-lite'
import React, { useState, useEffect } from 'react'
import { Button, Col, Form, Row, Space, Table, DatePicker, message } from 'antd'
import { InputTemp } from '@/components/filter/formItem'
import './index.less'
import { ProductionDraftService } from '@/service/ProductionDraftService'
import TimeColumn from '@/components/tableColumn/TimeColumn'
import { formateTime } from '@/utils/timeUtils'
import { useHistory } from 'react-router-dom'
import { ProductionService } from '@/service/ProductionService'

/**
 * 商品库 草稿箱
 */
const DraftListPage: React.FC = observer(() => {
  const history = useHistory()
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState()

  useEffect(() => {
    loadData(pageIndex)
  }, [pageIndex])

  const loadData = (pageIndex) => {
    const params = form.getFieldsValue()
    const { timeRange, remain } = params

    ProductionDraftService.list({
      current: pageIndex,
      size: pageSize,
      ...remain,
      createDateEnd: formateTime(timeRange?.[0]),
      createDateStart: formateTime(timeRange?.[1]),
    }).then((res) => {
      setData(res.data.records)
      setTotal(res.data.total)
    })
  }

  const columns = [
    {
      title: '商品ID',
      dataIndex: 'goodsNo',
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
    },
    {
      title: '创建人',
      dataIndex: 'createUserName',
    },
    {
      title: '创建时间',
      render: (text, record, index) => <TimeColumn time={record?.createTime} />,
    },
    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button
            onClick={() => {
              console.log(record)
              history.push(`/production/release-product?id=${record.id}`)
            }}
          >
            编辑
          </Button>
          <Button
            onClick={() => {
              ProductionService.del({ id: record.id }).then((res) => {
                if (res.code === '200') {
                  message.success('删除成功')
                }
              })
            }}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ]

  /**分页 */
  const onPaginationChange = (page: number, pageSize: number) => {
    setPageIndex(page)
    setPageSize(pageSize)
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

  return (
    <div className="DraftListPage__root">
      <div>
        <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} form={form}>
          <Row gutter={[5, 0]} style={{ paddingLeft: '10px' }}>
            <Col span={6}>
              <InputTemp name="keyword" placeholder="商ID/名称" />
            </Col>
            <Col span={2} className="table-from-label">
              创建时间
            </Col>
            <Col span={12}>
              <Form.Item wrapperCol={{ offset: 0, span: 0 }} name="timeRange">
                <DatePicker.RangePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" />
              </Form.Item>
            </Col>
            <Form.Item wrapperCol={{ offset: 2, span: 0 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button onClick={resetTable} htmlType="button">
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
    </div>
  )
})

export default DraftListPage
