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
      <div className="box">
        <div className="left">
          <div>添加库存</div>
          <div>代币折现</div>
          <div>分佣方案</div>
        </div>
        <div className="right">
          <div>发布渠道</div>
          <div>上架人</div>
          <div>上架时间</div>
          <div className="btn">
            <button>查看发布审核记录</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(ReleaseInfo)
