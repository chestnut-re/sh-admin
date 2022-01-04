import { useStore } from '@/store/context'
import { observer } from 'mobx-react-lite'
import React from 'react'
import './index.less'

/**
 * 基本信息
 */
const BaseInfo: React.FC = () => {
  const { productionDetailStore } = useStore()

  return (
    <div className="BaseInfo__root">
      <h4>1. 基本信息</h4>
      <div>商品类型标签: {productionDetailStore.data?.goodsTypeTag}</div>
      <div>商品主标题: {productionDetailStore.data?.goodsName}</div>
      <div>商品副标题: {productionDetailStore.data?.goodsNickName}</div>
      <div>退改政策: {productionDetailStore.data?.refundAndChangePolicy}</div>
    </div>
  )
}

export default observer(BaseInfo)
