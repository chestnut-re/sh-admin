import { observer } from 'mobx-react-lite'
import React, { useState, useEffect } from 'react'
import { Button, Col, Form, Row, Space, Table } from 'antd'
import { InputTemp, ProductionState, TravelMode } from '@/components/filter/formItem'
import './index.less'
import { ProductionListService } from '@/service/ProductionListService'
import TimeColumn from '@/components/tableColumn/TimeColumn'
import TravelModeColumn from '@/components/tableColumn/TravelModeColumn'

interface Props {
  /**普通，待发布 */
  type: 'normal' | 'unRelease'
}

/**
 * 商品库
 */
const ProductionListPage: React.FC<Props> = observer(({ type }) => {
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
    let obj = {}
    if (type === 'unRelease') {
      obj = { state: 1 }
    }
    ProductionListService.list({ current: pageIndex, size: pageSize, ...params, ...obj }).then((res) => {
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
      title: '商品类型标签',
      dataIndex: 'goodsTypeTag',
    },
    {
      title: '出行类型',
      render: (text, record, index) => <TravelModeColumn travelMode={record?.travelMode} />,
    },
    {
      title: '始发地',
      dataIndex: 'departureCity',
    },
    {
      title: '最近出发时间',
      render: (text, record, index) => <TimeColumn time={record?.startDate} />,
    },
    {
      title: '库存',
      dataIndex: 'stock',
    },
    {
      title: '现售价(¥)',
      dataIndex: 'personCurrentPrice',
    },
    {
      title: '累计销量',
      dataIndex: 'num',
    },
    {
      title: '已上架渠道',
      dataIndex: 'putawayChannelNum',
    },
    {
      title: '状态',
      dataIndex: 'activityState',
    },
    {
      title: '创建渠道',
      dataIndex: 'createChannelName',
    },
    {
      title: '创建时间',
      render: (text, record, index) => <TimeColumn time={record?.createTime} />,
    },
    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button>查看</Button>
          <Button>编辑</Button>
        </Space>
      ),
    },
  ]

  /**待发布商品库 */
  const columnsUnRelease = [
    {
      title: '商品ID',
      dataIndex: 'goodsNo',
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
    },
    {
      title: '商品类型标签',
      dataIndex: 'goodsTypeTag',
    },
    {
      title: '出行类型',
      render: (text, record, index) => <TravelModeColumn travelMode={record?.travelMode} />,
    },
    {
      title: '始发地',
      dataIndex: 'departureCity',
    },
    {
      title: '最近出发时间',
      render: (text, record, index) => <TimeColumn time={record?.startDate} />,
    },
    {
      title: '库存',
      dataIndex: 'stock',
    },
    {
      title: '现售价(¥)',
      dataIndex: 'personCurrentPrice',
    },
    {
      title: '创建渠道',
      dataIndex: 'time',
    },
    {
      title: '创建时间',
      dataIndex: 'methods',
    },
    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button>查看</Button>
          <Button>编辑</Button>
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
    <div className="ProductionListPage__root">
      <div>
        <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} form={form}>
          <Row gutter={[5, 0]} style={{ paddingLeft: '10px' }}>
            <Col span={6}>
              <InputTemp name="searchDim" placeholder="商品ID/名称/始发地" />
            </Col>
            <Col span={2} className="table-from-label">
              出行类型
            </Col>
            <Col span={4}>
              <TravelMode name="travelMode" />
            </Col>
            {type !== 'unRelease' && (
              <>
                <Col span={2} className="table-from-label">
                  状态
                </Col>
                <Col span={4}>
                  <ProductionState name="state" />
                </Col>
              </>
            )}

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
          <Row justify="end">
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="button">
                  添加商品
                </Button>
                <Button htmlType="button" type="primary">
                  下架
                </Button>
              </Space>
            </Form.Item>
          </Row>
        </Form>
      </div>
      <Table
        rowKey="id"
        columns={type === 'unRelease' ? columnsUnRelease : columns}
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

export default ProductionListPage
