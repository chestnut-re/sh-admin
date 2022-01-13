import React, { useState, useEffect } from 'react'
import { Input, Form, Table } from 'antd'
import './index.less'
import { AllocatedOrderService } from '@/service/OrderService'
import { HttpCode } from '@/constants/HttpCode'

/**
 * 配置分佣
 */

interface Props {
  receiverData: any
  orderData: any
  id: any
}
const ConfigCommission: React.FC<Props> = ({ orderData, id, receiverData }) => {
  const [form] = Form.useForm()
  const [data, setData] = useState<any>({})
  const [relationList, setRelationList] = useState([])
  const [num, setNum] = useState({})
  useEffect(() => {
    const arr: any[] = []
    console.log(orderData, receiverData, '.......')
    orderData.map((item: any) => {
      if (item.orderShip == '推荐人') {
        arr.push({ type: 1, userId: item.id, orderId: id })
      }
      if (item.orderShip == '从属关系') {
        arr.push({ type: 2, userId: item.id, orderId: id })
      }
      if (item.orderShip == '发团人') {
        arr.push({ type: 4, userId: item.id, orderId: id })
      }
      if (item.orderShip == '买家') {
        arr.push({ type: 5, userId: item.id, orderId: id })
      }
    })
    arr.push({ type: 3, userId: receiverData.userId, orderId: id })
    loadData(arr)
  }, [orderData])

  const columns = [
    {
      title: '姓名',
      dataIndex: 'realName',
    },
    {
      title: '订单关联',
      dataIndex: 'nickName',
    },
    {
      title: '所属归属',
      dataIndex: 'belongChannel',
    },
    {
      title: '责任区域',
      dataIndex: 'address',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '团建奖金',
      dataIndex: 'havePresetBonus',
    },
    {
      title: '当前返利',
      dataIndex: 'haveRebate',
    },
  ]
  const loadData = (arr) => {
    AllocatedOrderService.channelList(arr).then((res) => {
      if (res.code === HttpCode.success) {
        setData(res.data)
        setRelationList(res.data?.relationList)
      }
    })
  }

  const onFinish = (values: any) => {}

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className="config__root">
      <div className="middle">
        <div className="top">
          <span className="topOne">可配置分佣</span>
          <span>{data?.allocationAmount}</span>
          <span className="topOne">剩余可配置</span>
          <span>￥10</span>
        </div>
        <div className="mid">
          {relationList?.map((item: any) => {
            return (
              <>
                <div className="midRight">
                  {item.type == 1 ? <p style={{ textAlign: 'center' }}>关联归属渠道</p> : null}
                  {item.type == 2 ? <p style={{ textAlign: 'center' }}>推荐渠道</p> : null}
                  {item.type == 3 ? <p style={{ textAlign: 'center' }}>服务渠道</p> : null}
                  {item.type == 4 ? <p style={{ textAlign: 'center' }}>从属/服务渠道</p> : null}
                  {item.type == 5 ? <p style={{ textAlign: 'center' }}>推荐/服务渠道</p> : null}
                  {item.type == 6 ? <p style={{ textAlign: 'center' }}>推荐/从属渠道</p> : null}
                  {item.type == 7 ? <p style={{ textAlign: 'center' }}>关联归属/推荐/服务渠道</p> : null}
                  <div className="guanxi">
                    {item.relation?.map((item: any, index) => {
                      return (
                        <>
                          <div className="guanxi" style={{ marginLeft: '62px' }} key={index}>
                            {/* <span style={{ backgroundColor: 'darkgrey', borderRadius: '15px' }}>
                              &nbsp; &nbsp;接单人
                            </span> */}
                            {item.level == 2 ? <span>分中心名称/姓名</span> : null}
                            {item.level == 3 ? <span>三级名称/姓名</span> : null}
                            {item.level == 4 ? <span>四级名称/姓名</span> : null}
                            {item.level == 5 ? <span>五级名称/姓名</span> : null}
                            <Input
                              className="bDer"
                              value={item.index}
                              onChange={(e) => {
                                setNum({ ...item, index: e.target.value })
                              }}
                            />
                            <span>%</span>
                            <span style={{ marginLeft: '10px' }}>
                              ¥{num.index ? data?.allocationAmount * num?.index * 0.01 : 0}
                            </span>
                            <span>发团服务费</span>
                            <Input
                              className="bDer"
                              value={item.service}
                              onChange={(e) => {
                                setNum({ ...item, service: e.target.value })
                              }}
                            />
                            <span>%</span>
                            <span style={{ marginLeft: '10px' }}>
                              ¥{num.service ? data?.allocationAmount * num?.service * 0.01 : 0}
                            </span>
                          </div>
                        </>
                      )
                    })}
                  </div>
                </div>
              </>
            )
          })}
        </div>
      </div>
    </div>
  )
}
export default ConfigCommission
