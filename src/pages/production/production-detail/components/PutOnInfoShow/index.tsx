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
    </div>
  )
}

export default observer(PutOnInfoShow)
