/*
 * @Description:
 * @LastEditTime: 2022-01-10 17:28:30
 */
/*
 * @Description: APP营销
 * @LastEditTime: 2022-01-05 11:45:23
 */
import { Space, InputNumber } from 'antd'
import React, { useEffect, useState } from 'react'
import { ConfigRefundService } from '@/service/OrderService'
const OrderIsSet: React.FC = () => {
  const [order, setOrder] = useState(0)
  const [stroke, setStroke] = useState(0)
  const onChange = (activeKey: string) => {
    console.log(activeKey)
  }
  useEffect(() => {
    ConfigRefundService.getSet({}).then((res) => {
      console.log(Number(res.data?.records[0].dictValue), '---')
      setOrder(Number(res.data?.records[0].dictValue))
      setStroke(Number(res.data?.records[1].dictValue))
    })
  }, [])

  const onChangeOrder = (e) => {
    ConfigRefundService.orderSettings({
      typeCode: 1,
      dictValue: e,
    }).then((res) => {
      setOrder(e)
    })
  }
  const onChangeStroke = (e) => {
    // setStroke(e)
    ConfigRefundService.orderSettings({
      typeCode: 2,
      dictValue: e,
    }).then((res) => {
      setStroke(e)
    })
  }

  return (
    <div className="OrderIsSet__root">
      <div>
        <Space>
          正常订单超过 <InputNumber onChange={onChangeOrder} addonAfter="分" value={order} />
          未付款，订单自动失效
        </Space>
      </div>
      <div style={{ marginTop: '20px' }}>
        <Space>
          行 程 超 过 &emsp;<InputNumber onChange={onChangeStroke} addonAfter="时" value={stroke} />
          未结束，自动结束行程
        </Space>
      </div>
    </div>
  )
}

export default OrderIsSet
