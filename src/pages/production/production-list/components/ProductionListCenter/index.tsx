import { observer } from 'mobx-react-lite'
import React, { useState, useEffect } from 'react'
import { Button, Col, Form, message, Row, Space, Table } from 'antd'
import { InputTemp, SubCenterProductionState, TravelMode } from '@/components/filter/formItem'
import './index.less'
import { ProductionListService } from '@/service/ProductionListService'
import TimeColumn from '@/components/tableColumn/TimeColumn'
import TravelModeColumn from '@/components/tableColumn/TravelModeColumn'
import { useHistory } from 'react-router-dom'
import { ProductionService } from '@/service/ProductionService'
import NewPrice from '@/components/tableColumn/NewPrice'
import { PlusOutlined } from '@ant-design/icons'

/**
 * 商品库 分中心
 */
const ProductionListCenter: React.FC<any> = observer(({}) => {
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
    ProductionListService.list({ current: pageIndex, size: pageSize, ...params }).then((res) => {
      setData(res.data.records)
      setTotal(res.data.total)
    })
  }

  const columns = [
    {
      title: '商品ID',
      dataIndex: 'id',
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      width: 150,
    },
    {
      title: '商品分类',
      dataIndex: 'goodsTypeTag',
      width: 100,
    },
    {
      title: '出行类型',
      width: 100,
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
      render: (text, record, index) => <NewPrice money={record?.personCurrentPrice} />,
    },
    {
      title: '累计销量',
      dataIndex: 'num',
    },
    {
      title: '营销活动',
      dataIndex: '',
    },
    {
      title: '状态',
      dataIndex: 'state',
      render: (text, record, index) => {
        const str = record.channelGoodsState == 2 ? '已上架' : '未上架'
        return <>{str}</>
      },
    },
    {
      title: '创建渠道',
      dataIndex: 'createChannelName',
    },
    {
      title: '创建时间',
      render: (text, record, index) => <TimeColumn time={record?.updateTime} />,
    },
    {
      title: '操作',
      fixed: 'right',
      render: (text: any, record: any) => (
        <Space size="middle">
          <span
            className="operation"
            onClick={() => {
              history.push(
                `/production/production-detail?channelGoodsId=${record.channelGoodsId}&id=${record.id}&type=detailList`
              )
            }}
          >
            查看
          </span>
          {record?.channelGoodsState !== 2 && (
            <span
              className="operation"
              onClick={() => {
                history.push(`/production/production-detail?id=${record.id}&type=centerPublish`)
              }}
            >
              上架
            </span>
          )}
          {record?.channelGoodsState === 2 && (
            <span
              className="operation"
              onClick={() => {
                ProductionService.soldOutByChannel({ goodsId: record.id }).then((res) => {
                  if (res.code === '200') {
                    message.success('下架成功')
                    loadData(pageIndex)
                  } else {
                    message.error(res.msg)
                  }
                })
              }}
            >
              下架
            </span>
          )}
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

  /**添加商品 */
  const _addProduction = () => {
    history.push('/production/release-product')
  }

  return (
    <div className="ProductionListCenter__root">
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
            <Col span={2} className="table-from-label">
              状态
            </Col>
            <Col span={4}>
              <SubCenterProductionState name="channelGoodsState" />
            </Col>
            <Col span={4}>
              <Form.Item>
                <Space>
                  <Button htmlType="submit">查询</Button>
                  <Button onClick={resetTable} htmlType="button">
                    重置
                  </Button>
                </Space>
              </Form.Item>
            </Col>
            <Col span={4} style={{ textAlign: 'right' }}>
              <Form.Item>
                <Space>
                  <Button type="primary" icon={<PlusOutlined />} htmlType="button" onClick={_addProduction}>
                    添加商品
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
    </div>
  )
})

export default ProductionListCenter
