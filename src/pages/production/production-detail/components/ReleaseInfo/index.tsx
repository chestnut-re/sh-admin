import { useStore } from '@/store/context'
import { observer } from 'mobx-react-lite'
import React from 'react'
import './index.less'

/**
 * 发布信息
 */
const ReleaseInfo: React.FC = () => {
  const { productionDetailStore } = useStore()

  return (
    <div className="ReleaseInfo__root">
      <h4>4. 发布信息</h4>
      <div></div>
    </div>
  )
}

export default observer(ReleaseInfo)
