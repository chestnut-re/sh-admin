import { useStore } from '@/store/context'
import { observer } from 'mobx-react-lite'
import React from 'react'
import './index.less'

/**
 * 移动详情页信息
 */
const DetailPageInfo: React.FC = () => {
  const { productionDetailStore } = useStore()

  return (
    <div className="DetailPageInfo__root">
      <h4>3. 移动详情页信息</h4>
      <div>{JSON.stringify(productionDetailStore.data?.goodsDetail)}</div>
    </div>
  )
}

export default observer(DetailPageInfo)
