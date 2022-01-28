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
  const history = useHistory<any>()
  const [dataM, setDataM] = useState([])
  const [dataD, setDataD] = useState([])
  const [dataZ, setDataZ] = useState([])
  const [dataF, setDataF] = useState([])
  const [data, setData] = useState<any>([])
  useEffect(() => {
    loadData()
    getRelations()
  }, [])

  const loadData = () => {
    OrderService.details({ orderId: history.location.state.id }).then((res) => {
      if (res.code === HttpCode.success) {
        setData(res.data)
        setDataZ(res.data?.subOrderDtoList)
        // setDataF(res.data?.distPlanOrderDTO)
      }
    })
  }

  const getRelations = () => {
    OrderService.relation({ orderId: history.location.state.id }).then((res) => {
      if (res.code === HttpCode.success) {
        setDataM(res.data)
        setDataD(res.data)
      }
    })
  }
  const columnsM = [
    {
      title: '手机号',
      dataIndex: 'phoneNumber',
    },
    {
      title: '昵称',
      dataIndex: 'orderUserName',
    },
    {
      title: '常住地',
      dataIndex: 'departureCity',
    },
  ]
  const columnsD = [
    {
      title: '订单关系',
      dataIndex: 'orderShip',
      className: 'table-light-color',
    },
    {
      title: '姓名',
      dataIndex: 'userName',
      className: 'table-light-color',
    },
    {
      title: '关系归属',
      dataIndex: 'relationship',
      className: 'table-light-color',
    },
    {
      title: '买家常住地/渠道责任区域',
      dataIndex: 'responsibilityArea',
      className: 'table-light-color',
    },
    {
      title: '始发地同异',
      dataIndex: 'areaEqualFlag',
      className: 'table-light-color',
    },
    {
      title: '手机号',
      dataIndex: 'phoneNumber',
      className: 'table-light-color',
    },
    {
      title: '平台身份',
      dataIndex: 'accountTypeVal',
      className: 'table-light-color',
    },
    {
      title: '当前返利任务',
      dataIndex: 'rebateFlag',
      className: 'table-light-color',
      render: (text: any, record: any) => {
        if (record.rebateFlag == 0) {
          return `-`
        } else if (record.rebateFlag == 1) {
          return `有`
        }
      },
    },
  ]
  const columnsZ = [
    {
      title: '订单编号',
      dataIndex: 'suborderNo',
      className: 'table-light-color',
    },
    {
      title: '出行人信息',
      dataIndex: 'nickName',
      className: 'table-light-color',
    },
    {
      title: '单价',
      dataIndex: 'originPrice',
      className: 'table-light-color',
      render: (text: any, record: any) => {
        return (parseInt(record.unitPrice) / 1000).toFixed(2)
      },
    },
    {
      title: '使用代币',
      dataIndex: 'tokenAmount',
      className: 'table-light-color',
      render: (text: any, record: any) => {
        return (parseInt(record.tokenAmount) / 1000).toFixed(2)
      },
    },
    {
      title: '实付款',
      dataIndex: 'payAmount',
      className: 'table-light-color',
      render: (text: any, record: any) => {
        return (parseInt(record.payAmount) / 1000).toFixed(2)
      },
    },
    {
      title: '出行确认码',
      dataIndex: 'state',
      className: 'table-light-color',
    },
    {
      title: '订单信息状态',
      dataIndex: 'state',
      className: 'table-light-color',
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
      className: 'table-light-color',
    },
  ]
  const columnsF = [
    {
      title: '商品分佣',
      dataIndex: 'channelName',
      className: 'table-light-color',
    },
    {
      title: '渠道关系',
      dataIndex: 'distScale',
      className: 'table-light-color',
    },
    {
      title: '渠道分佣',
      dataIndex: 'distPrice',
      className: 'table-light-color',
      children: [
        {
          title: '二级',
          dataIndex: 'building',
          className: 'table-light-color',
        },
        {
          title: '三级',
          dataIndex: 'number',
          className: 'table-light-color',
        },
        {
          title: '四级',
          dataIndex: 'number',
          className: 'table-light-color',
        },
        {
          title: '五级',
          dataIndex: 'number',
          className: 'table-light-color',
        },
        {
          title: '发团服务费',
          dataIndex: 'number',
          className: 'table-light-color',
        },
      ],
    },
  ]
  return (
    <div className="detail__root">
      <div className="states-con">
        <span className="order-sta">订单状态</span>
        <span className="order-state">{data?.stateVal}</span>
        <div className="order-time">
          剩<span></span>
        </div>
        {data.orderTypeVal ? <div className="order-fx">{data?.orderTypeVal}</div> : ''}

        <div className="states-order">
          <div>{data.orderNo ? data.orderNo : '无'}</div>
          <div>订单编号</div>
        </div>
        <div className="states-order1">
          <div>{data.orderTime ? data.orderTime : '无'}</div>
          <div>下单时间</div>
        </div>
        <div className="states-order2">
          <div>{data.payTime ? data.payTime : '无'}</div>
          <div>付款时间</div>
        </div>
        <div className="states-order3">
          <div>{data.sourceVal ? data.sourceVal : '无'}</div>
          <div>下单途径</div>
        </div>
      </div>
      <div className="infor-con">
        <div className="infor-title">
          <img src="" alt="" />
          <span>{data.goodsName ? data.goodsName : ''}</span>
        </div>
        <div className="infor infor-spe">
          <div>始发地</div>
          <div>{data?.departureCity}</div>
        </div>
        <div className="infor">
          <div>成人价</div>
          <div>{(parseInt(data?.personCurrentPrice) / 1000).toFixed(2)}</div>
        </div>
        <div className="infor">
          <div>儿童价</div>
          <div>{(parseInt(data?.childCurrentPrice) / 1000).toFixed(2)}</div>
        </div>
        <div className="infor">
          <div>下单数量</div>
          <div>
            <span style={{ display: 'inline-block', height: '20px', lineHeight: '20px' }}>
              <span style={{ fontSize: 20 }}>{parseInt(data?.adultNum) + parseInt(data?.childNum)}</span>
              <span>
                &nbsp;成人×{data?.adultNum}&nbsp;儿童×{data?.childNum}
              </span>
            </span>
          </div>
        </div>
        <div className="infor">
          <div>代币最多可抵</div>
          <div>{(parseInt(data?.deductionPrice) / 1000).toFixed(2)}</div>
        </div>
      </div>
      {/* <div className="details-title">买家信息</div>
      <Table rowKey="id" columns={columnsM} scroll={{ x: 'max-content' }} dataSource={[...dataM]} /> */}
      <div className="details-title">订单关联人</div>
      <Table
        className="table-light-color"
        rowKey="id"
        columns={columnsD}
        scroll={{ x: 'max-content' }}
        dataSource={[...dataD]}
      />
      <div className="details-title">分佣方案</div>
      <Table rowKey="id" columns={columnsF} scroll={{ x: 'max-content' }} dataSource={[...dataF]} />
      <div className="details-title">子订单信息</div>
      <Table rowKey="id" columns={columnsZ} scroll={{ x: 'max-content' }} dataSource={[...dataZ]} />

      <div className="details-title">支付详情</div>
      <div className="bottom">
        <table className="tableStyle" cellSpacing="0" cellPadding="0">
          <tr>
            <td rowspan="2" className="paymentWays">
              <div>
                付款方式:<span>{data.payTypeVal ? data.payTypeVal : ''}</span>
              </div>
              <div>
                交易单号:<span>{data.thirdPartyPayNo ? data.thirdPartyPayNo : ''}</span>
              </div>
              <div>
                三方交易单号:<span>{data.thirdPartyPayNo ? data.thirdPartyPayNo : ''}</span>
              </div>
            </td>
            <td>实付款</td>
            <td>商品总价</td>
            <td>代币折扣</td>
          </tr>
          <tr>
            <td>{data.payAmount ? (parseInt(data?.payAmount) / 1000).toFixed(2) : 0}</td>
            <td>{data.originPrice ? (parseInt(data?.originPrice) / 1000).toFixed(2) : 0}</td>
            <td>{data.tokenAmount ? (parseInt(data?.tokenAmount) / 1000).toFixed(2) : 0}</td>
          </tr>
        </table>
      </div>
      {/* <div className="details-title">营销活动</div> */}
      {/* <div className="bottom">
        <table className="tableStyle" cellSpacing="0" cellPadding="0">
          <tr>
            <td>营销活动名称</td>
            <td>当前订单参与时段</td>
            <td>活动目标</td>
            <td>活动福利</td>
            <td>用户执行情况</td>
            <td>用户已获福利</td>
          </tr>
          <tr style={{ height: '100px' }}>
            <td style={{ fontWeight: 'bold' }}>暑假返利</td>
            <td>11</td>
            <td>22</td>
            <td>23</td>
            <td>44</td>
            <td>55</td>
          </tr>
        </table>
      </div> */}
    </div>
  )
}
export default OrderDetailsPage
