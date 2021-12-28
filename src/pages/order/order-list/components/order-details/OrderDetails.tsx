import React, { useState, useEffect } from 'react'
import './OrderDetails.less'
import { useHistory } from 'react-router-dom'
import { Table, Space, Button } from 'antd'
import { OrderService } from '@/service/OrderService'
import { HttpCode } from '@/constants/HttpCode'
/**
 * 订单详情
 */
const OrderDetailsPage: React.FC = () => {
  const history = useHistory()
  const [dataM, setDataM] = useState([])
  const [dataD, setDataD] = useState([])
  const [dataZ, setDataZ] = useState([])
  const [dataF, setDataF] = useState([])
  const [data, setData] = useState([])
  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    OrderService.details({ orderId: history.location.state.id }).then((res) => {
      if (res.code === HttpCode.success) {
        setData(res.data)
        setDataZ(res.data?.subOrderDtoList)
      }
    })
  }
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
      render: (text: any, record: any) => {
        if (record.state == 1) {
          return `待付款`
        } else if (record.state == 2) {
          return `已失效`
        } else if (record.state == 3) {
          return `待确认`
        } else if (record.state == 4) {
          return `已完成`
        } else if (record.state == 5) {
          return `退款中`
        } else if (record.state == 6) {
          return `退款成功`
        } else if (record.state == 2) {
          return `退款失败`
        }
      },
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
      <div className="states-con">
        <span className="order-sta">订单状态</span>
        <span className="order-state">{data.state}</span>
        <div className="order-time">
          剩<span></span>
        </div>
        <span className="order-fx">分销</span>
        <div className="states-order">
          <div>{data.orderNo}</div>
          <div>订单编号</div>
        </div>
        <div className="states-order1">
          <div>{data.orderTime}</div>
          <div>下单时间</div>
        </div>
        <div className="states-order2">
          <div>{data.payTime}</div>
          <div>付款时间</div>
        </div>
        <div className="states-order3">
          <div>APP 浏览</div>
          <div>下单途径</div>
        </div>
      </div>
      <div className="infor-con">
        <div className="infor-title">
          <img src="" alt="" />
          <span>{data.goodsName}</span>
        </div>
        <div className="infor infor-spe">
          <div>始发地</div>
          <div>青岛</div>
        </div>
        <div className="infor">
          <div>成人价</div>
          <div>{data.goodsPrice ? data.goodsPrice : 0}</div>
        </div>
        <div className="infor">
          <div>儿童价</div>
          <div>¥878</div>
        </div>
        <div className="infor">
          <div>下单数量</div>
          <div>
            <span>{data.orderCount ? data.orderCount : 0}</span>
            {/* <span>成人×4 儿童×1</span> */}
          </div>
        </div>
        <div className="infor">
          <div>代币最多可抵</div>
          <div>{data.deductionPrice ? data.deductionPrice : 0}</div>
        </div>
      </div>
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
