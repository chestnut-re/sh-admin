import useQuery from '@/hooks/useQuery'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './index.less'

/**
 * 发布信息展示
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
      <h4>4. 发布信息</h4>
    </div>
  )
}

export default observer(PutOnInfoShow)
