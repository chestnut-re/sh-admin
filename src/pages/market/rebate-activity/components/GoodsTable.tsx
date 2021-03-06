/*
 * @Description: 配置商品详情
 * @LastEditTime: 2022-02-08 10:24:27
 */
import { Table, Space, Button, Modal, Form, Row, Col } from 'antd'
import { ActivitiesService } from '@/service/ActivitiesService'
import {unique} from './util'
import { InputTemp } from '@/components/filter/formItem'
import React, { useEffect, useState } from 'react'

interface Props {
  goodsShow: boolean
  goodsIdList: any
  query?: any
  goodsAlreadyData?: any
  onSuccess: (any: any, e?: any) => void
  onClose: () => void
}
const GoodsTable: React.FC<Props> = ({ goodsShow, goodsIdList, goodsAlreadyData, onSuccess, onClose, query }) => {
  const [form] = Form.useForm()
  const [roleList, setRoleList] = useState('')
  const [selectedRows, setSelectedRows] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    setRoleList(JSON.parse(JSON.stringify(goodsIdList)))
  }, [goodsIdList])
  useEffect(() => {
    if (goodsShow) {
      setSelectedRows([])
      getGoodsDetail()
    }
  }, [goodsShow])
  const getGoodsDetail = async () => {
 
     

    const params = form.getFieldsValue()
    const res = await ActivitiesService.activityGoodsPage({ ...params, ...query })
    setData(unique([...res?.data, ...(goodsAlreadyData ?? [])]))
  }
  const columns = [
    {
      title: '商品ID',
      dataIndex: 'goodsId',
      className: 'table-light-color',
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      className: 'table-light-color',
    },
  ]
  const _handleUpdate = () => {
    onSuccess(roleList, selectedRows)
  }
  const _formClose = () => {
    onClose()
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRoleList(selectedRowKeys)
      setSelectedRows(selectedRows)
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    },
    selectedRowKeys: roleList,
  }
  const onFinish = () => {
    getGoodsDetail()
    console.log('---')
  }
  const resetTable = () => {
    form.resetFields()
    console.log('---')
  }
  return (
    <div className="goodsTable__root">
      <Modal title="商品管理" width={700} visible={goodsShow} okText={!!query?'提交审核':'确定'} onOk={_handleUpdate} onCancel={_formClose}>
        <Form name="basic" initialValues={{ keyword: '' }} onFinish={onFinish} form={form}>
          <Row gutter={[5, 0]} style={{ paddingLeft: '10px' }}>
            <Col span={12}>
              <InputTemp name="keyword" placeholder="商品名称" />
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

        <Table columns={columns} rowKey="goodsId" rowSelection={{ ...rowSelection }} dataSource={data} />
      </Modal>
    </div>
  )
}

export default GoodsTable
