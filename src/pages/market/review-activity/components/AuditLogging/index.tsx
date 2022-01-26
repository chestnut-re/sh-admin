/*
 * @Description: 上线记录
 * @LastEditTime: 2022-01-10 14:09:22
 */
import { Table, Space, Button, Modal, Form, Row, Col } from 'antd'
import { ActivitiesService } from '@/service/ActivitiesService'

import { InputTemp } from '@/components/filter/formItem'
import React, { useEffect, useState } from 'react'

interface Props {
  goodsShow: boolean
  id: any
  onSuccess: (any: any, e?: any) => void
  onClose: () => void
}
const GoodsTable: React.FC<Props> = ({ goodsShow, id, onSuccess, onClose }) => {
  const [form] = Form.useForm()
  const [data, setData] = useState([])

  useEffect(() => {
    console.log('---')
  }, [id])

  const getGoodsDetail = async () => {
    const params = form.getFieldsValue()
    const res = await ActivitiesService.activityGoodsPage({ ...params })
    setData(res?.data.records)
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
  const _formClose = () => {
    console.log('---')
  }

  return (
    <div className="goodsTable__root">
      <Modal
        title="商品管理"
        width={700}
        visible={goodsShow}
        onOk={() => onClose()}
        footer={[
          <Button key="submit" type="primary" onClick={() => onClose()}>
            确定
          </Button>,
        ]}
        onCancel={_formClose}
      >
        <Table columns={columns} rowKey="id" pagination={false} dataSource={data} />
      </Modal>
    </div>
  )
}

export default GoodsTable
