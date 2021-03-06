import React, { useState, useEffect, useImperativeHandle } from 'react'
import { Input, message } from 'antd'
import './index.less'
import { AllocatedOrderService } from '@/service/OrderService'
import { HttpCode } from '@/constants/HttpCode'
import { getNanoId } from '@/utils/nanoid'
import { cloneDeep } from 'lodash'

/**
 * 配置分佣
 */

interface Props {
  receiverData: any
  orderData: any
  id: any
}
const ConfigCommission: React.FC<Props> = ({ orderData, id, receiverData, cRef }) => {
  const [data, setData] = useState<any>({})
  const [relationList, setRelationList] = useState<any[]>([])
  const [sums, setSums] = useState(0)
  useEffect(() => {
    const arr: any[] = []
    orderData.map((item: any) => {
      if (item.orderShip == '推荐人') {
        arr.push({ type: 1, userId: item.id, orderId: id })
      }
      if (item.orderShip == '从属关系') {
        arr.push({ type: 2, userId: item.id, orderId: id })
      }
      if (item.orderShip == '接单人') {
        arr.push({ type: 3, userId: item.id, orderId: id })
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

  useEffect(() => {
    setSums(0)
    relationList?.map((item) => {
      if (item.buildScale) {
        setSums((prevState) => prevState + parseInt(item.buildScale))
      }
      item?.relation.map((item: any) => {
        if (item.scale) {
          setSums((prevState) => prevState + parseInt(item.scale))
        }
      })
    })
  }, [relationList])

  useEffect(() => {
    if (sums > 100) {
      message.error('分佣比例不可超过100%,请重新调整分佣比例')
    }
  }, [sums])

  useImperativeHandle(cRef, () => ({
    relationList,
  }))

  const loadData = (arr) => {
    AllocatedOrderService.channelList(arr).then((res) => {
      if (res.code === HttpCode.success) {
        setData(res.data)
        setRelationList(
          res.data?.relationList.map((i) => {
            i.key = getNanoId()
            return i
          })
        )
      }
    })
  }
  return (
    <div className="config__root">
      <div className="middle">
        <div className="top">
          <span className="topOne">可配置分佣</span>
          <span>¥{data?.allocationAmount / 1000}</span>
          <span className="topOne">剩余可配置</span>
          <span>￥{((data?.allocationAmount / 100000) * (100 - sums)).toFixed(2)} </span>
        </div>
        <div className="mid">
          {relationList?.map((item: any) => {
            return (
              <div className="midRight" key={item.key}>
                {item.type == 1 ? <p style={{ textAlign: 'center' }}>推荐渠道</p> : null}
                {item.type == 2 ? <p style={{ textAlign: 'center' }}>关联归属渠道</p> : null}
                {item.type == 3 ? <p style={{ textAlign: 'center' }}>服务渠道</p> : null}
                {item.type == 4 ? <p style={{ textAlign: 'center' }}>从属/服务渠道</p> : null}
                {item.type == 5 ? <p style={{ textAlign: 'center' }}>推荐/服务渠道</p> : null}
                {item.type == 6 ? <p style={{ textAlign: 'center' }}>推荐/从属渠道</p> : null}
                {item.type == 7 ? <p style={{ textAlign: 'center' }}>关联归属/推荐/服务渠道</p> : null}
                <div className="guanxi">
                  {item.buildScale ? (
                    <p>
                      团建奖金{item.buildScale}% ¥{((data?.allocationAmount / 100000) * item.buildScale).toFixed(2)}
                    </p>
                  ) : (
                    ''
                  )}
                  {item.relation?.map((item: any, index) => {
                    return (
                      <div className="guanxi" style={{ marginLeft: '62px' }} key={index}>
                        {orderData.map((i) => {
                          if (i.id == item.userId) {
                            return (
                              <span
                                style={{
                                  backgroundColor: 'darkgrey',
                                  borderRadius: '15px',
                                  textAlign: 'center',
                                  padding: '0 2px',
                                }}
                              >
                                {i.orderShip}
                              </span>
                            )
                          }
                        })}
                        <span
                          style={{
                            display: 'inline-block',
                            backgroundColor: 'darkgrey',
                            borderRadius: '15px',
                            textAlign: 'center',
                            padding: '0 2px',
                          }}
                        >
                          {receiverData.userId == item.userId ? '接单人' : null}
                          {item.havePresetBonus ? '有团建奖' : null}
                          {item.haveRebate ? '有返利' : null}
                        </span>
                        {item.level == 2 ? (
                          <span>
                            分中心&nbsp;&nbsp;{item.channelName}/{item.userName}
                          </span>
                        ) : null}
                        {item.level == 3 ? (
                          <span>
                            三级&nbsp;&nbsp;{item.channelName}/{item.userName}
                          </span>
                        ) : null}
                        {item.level == 4 ? (
                          <span>
                            四级&nbsp;&nbsp;{item.channelName}/{item.userName}
                          </span>
                        ) : null}
                        {item.level == 5 ? (
                          <span>
                            五级&nbsp;&nbsp;{item.channelName}/{item.userName}
                          </span>
                        ) : null}
                        {item.level == null ? <span>{item.userName}</span> : null}
                        <Input
                          className="bDer"
                          value={item.scale}
                          onChange={(e) => {
                            item['scale'] = e.target.value
                            setRelationList(cloneDeep(relationList))
                          }}
                        />
                        <span>%</span>
                        <span style={{ marginLeft: '10px' }}>
                          ¥{item.scale ? ((data?.allocationAmount / 100000) * item.scale).toFixed(2) : 0}
                        </span>
                        {item.serviceScale ? (
                          <>
                            <span>发团服务费</span>
                            <Input
                              className="bDer"
                              value={item.serviceScale}
                              onChange={(e) => {
                                item['serviceScale'] = e.target.value
                                setRelationList(cloneDeep(relationList))
                              }}
                            />

                            <span>%</span>
                            <span style={{ marginLeft: '10px' }}>
                              ¥
                              {item.serviceScale
                                ? ((data?.allocationAmount / 100000) * item.serviceScale).toFixed(2)
                                : 0}
                            </span>
                          </>
                        ) : (
                          ''
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
export default ConfigCommission
