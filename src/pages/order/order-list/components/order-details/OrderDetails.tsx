import React, { useState, useEffect } from 'react'
import useQuery from '@/hooks/useQuery'
import './OrderDetails.less'
import { useNavigate } from 'react-router-dom'
import { Table, Space, Button } from 'antd'
import { OrderService } from '@/service/OrderService'
import { HttpCode } from '@/constants/HttpCode'
import QRCode from 'qrcode.react'
/**
 * 订单详情
 */
const OrderDetailsPage: React.FC = () => {
  const history = useNavigate()
  const query = useQuery()
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
    OrderService.details({ orderId: query.get('id') ?? '' }).then((res) => {
      if (res.code === HttpCode.success) {
        setData(res?.data ?? [])
        setDataZ(res.data?.subOrderDtoList ?? [])
      }
    })
    OrderService.scaleInfo({ orderId: query.get('id') ?? '' }).then((res) => {
      if (res.code === HttpCode.success) {
        const arr = {}
        res?.data?.relationList.map((item: any) => {
          item?.channelScaleList.map((item: any) => {
            if (item.level == 2) {
              arr.two = item
            }
            if (item.level == 3) {
              arr.three = item
            }
            if (item.level == 4) {
              arr.four = item
            }
            if (item.level == 5) {
              arr.five = item
            }
          })
          item.two = arr.two
          item.three = arr.three
          item.four = arr.four
          item.five = arr.five
        })
        setDataF(res.data?.relationList ?? [])
      }
    })
  }

  const getRelations = () => {
    OrderService.relation({ orderId: query.get('id') ?? '' }).then((res) => {
      if (res.code === HttpCode.success) {
        setDataD(res?.data ?? [])
      }
    })
  }
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
        if (record.rebateFlag == true) {
          return `有`
        } else {
          return `--`
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
      dataIndex: 'travelerName',
      className: 'table-light-color',
      render: (text: any, record: any, index: any) => {
        return (
          <div className="travel">
            <div>
              <span className="travel-type">
                {record?.travelerType == 1 ? `成人${index + 1}` : ''}
                {record?.travelerType == 0 ? `儿童${index + 1}` : ''}
              </span>
              <span className="travel-name">{record?.travelerName || '无'}</span>
              <span className="travel-relation">
                {record?.travelerRelation == 0 ? '(本人)' : ''}
                {record?.travelerRelation == 1 ? '(夫妻)' : ''}
                {record?.travelerRelation == 2 ? '(父母)' : ''}
                {record?.travelerRelation == 3 ? '(子女)' : ''}
                {record?.travelerRelation == 4 ? '(亲戚)' : ''}
                {record?.travelerRelation == 5 ? '(朋友)' : ''}
                {record?.travelerRelation == 6 ? '(兄弟)' : ''}
                {record?.travelerRelation == 7 ? '(姐妹)' : ''}
              </span>
            </div>
            <div>
              <span className="travel-relation">手机号</span>
              <span>{record?.travelerPhoneNumber || '无'}</span>
            </div>
            {/* <div>
              <span className="travel-type">关系归属</span>
              <span>{record?.travelerPhoneNumber}</span>
            </div> */}
          </div>
        )
      },
    },
    {
      title: '单价',
      dataIndex: 'originPrice',
      className: 'table-light-color',
      render: (text: any, record: any) => {
        return ((parseInt(record?.originPrice) - parseInt(record?.discountAmount)) / 1000).toFixed(2)
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
      render: (text: any, record: any) => {
        const value = `shtravel://app?data=${encodeURIComponent(
          JSON.stringify({ orderId: record.orderId, suborderId: record.id, type: 'verifications' })
        )}`
        return <QRCode value={value} size={100} />
      },
    },
    {
      title: '订单信息状态',
      dataIndex: 'stateVal',
      className: 'table-light-color',
    },
    // {
    //   title: '行程状态',
    //   dataIndex: 'state',
    //   className: 'table-light-color',
    // },
  ]
  const columnsF = [
    {
      title: '商品分佣',
      dataIndex: 'allocationAmount',
      className: 'table-light-color',
      render: (text: any, record: any) => {
        if (record?.allocationAmount) {
          return `¥${(parseInt(record?.allocationAmount) / 1000).toFixed(2)}`
        } else {
          return ''
        }
      },
    },
    {
      title: '渠道关系',
      dataIndex: 'type',
      className: 'table-light-color',
      render: (text: any, record: any) => {
        if (record?.type == 1) {
          return '关联归属渠道'
        } else if (record?.type == 2) {
          return '推荐渠道'
        } else if (record?.type == 3) {
          return '服务渠道'
        } else if (record?.type == 4) {
          return '从属/服务渠道'
        } else if (record?.type == 5) {
          return '推荐/服务渠道'
        } else if (record?.type == 6) {
          return '推荐/从属渠道'
        } else if (record?.type == 7) {
          return '关联归属/推荐/服务渠道'
        }
      },
    },
    {
      title: '渠道分佣',
      className: 'table-light-color',
      dataIndex: 'arr',
      children: [
        {
          title: '二级',
          dataIndex: 'two',
          className: 'table-light-color',
          render: (text: any, record: any) => {
            return (
              <div className="table-f">
                <div></div>
                <div className="table-name">
                  {record?.two?.channelName}/{record?.two?.userName}
                </div>
                <div className="table-amount">
                  ¥{record?.two?.amount ? (parseInt(record?.two?.amount) / 1000).toFixed(2) : 0}
                </div>
              </div>
            )
          },
        },
        {
          title: '三级',
          dataIndex: 'three',
          className: 'table-light-color',
          render: (text: any, record: any) => {
            return (
              <div className="table-f">
                <div></div>
                <div className="table-name">
                  {record?.three?.channelName}/{record?.three?.userName}
                </div>
                <div className="table-amount">
                  ¥{record?.three?.amount ? (parseInt(record?.three?.amount) / 1000).toFixed(2) : 0}
                </div>
              </div>
            )
          },
        },
        {
          title: '四级',
          dataIndex: 'four',
          className: 'table-light-color',
          render: (text: any, record: any) => {
            return (
              <div className="table-f">
                <div></div>
                <div className="table-name">
                  {record?.four?.channelName}/{record?.four?.userName}
                </div>
                <div className="table-amount">
                  ¥{record?.four?.amount ? (parseInt(record?.four?.amount) / 1000).toFixed(2) : 0}
                </div>
              </div>
            )
          },
        },
        {
          title: '五级',
          dataIndex: 'five',
          className: 'table-light-color',
          render: (text: any, record: any) => {
            return (
              <div className="table-f">
                <div></div>
                <div className="table-name">
                  {record?.five?.channelName}/{record?.five?.userName}
                </div>
                <div className="table-amount">
                  ¥{record?.five?.amount ? (parseInt(record?.five?.amount) / 1000).toFixed(2) : 0}
                </div>
              </div>
            )
          },
        },
        {
          title: '发团服务费',
          dataIndex: 'serviceAmount',
          className: 'table-light-color',
          render: (text: any, record: any) => {
            return (
              <div className="table-f">
                <div></div>
                {/* <div className="table-name">
                  {record?.five?.channelName}/{record?.five?.userName}
                </div> */}
                <div className="table-amount">
                  ¥{record.serviceAmount ? (parseInt(record?.serviceAmount) / 1000).toFixed(2) : 0}
                </div>
              </div>
            )
          },
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
        pagination={false}
      />
      <div className="details-title">分佣方案</div>
      <Table rowKey="id" columns={columnsF} scroll={{ x: 'max-content' }} dataSource={[...dataF]} />
      <div className="details-title">子订单信息</div>
      <Table rowKey="id" columns={columnsZ} scroll={{ x: 'max-content' }} dataSource={[...dataZ]} pagination={false} />

      <div className="details-title">支付详情</div>
      <div className="bottom">
        <table className="tableStyle" cellSpacing="0" cellPadding="0">
          <tr>
            <td rowspan="2" className="paymentWays">
              <div>
                付款方式:<span>{data.payTypeVal ? data.payTypeVal : ''}</span>
              </div>
              <div>
                交易单号:<span>{data.OrderNo ? data.OrderNo : ''}</span>
              </div>
              <div>
                三方交易单号:<span>{data.payNo ? data.payNo : ''}</span>
              </div>
            </td>
            <td>实付款</td>
            <td>商品总价</td>
            <td>代币折扣</td>
          </tr>
          <tr>
            <td>{data.payAmount ? (parseInt(data?.payAmount) / 1000).toFixed(2) : 0}</td>
            <td>{((parseInt(data?.originPrice) - parseInt(data?.discountAmount)) / 1000).toFixed(2)}</td>
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
