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
      <div className="my-info">
        <div className="left">
          <div>商品类型标签: {productionDetailStore.data?.goodsTypeTag}</div>
          <div>商品主标题: {productionDetailStore.data?.goodsName}</div>
          <div>商品副标题: {productionDetailStore.data?.goodsNickName}</div>
          <div>退改政策: {productionDetailStore.data?.refundAndChangePolicy}</div>
        </div>
        <div className="right">
          <div>创建渠道: {productionDetailStore.data?.createChannelName}</div>
          <div>创建人: {productionDetailStore.data?.createUserName}</div>
          <div>创建时间: {productionDetailStore.data?.createTime}</div>
        </div>
      </div>
    </div>
  )
}

export default observer(BaseInfo)
