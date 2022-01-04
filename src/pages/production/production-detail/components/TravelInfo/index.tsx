import { useStore } from '@/store/context'
import { observer } from 'mobx-react-lite'
import React from 'react'
import './index.less'

/**
 * 行程信息
 */
const TravelInfo: React.FC = () => {
  const { productionDetailStore } = useStore()

  return (
    <div className="TravelInfo__root">
      <h4>2. 行程信息</h4>
      <div>{JSON.stringify(productionDetailStore.data?.goodsPrices)}</div>
    </div>
  )
}

export default observer(TravelInfo)
