import React, { useState, useEffect } from 'react'
import OrderStates from '../order-states/OrderStates'
import OrderInfor from '../order-infor/OrderInfor'
import './OrderDetails.less'
import { Table, Space, Button } from 'antd'
/**
 * 订单详情
 */
const OrderDetailsPage: React.FC = () => {
  const [dataM, setDataM] = useState([])
  const [dataD, setDataD] = useState([])
  const [dataZ, setDataZ] = useState([])
  const [dataF, setDataF] = useState([])
  const columnsM = [
    {
      title: '昵称',
      dataIndex: 'travelerPhoneNumber',
    },
    {
      title: '订单关联',
      dataIndex: 'nickName',
    },
    {
      title: '常住地',
      dataIndex: 'mobile',
    },
    {
      title: '手机号',
      dataIndex: 'travelerPhoneNumber',
    },
    {
      title: '平台身份',
      dataIndex: 'state',
    },
  ]
  const columnsD = [
    {
      title: '订单关系',
      dataIndex: 'systemUserId',
    },
    {
      title: '姓名',
      dataIndex: 'nickName',
    },
    {
      title: '关系归属',
      dataIndex: 'mobile',
    },
    {
      title: '责任区域',
      dataIndex: 'roleName',
    },
    {
      title: '始发地责任区域',
      dataIndex: 'state',
    },
    {
      title: '手机号',
      dataIndex: 'state',
    },
    {
      title: '平台身份',
      dataIndex: 'state',
    },
    {
      title: '当前返利任务',
      dataIndex: 'state',
    },
  ]
  const columnsZ = [
    {
      title: '订单编号',
      dataIndex: 'suborderNo',
    },
    {
      title: '出行人信息',
      dataIndex: 'nickName',
    },
    {
      title: '单价',
      dataIndex: 'originPrice',
    },
    {
      title: '使用代币',
      dataIndex: 'tokenAmount',
    },
    {
      title: '实付款',
      dataIndex: 'payAmount',
    },
    {
      title: '出行确认码',
      dataIndex: 'state',
    },
    {
      title: '订单信息状态',
      dataIndex: 'state',
    },
    {
      title: '行程状态',
      dataIndex: 'state',
    },
  ]
  const columnsF = [
    {
      title: '渠道名称',
      dataIndex: 'channelName',
    },
    {
      title: '分佣比例(%)',
      dataIndex: 'distScale',
    },
    {
      title: '分佣金额(¥)',
      dataIndex: 'distPrice',
    },
  ]
  return (
    <div className="details__root">
      <OrderStates />
      <OrderInfor />
      <div className="details-title">买家信息</div>
      <Table rowKey="id" columns={columnsM} scroll={{ x: 'max-content' }} dataSource={[...dataM]} />
      <div className="details-title">订单关联人</div>
      <Table rowKey="id" columns={columnsD} scroll={{ x: 'max-content' }} dataSource={[...dataD]} />
      <div className="details-title">子订单信息</div>
      <Table rowKey="id" columns={columnsZ} scroll={{ x: 'max-content' }} dataSource={[...dataZ]} />
      <div className="details-title">分佣方案</div>
      <Table rowKey="id" columns={columnsF} scroll={{ x: 'max-content' }} dataSource={[...dataF]} />
    </div>
  )
}
export default OrderDetailsPage
