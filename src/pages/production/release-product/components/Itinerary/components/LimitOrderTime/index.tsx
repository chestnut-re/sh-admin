import { useStore } from '@/store/context'
import { InputNumber } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import './index.less'

/**截止退款时间 */
const LimitRefundTime: React.FC = () => {
  const { productionStore } = useStore()

  const _onChange = (value) => {
    //TODO：add
    productionStore.addOrderDeadline(value)
  }

  return (
    <div className="LimitRefundTime__root">
      <div className="label">截止下单时间</div>
      <span className="text">出发前</span>
      <div className="inputNumber">
        <InputNumber
          controls={false}
          size="small"
          value={productionStore.orderDeadline}
          min={1}
          max={100}
          defaultValue={24}
          onChange={_onChange}
        />
      </div>
      <span className="text">小时</span>
    </div>
  )
}

export default observer(LimitRefundTime)
