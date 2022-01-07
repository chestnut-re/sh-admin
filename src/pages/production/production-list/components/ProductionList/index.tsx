import { observer } from 'mobx-react-lite'
import React, { useState, useEffect } from 'react'
import { Button, Col, Form, Row, Space, Table } from 'antd'
import { InputTemp, ProductionState, TravelMode } from '@/components/filter/formItem'
import './index.less'
import { ProductionListService } from '@/service/ProductionListService'
import TimeColumn from '@/components/tableColumn/TimeColumn'
import TravelModeColumn from '@/components/tableColumn/TravelModeColumn'
import { useHistory } from 'react-router-dom'
import { ProductionService } from '@/service/ProductionService'
import GoodsState from '@/components/tableColumn/GoodsState'
import ChannelDialog from './components/ChannelDialog'

/**
 * 商品库 总部
 */
const ProductionList: React.FC<any> = observer(({}) => {
  const history = useHistory()
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState()

  const [showDialog, setShowDialog] = useState(false)
  const [selectedData, setSelectedData] = useState<any>(null)

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
      title: '商品类型标签',
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
      dataIndex: 'personCurrentPrice',
    },
    {
      title: '累计销量',
      dataIndex: 'num',
    },
    {
      title: '已上架渠道',
      render: (text, record, index) => {
        return (
          <Button
            onClick={() => {
              setSelectedData(record)
              setShowDialog(true)
            }}
          >
            {record.putawayChannelNum} 0
          </Button>
        )
      },
    },
    {
      title: '状态',
      dataIndex: 'state',
      render: (text, record, index) => <GoodsState state={record?.state} />,
    },
    {
      title: '创建渠道',
      dataIndex: 'createChannelName',
    },
    {
      title: '创建时间',
      render: (text, record, index) => <TimeColumn time={record?.updateDate} />,
    },
    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button
            onClick={() => {
              history.push(
                `/production/production-detail?channelGoodsId=${record.channelGoodsId}&id=${record.id}&type=detailList`
              )
            }}
          >
            查看
          </Button>
          <Button
            onClick={() => {
              // ProductionService.ban(record.id).then((res) => {
              //   if (res.code === '200') {
              //     loadData(pageIndex)
              //   }
              // })
            }}
          >
            禁用
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

  /**添加商品 */
  const _addProduction = () => {
    history.push('/production/release-product')
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

  return (
    <div className="ProductionList__root">
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
              <ProductionState name="state" />
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
          <Row justify="end">
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="button" onClick={_addProduction}>
                  添加商品
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

      <ChannelDialog
        id={selectedData?.id}
        goodsName={selectedData?.goodsName}
        show={showDialog}
        onSuccess={_onDialogSuccess}
        onClose={_onDialogClose}
      />
    </div>
  )
})

export default ProductionList
