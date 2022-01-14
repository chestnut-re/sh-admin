import React, { useState, useEffect, useRef } from 'react'
import './../../../order-list/components/order-details/OrderDetails.less'
import '@/pages/production/release-product/index.less'
import { useHistory } from 'react-router-dom'
import { Table, Space, Button, message } from 'antd'
import { OrderService, AllocatedOrderService } from '@/service/OrderService'
import { HttpCode } from '@/constants/HttpCode'
import ServiceList from '../service-list'
import ConfigCommission from '../config-commission'
import StepView from './../StepView'
import DetailsPage from '../config-commission/details'
/**
 * 订单详情
 */
const AllocatedDetailsPage: React.FC = () => {
  const history = useHistory<any>()
  const _ref = useRef<any>()
  const [dataD, setDataD] = useState([])
  const [data, setData] = useState<any>([])
  const [current, setCurrent] = useState(0)
  const [selectData, setSelectData] = useState<any>({})
  useEffect(() => {
    loadData()
    getRelations()
  }, [])

  const loadData = () => {
    OrderService.details({ orderId: history.location.state.id }).then((res) => {
      if (res.code === HttpCode.success) {
        setData(res.data)
      }
    })
  }

  const getRelations = () => {
    OrderService.relation({ orderId: history.location.state.id }).then((res) => {
      if (res.code === HttpCode.success) {
        setDataD(res.data)
      }
    })
  }
  const columnsD = [
    {
      title: '订单关系',
      dataIndex: 'orderShip',
    },
    {
      title: '姓名',
      dataIndex: 'userName',
    },
    {
      title: '关系归属',
      dataIndex: 'relationship',
    },
    {
      title: '买家常住地/渠道责任区域',
      dataIndex: 'responsibilityArea',
    },
    {
      title: '始发地同异',
      dataIndex: 'areaEqualFlag',
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
      setCurrent(1)
    } else if (current == 1) {
      setCurrent(0)
    }
  }

  const _commit = () => {
    console.log(_ref.current?.relationList, '.....')
    const data = {
      orderId: '',
      userId: '',
      channelId: '',
      list: {},
    }
    data.orderId = history.location.state.id
    data.userId = selectData.userId
    data.channelId = selectData.channelId
    data.list = JSON.parse(JSON.stringify(_ref.current?.relationList))
    data.list.map((item) => {
      delete item.key
      delete item.userId
      item.channelScaleList = item.relation
      delete item.relation
      item.channelScaleList.map((item: any) => {
        delete item.subsidy
        delete item.supUserId
        delete item.supUser
        item.rebateFlag = item.haveRebate
        delete item.haveRebate
        item.buildFlag = item.havePresetBonus
        delete item.havePresetBonus
        item.buildScale = item.presetBonus
        delete item.presetBonus
      })
    })
    AllocatedOrderService.submit(data).then((res) => {
      if (res.code === HttpCode.success) {
        message.success('提交成功')
      }
    })
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
      <div className="details-title">订单关联人</div>
      <Table rowKey="id" columns={columnsD} scroll={{ x: 'max-content' }} dataSource={[...dataD]} />
      {history.location.state.mode == 'edit' ? (
        <div className="ReleaseProduct__root">
          <StepView current={current} />
          <div className="steps-content">
            {current == 0 && <ServiceList id={history.location.state.id} setSelectData={setSelectData} />}
            {current == 1 && (
              <ConfigCommission
                orderData={dataD}
                cRef={_ref}
                receiverData={selectData}
                id={history.location.state.id}
              />
            )}
            <div className="btnView">
              <div className="item">
                {current > 0 && (
                  <>
                    <div className="nextBtn prev" onClick={_commit}>
                      确定提交
                    </div>
                  </>
                )}
                <div onClick={() => next()} className="nextBtn">
                  {current === 1 ? '取消' : '下一步'}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <DetailsPage id={history.location.state.id} />
      )}
    </div>
  )
}
export default AllocatedDetailsPage
