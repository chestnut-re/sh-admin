import { Space, Table, Tag, Form, Row, Col, Button, Radio } from 'antd'
import React, { useEffect, useState } from 'react'
import { InputTemp, SelectTemp } from '@/components/filter/formItem'
import { ProductionAuditService } from '@/service/ProductionAuditService'
import TimeColumn from '@/components/tableColumn/TimeColumn'
import { ProductionReleaseService } from '@/service/ProductionReleaseService'
import { useHistory } from 'react-router-dom'
import GoodsAuditState from '@/components/tableColumn/GoodsAuditState'

interface Props {
  /**发布，上架 */
  type: 'publish' | 'release'
}

/**
 * 商品管理-商品审核
 */
const AuditScreen: React.FC<Props> = ({ type }) => {
  const history = useHistory()
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState()

  const [checkState, setCheckState] = useState('')

  useEffect(() => {
    loadData(pageIndex)
  }, [pageIndex, checkState])

  const loadData = (pageIndex) => {
    const params = form.getFieldsValue()
    console.log(params)
    if (type === 'publish') {
      ProductionAuditService.list({ current: pageIndex, size: pageSize, checkState, ...params }).then((res) => {
        setData(res.data.records)
        setTotal(res.data.total)
      })
    } else {
      ProductionReleaseService.list({ current: pageIndex, size: pageSize, checkState, ...params }).then((res) => {
        setData(res.data.records)
        setTotal(res.data.total)
      })
    }
  }

  const columns = [
    {
      title: '商品ID',
      dataIndex: 'goodsId',
      // render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '商品名称',
      align: 'center',
      dataIndex: 'goodsName',
    },
    {
      title: '创建人',
      align: 'center',
      dataIndex: 'createUserName',
    },
    {
      title: '创建时间',
      align: 'center',
      render: (text, record, index) => <TimeColumn time={record?.createTime} />,
    },
    {
      title: '审核状态',
      align: 'center',
      render: (text, record, index) => <GoodsAuditState checkState={record?.checkState} />,
    },
    {
      title: '原因',
      align: 'center',
      dataIndex: 'checkMag',
    },
    {
      title: '审核人',
      align: 'center',
      dataIndex: 'checkUserName',
    },
    {
      title: '审核时间',
      align: 'center',
      render: (text, record, index) => <TimeColumn time={record?.checkTime} />,
    },
    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          {record?.checkState !== 0 && (
            <Button
              onClick={() => {
                console.log(record)
                history.push(
                  `/production/production-detail?channelGoodsId=${record.channelGoodsId}&goodsId=${record.goodsId}&id=${record.goodsId}&type=${type}Check`
                )
              }}
            >
              查看
            </Button>
          )}

          {record?.checkState === 0 && (
            <Button
              onClick={() => {
                console.log(record)
                if (type === 'release') {
                  // 上架审核
                  history.push(
                    `/production/production-detail?channelGoodsId=${record.channelGoodsId}&goodsId=${record.goodsId}&id=${record.goodsId}&type=${type}`
                  )
                } else {
                  // 发布审核
                  history.push(
                    `/production/production-detail?channelGoodsId=${record.channelGoodsId}&goodsId=${record.goodsId}&id=${record.goodsId}&type=${type}`
                  )
                }
              }}
            >
              审核
            </Button>
          )}
        </Space>
      ),
    },
  ]

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
    <div className="page-root">
      <div>
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
          {/* checkState 0 待审核 1审核通过 2审核不通过 */}
        </Radio.Group>

        <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} form={form}>
          <Row gutter={[10, 0]}>
            <Col span={2} className="table-from-label">
              商品名称
            </Col>
            <Col span={4}>
              <InputTemp name="keyword" />
            </Col>
            <Form.Item wrapperCol={{ offset: 2, span: 0 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button onClick={resetTable}>重置</Button>
              </Space>
            </Form.Item>
          </Row>
        </Form>
      </div>
      <Table
        rowKey="goodsId"
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
}

export default AuditScreen
