/*
 * @Description: 关联商品信息
 * @LastEditTime: 2022-01-11 16:23:59
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
      console.log(JSON.parse(data), '0000000')
      getGoodsDetail()
    }
  }, [pageIndex, data])

  const getGoodsDetail = async () => {
    const params = form.getFieldsValue()
    const res = await rebateService.rebateGoodsPage({
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
    '': '全部',
    '0': '启用',
    '1': '禁用',
  }
  return (
    <div className="goodsTable__root">
      <Form name="basic" initialValues={{ idOrNameSate: '', state: '' }} onFinish={onFinish} form={form}>
        <Row gutter={[5, 0]} style={{ paddingLeft: '10px' }}>
          <Col span={12}>
            <InputTemp name="idOrNameSate" placeholder="商品名称" />
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
        rowKey="goodsId"
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
