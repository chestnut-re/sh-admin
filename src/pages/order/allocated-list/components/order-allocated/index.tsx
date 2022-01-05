import React, { useState, useEffect, useRef } from 'react'
import './../../../order-list/components/order-details/OrderDetails.less'
import '@/pages/production/release-product/index.less'
import { useHistory } from 'react-router-dom'
import { Table, Space, Button } from 'antd'
import { OrderService } from '@/service/OrderService'
import { HttpCode } from '@/constants/HttpCode'
import ServiceList from '../service-list'
import ConfigCommission from '../config-commission'
import StepView from './../StepView'
/**
 * 订单详情
 */
const AllocatedDetailsPage: React.FC = () => {
  const history = useHistory()
  const [dataM, setDataM] = useState([])
  const [dataD, setDataD] = useState([])
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(0)
  const baseInfoRef = useRef<any>()
  const itineraryRef = useRef<any>()
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

  /**下一步 */
  const next = () => {
    if (current === 0) {
      // baseInfoRef.current.next()
      setCurrent(1)
    } else if (current == 1) {
      setCurrent(0)
    }
  }

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
      <div className="ReleaseProduct__root">
        <StepView current={current} />
        <div className="steps-content">
          {current == 0 && <ServiceList />}
          {current == 1 && <ConfigCommission />}
          <div className="btnView">
            <div className="item">
              {current > 0 && (
                <>
                  <div className="nextBtn prev">确定提交</div>
                </>
              )}
              <div onClick={() => next()} className="nextBtn">
                {current === 1 ? '取消' : '下一步'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AllocatedDetailsPage
