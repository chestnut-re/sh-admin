import React, { useState, useEffect } from 'react'
import './index.less'
import { useNavigate } from 'react-router-dom'
import { Table, Space, Button } from 'antd'
import { OrderService } from '@/service/OrderService'
import { HttpCode } from '@/constants/HttpCode'
/**
 * 订单详情
 */
const OrderDetailsPage: React.FC = () => {
  const history = useNavigate()
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
    // OrderService.details({ orderId: history.location.state.id }).then((res) => {
    //   if (res.code === HttpCode.success) {
    //     setData(res.data)
    //     setDataZ(res.data?.subOrderDtoList)
    //     // setDataF(res.data?.distPlanOrderDTO)
    //   }
    // })
  }

  const getRelations = () => {
    // OrderService.relation({ orderId: history.location.state.id }).then((res) => {
    //   if (res.code === HttpCode.success) {
    //     setDataM(res.data)
    //     setDataD(res.data)
    //   }
    // })
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
            <td>优惠/福利</td>
          </tr>
          <tr>
            <td>{data.payAmount ? data.payAmount : ''}</td>
            <td>{data.originPrice ? data.originPrice : ''}</td>
            <td>{data.tokenAmount ? data.tokenAmount : ''}</td>
            <td></td>
          </tr>
        </table>
      </div>
      <div className="details-title">退款详情</div>
      <div className="bottom">
        <table className="tableStyle" cellSpacing="0" cellPadding="0">
          <tr>
            <td rowspan="2" className="paymentWays">
              <div>
                退款编号:<span>{data.payTypeVal ? data.payTypeVal : ''}</span>
              </div>
            </td>
            <td>退单数量</td>
            <td>退款金额</td>
            <td>退回代币</td>
          </tr>
          <tr>
            <td>{data.payAmount ? data.payAmount : ''}</td>
            <td>{data.originPrice ? data.originPrice : ''}</td>
            <td>{data.tokenAmount ? data.tokenAmount : ''}</td>
          </tr>
        </table>
      </div>
      <div className="_bottom">
        <div className="left">
          <div>
            <span>退款操作人&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>张三/用户</span>
          </div>
          <div>
            <span>申请时间&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>2021.08.12.01 01:11</span>
          </div>
          <div>
            <span>退款原因&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>出发前一周无理由退款</span>
          </div>
          <div>
            <span>退款说明/凭证&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>填错了地址</span>
          </div>
        </div>
        <div className="right">
          <div>
            <span>操作人员&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>张三</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>操作人员所属渠道&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>总部/分中心一</span>
          </div>
          <div>
            <span>审核结果&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>驳回</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>审核时间&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>2021-01-01 11:31:31</span>
          </div>
          <div>
            <span>驳回理由&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>21321312</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default OrderDetailsPage
