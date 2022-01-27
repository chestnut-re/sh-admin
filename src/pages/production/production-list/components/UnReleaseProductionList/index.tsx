import { observer } from 'mobx-react-lite'
import React, { useState, useEffect } from 'react'
import { Button, Col, Form, Row, Space, Table } from 'antd'
import { InputTemp, TravelMode } from '@/components/filter/formItem'
import './index.less'
import { ProductionListService } from '@/service/ProductionListService'
import TimeColumn from '@/components/tableColumn/TimeColumn'
import TravelModeColumn from '@/components/tableColumn/TravelModeColumn'
import { useHistory } from 'react-router-dom'
import NewPrice from '@/components/tableColumn/NewPrice'
import { PlusOutlined } from '@ant-design/icons'

/**
 * 商品库 待发布
 */
const UnReleaseProductionListPage: React.FC<any> = observer(({}) => {
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
    params.state = 1
    ProductionListService.list({ current: pageIndex, size: pageSize, ...params }).then((res) => {
      setData(res.data.records)
      setTotal(res.data.total)
    })
  }

  /**待发布商品库 */
  const columnsUnRelease = [
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
      title: '创建渠道',
      dataIndex: 'createChannelName',
    },
    {
      title: '创建时间',
      render: (text, record, index) => <TimeColumn time={record?.updateTime} />,
    },
    {
      title: '发布状态',
      dataIndex: 'checkState',
      render: (text, record, index) => (
        <span>
          {record?.checkState == -1
            ? '未审核'
            : record?.checkState == 0
            ? '待审核'
            : record?.checkState == 1
            ? '通过'
            : '不通过'}
        </span>
      ),
    },
    {
      title: '操作',
      fixed: 'right',
      render: (text: any, record: any) => (
        <Space size="middle">
          <span
            className="operation"
            onClick={() => {
              history.push(`/production/production-detail?id=${record.id}&type=unRelease`)
            }}
          >
            查看
          </span>
          {!(record?.checkState == 0) && (
            <span
              className="operation"
              onClick={() => {
                console.log(record)
                history.push(`/production/release-product?id=${record.id}`)
              }}
            >
              编辑
            </span>
          )}
          <span
            className="operation"
            onClick={() => {
              console.log(record)
              history.push(`/production/production-config-detail?id=${record.id}`)
            }}
          >
            配置详情
          </span>
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
    <div className="UnReleaseProductionListPage__root">
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

            <Col span={8} style={{ textAlign: 'right' }}>
              <Form.Item>
                <Space>
                  <Button type="primary" icon={<PlusOutlined />} htmlType="button" onClick={_addProduction}>
                    添加商品
                  </Button>
                  {/* <Button htmlType="button" type="primary">
                  下架
                </Button> */}
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <Table
        rowKey="id"
        columns={columnsUnRelease}
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

export default UnReleaseProductionListPage
