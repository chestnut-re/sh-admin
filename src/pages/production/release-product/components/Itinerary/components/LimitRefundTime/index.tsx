import { useStore } from '@/store/context'
import { InputNumber } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import './index.less'

/**截止退款时间 */
const LimitOrderTime: React.FC = () => {
  const { productionStore } = useStore()

  const _onChange = (value) => {
    productionStore.addOrderDeadline(value)
  }

  return (
    <div className="LimitOrderTime_root">
      <div className="label">截止退款时间</div>
      <span className="text">出发前</span>
      <div className="inputNumber">
        <InputNumber
          value={productionStore.refundDeadline}
          controls={false}
          size="small"
          min={1}
          onChange={_onChange}
        />
      </div>
      <span className="text">小时</span>
    </div>
  )
}

export default observer(LimitOrderTime)
