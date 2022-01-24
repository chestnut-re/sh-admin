/*
 * @Description: 关联清单
 * @LastEditTime: 2022-01-11 16:22:28
 */
import { Table, Space, Button, Modal, Form, Row, Col, Select } from 'antd'
import { rebateService } from '@/service/marketService'
import { InputTemp } from '@/components/filter/formItem'
import React, { useEffect, useState } from 'react'
interface Props {
  data: any
}

const AssociatedGoods: React.FC<Props> = ({ data }) => {
  const [form] = Form.useForm()
  const [dataList, setData] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [total, setTotal] = useState()
  useEffect(() => {
    if (!!data) {
      getGoodsDetail()
    }
  }, [pageIndex, data])

  const getGoodsDetail = async () => {
    const params = form.getFieldsValue()
    const res = await rebateService.rebateTaskInventoryPage({
      ...params,
      rebateAuditId: JSON.parse(data)?.id,
      current: pageIndex,
      size: pageSize,
    })
    setData(res?.data.records)
    setTotal(res.data?.total)
  }
  const columns = [
    {
      title: '清单ID',
      dataIndex: 'id',
    },
    {
      title: '清单名称',
      dataIndex: 'name',
    },
    {
      title: '关联商品量',
      dataIndex: 'goodsName',
      render: (text: any, record: any) => {
        return `${record?.taskInventoryGood?.length ?? 0}`
      },
    },
    {
      title: '关联活动量',
      dataIndex: 'goodsName',
      render: (text: any, record: any) => {
        return `${record?.orders?.length ?? 0}`
      },
    },
    {
      title: '状态',
      dataIndex: 'goodsName',
      render: (text: any, record: any) => {
        if (record.state == 0) {
          return `启用`
        } else if (record.state == 1) {
          return `禁用`
        }
      },
    },
  ]

  const onFinish = () => {
    getGoodsDetail()
  }
  const resetTable = () => {
    form.resetFields()
    console.log('---')
  }
  const onPaginationChange = (page: number, pageSize: number) => {
    setPageIndex(page)
    setPageSize(pageSize)
  }
  const enumState = {
    '': '全部',
    '0': '启用',
    '1': '禁用',
  }
  return (
    <div className="goodsTable__root">
      <Form name="basic" initialValues={{ idOrNameSate: '', state: '' }} onFinish={onFinish} form={form}>
        <Row gutter={[5, 0]} style={{ paddingLeft: '10px' }}>
          <Col span={12}>
            <InputTemp name="idOrNameSate" placeholder="清单名称" />
          </Col>
          <Col span={1} className="table-from-label">
            状态
          </Col>
          <Col span={3}>
            <Form.Item name="state">
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
              <Button onClick={resetTable} htmlType="button">
                重置
              </Button>
            </Space>
          </Form.Item>
        </Row>
      </Form>

      <Table
        rowKey="id"
        columns={columns}
        scroll={{ x: 'max-content' }}
        dataSource={dataList}
        pagination={{
          onChange: onPaginationChange,
          showSizeChanger: false,
          showQuickJumper: true,
          pageSize: pageSize,
          total: total,
        }}
      />
    </div>
  )
}

export default AssociatedGoods
