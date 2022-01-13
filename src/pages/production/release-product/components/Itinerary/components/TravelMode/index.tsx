import { useStore } from '@/store/context'
import { Modal, Radio } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'

import './index.less'

/**
 * 出行时间累心
 */
const TravelModel: React.FC = () => {
  const { productionStore } = useStore()

  return (
    <div className="TravelModel__root">
      出行时间:
      <Radio.Group
        value={productionStore.data.travelMode}
        buttonStyle="solid"
        onChange={(value) => {
          Modal.confirm({
            title: '提示',
            content: '修改出行类型后将清空行程信息。',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
              productionStore.setTravelMode(value.target.value)
            },
          })
        }}
      >
        <Radio.Button value={0}>固定时间</Radio.Button>
        <Radio.Button value={1}>约定时间</Radio.Button>
      </Radio.Group>
      <div>至少出行前48小时，最长不得超过45天</div>
    </div>
  )
}

export default observer(TravelModel)
