/*
 * @Description: 配置关联清单
 * @LastEditTime: 2022-01-12 18:13:57
 */
import { Table, Space, Button, Modal, Form, Row, Col, Select } from 'antd'
import { taskService } from '@/service/marketService'

import { InputTemp } from '@/components/filter/formItem'
import React, { useEffect, useState } from 'react'

interface Props {
  goodsShow: boolean
  goodsIdList: any
  onSuccess: (any: any, e?: any) => void
  onClose: () => void
}
const enumState = {
  '': '全部',
  '0': '启用',
  '1': '禁用',
}
const ActivityTableModal: React.FC<Props> = ({ goodsShow, goodsIdList, onSuccess, onClose }) => {
  const [form] = Form.useForm()
  const [roleList, setRoleList] = useState('')
  const [selectedRows, setSelectedRows] = useState([])
  const [data, setData] = useState([])
  useEffect(() => {
    console.log(goodsIdList,'goodsIdList')
    setRoleList(JSON.parse(JSON.stringify(goodsIdList)))
  }, [goodsIdList])
  useEffect(() => {
    if (goodsShow) {
      setSelectedRows([])
      getGoodsDetail()
    }
  }, [goodsShow])
  const getGoodsDetail = () => {
    const params = form.getFieldsValue()
    taskService.list({ current: 1, size: 1000, ...params }).then((res) => {
      setData(res?.data.records)
    })
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
      title: '关联商品数量',
      dataIndex: 'activityDetailImg',
      render: (text: any, record: any) => `${record.taskInventoryGood?.length ?? 0}`,
    },
    // {
    //   title: '关联活动',
    //   dataIndex: '',
    // },
    {
      title: '状态',
      dataIndex: 'activityTitle',
      render: (text: any, record: any) => `${record.state == 0 ? '启用' : '禁用'}`,
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
      <Modal title="配置关联清单" width={700} visible={goodsShow} onOk={_handleUpdate} onCancel={_formClose}>
        <Form name="basic" initialValues={{ keyword: '',state:'' }} onFinish={onFinish} form={form}>
          <Row gutter={[5, 0]} style={{ paddingLeft: '10px' }}>
            <Col span={5}>
              <InputTemp name="idOrName" placeholder="清单名称" />
            </Col>
            <Col span={2} className="table-from-label">
              状态
            </Col>
            <Col span={5}>
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
          rowKey='id'
          rowSelection={{ ...rowSelection }}
          dataSource={data}
        />
      </Modal>
    </div>
  )
}

export default ActivityTableModal
