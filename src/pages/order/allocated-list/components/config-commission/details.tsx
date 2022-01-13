import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Input, Form, Table } from 'antd'
import './index.less'
import { AllocatedOrderService } from '@/service/OrderService'
import { HttpCode } from '@/constants/HttpCode'
import { getNanoId } from '@/utils/nanoid'
import { cloneDeep } from 'lodash'

/**
 * 查看分佣
 */

interface Props {
  id: any
}
const DetailsPage: React.FC<Props> = ({ id }) => {
  const [data, setData] = useState<any>({})
  const [relationList, setRelationList] = useState<any[]>([])
  useEffect(() => {
    loadData()
  }, [id])
  const loadData = () => {
    AllocatedOrderService.getScale({ orderId: id }).then((res) => {
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
          <span>{data?.allocationAmount}</span>
          <span className="topOne">剩余可配置</span>
          <span>￥10</span>
        </div>
        <div className="mid">
          {relationList?.map((item: any) => {
            return (
              <div className="midRight" key={item.key}>
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
                      <div className="guanxi" style={{ marginLeft: '62px' }} key={index}>
                        {item.haveRebate ? (
                          <p>
                            团建奖金{item.presetBonus}% ¥{data?.allocationAmount * item.presetBonus}
                          </p>
                        ) : (
                          ''
                        )}
                        <span style={{ backgroundColor: 'darkgrey', borderRadius: '15px' }}>
                          {item.havePresetBonus ? '有团建奖' : null}
                          {item.haveRebate ? '有返利' : null}
                        </span>
                        {item.level == 2 ? (
                          <span>
                            分中心{item.channelName}/{item.userName}
                          </span>
                        ) : null}
                        {item.level == 3 ? (
                          <span>
                            三级{item.channelName}/{item.userName}
                          </span>
                        ) : null}
                        {item.level == 4 ? (
                          <span>
                            四级{item.channelName}/{item.userName}
                          </span>
                        ) : null}
                        {item.level == 5 ? (
                          <span>
                            五级{item.channelName}/{item.userName}
                          </span>
                        ) : null}
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
                          ¥{item.scale ? data?.allocationAmount * item.scale * 0.01 : 0}
                        </span>
                        {item.haveServiceBonus ? (
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
                              ¥{item.serviceScale ? data?.allocationAmount * item.serviceScale * 0.01 : 0}
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
export default DetailsPage
