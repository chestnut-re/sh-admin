import useQuery from '@/hooks/useQuery'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './index.less'

/**
 * 上架信息展示
 */
const PutOnInfoShow: React.FC = () => {
  const history = useHistory()
  const query = useQuery()
  const { productionDetailStore } = useStore()

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  }

  return (
    <div className="PutOnInfoShow__root">
      <h4>5. 上架信息</h4>
      <div className="info">
        <div className="one-info">
          <div className="canal">申请渠道 </div>
          <div>责任区域 </div>
        </div>
        <div>申请人 </div>
        <div>申请时间 </div>
        <div>分佣方案 </div>
        <div>表格</div>
      </div>
    </div>
  )
}

export default observer(PutOnInfoShow)
