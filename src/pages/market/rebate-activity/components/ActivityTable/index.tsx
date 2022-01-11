/*
 * @Description: 配置关联清单
 * @LastEditTime: 2022-01-11 11:20:25
 */
import { Table, Space, Button, Modal, Form, Row, Col } from 'antd'
import { taskService } from '@/service/marketService'

import { InputTemp } from '@/components/filter/formItem'
import React, { useEffect, useState } from 'react'

interface Props {
  goodsShow: boolean
  goodsIdList: any
  onSuccess: (any:any,e?:any) => void
  onClose: () => void
}
const ActivityTable: React.FC<Props> = ({ goodsShow, goodsIdList, onSuccess, onClose }) => {
  const [form] = Form.useForm()
  const [roleList, setRoleList] = useState('')
  const [selectedRows, setSelectedRows] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    setRoleList(JSON.parse(JSON.stringify(goodsIdList)))
    setSelectedRows([])
  }, [goodsIdList])
  useEffect(() => {
    if (goodsShow) {
      getGoodsDetail()
    }
  }, [goodsShow])
  const getGoodsDetail =  () => {
    const params = form.getFieldsValue()
    taskService.list({ current: 1, size: 100,...params}).then((res) => {
      setData(res?.data.records)
      // setTotal(res.data.total)
    })

  
  }
  const columns = [
    {
      title: '清单ID',
      dataIndex: 'goodsId',
    },
    {
      title: '清单名称',
      dataIndex: 'name',
    },
    {
      title: '关联商品数量',
      dataIndex: 'activityDetailImg',
      render: (text: any, record: any) => `${record.taskInventoryGood?.length??0}`,
    },
    {
      title: '关联活动',
      dataIndex: '',
    },
    {
      title: '状态',
      dataIndex: 'activityTitle',
      render: (text: any, record: any) => `${record.state == 0 ? '启用' : '禁用'}`,
    },
  ]
  const _handleUpdate = () => {
    onSuccess(roleList,selectedRows)
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
      <Modal title="配置关联清单" width={700} visible={goodsShow} onOk={_handleUpdate} onCancel={_formClose}>
        <Form name="basic" initialValues={{ keyword: '' }} onFinish={onFinish} form={form}>
          <Row gutter={[5, 0]} style={{ paddingLeft: '10px' }}>
            <Col span={12}>
              <InputTemp name="keyword" placeholder="清单名称" />
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
          columns={columns}
          rowKey={(record) => record.id}
          rowSelection={{ ...rowSelection }}
          pagination={false}
          dataSource={data}
        />
      </Modal>
    </div>
  )
}

export default ActivityTable
