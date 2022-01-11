/*
 * @Description: 关联商品信息
 * @LastEditTime: 2022-01-11 11:45:15
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
    getGoodsDetail()
  }, [pageIndex, data])

  const getGoodsDetail = async () => {
    const params = form.getFieldsValue()
    const res = await rebateService.rebateGoodsPage({ ...params })
    setData(res?.data.records)
    setTotal(res.data?.total)
  }
  const columns = [
    {
      title: '商品ID',
      dataIndex: 'goodsId',
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
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
    '1': 'ss',
    '2': 'ss',
  }
  return (
    <div className="goodsTable__root">
      <Form name="basic" initialValues={{ keyword: '' }} onFinish={onFinish} form={form}>
        <Row gutter={[5, 0]} style={{ paddingLeft: '10px' }}>
          <Col span={12}>
            <InputTemp name="keyword" placeholder="商品名称" />
          </Col>
          <Col span={1} className="table-from-label">
            状态
          </Col>
          <Col span={3}>
            <Form.Item name="state">
              <Select allowClear>
                {Object.keys(enumState).map((item) => {
                  return (
                    <Select.Option key={item} value={item}>
                      {enumState[item]}
                    </Select.Option>
                  )
                })}
              </Select>
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

      <Table
        rowKey="userId"
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
