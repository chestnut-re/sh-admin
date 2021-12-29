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
      dataIndex: '',
    },
    {
      title: '常住地',
      dataIndex: '',
    },
  ]
  const columnsD = [
    {
      title: '订单关系',
      dataIndex: 'orderShip',
    },
    {
      title: '姓名',
      dataIndex: '',
    },
    {
      title: '关系归属',
      dataIndex: 'relationship',
    },
    {
      title: '责任区域',
      dataIndex: 'responsibilityArea',
    },
    {
      title: '始发地责任区域',
      dataIndex: '',
    },
    {
      title: '手机号',
      dataIndex: 'phoneNumber',
    },
    {
      title: '平台身份',
      dataIndex: 'accountTypeVal',
    },
    {
      title: '当前返利任务',
      dataIndex: 'rebateFlag',
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
        <span className="order-state">{data.state ? data.state : ''}</span>
        <div className="order-time">
          剩<span></span>
        </div>
        <span className="order-fx">分销</span>
        <div className="states-order">
          <div>{data.orderNo ? data.orderNo : ''}</div>
          <div>订单编号</div>
        </div>
        <div className="states-order1">
          <div>{data.orderTime ? data.orderTime : ''}</div>
          <div>下单时间</div>
        </div>
        <div className="states-order2">
          <div>{data.payTime ? data.payTime : ''}</div>
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
          <span>{data.goodsName ? data.goodsName : ''}</span>
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
            <td>{data.payAmount ? data.payAmount : ''}</td>
            <td>{data.originPrice ? data.originPrice : ''}</td>
            <td>{data.tokenAmount ? data.tokenAmount : ''}</td>
          </tr>
        </table>
      </div>
      <div className="details-title">营销活动</div>
      <div className="bottom">
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
      </div>
    </div>
  )
}
export default OrderDetailsPage
