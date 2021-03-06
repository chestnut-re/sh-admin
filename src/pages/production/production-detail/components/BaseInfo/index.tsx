import { useStore } from '@/store/context'
import { Col, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import './index.less'

/**
 * 基本信息
 */
const BaseInfo: React.FC = () => {
  const { productionDetailStore } = useStore()
  // document.getElementById('policy').innerHTML = productionDetailStore.data?.refundAndChangePolicy
  return (
    <div className="BaseInfo__root">
      <h4>1. 基本信息</h4>
      <Row className="my-info">
        <Col className="left" span={18}>
          <div>
            商品分类: {productionDetailStore.data?.goodsTypeTag}
            {/* {productionDetailStore.data?.goodsTypeTag.map((item, index) => {
              return <span key={index}> {item}</span>
            })} */}
          </div>
          <div>商品主标题: {productionDetailStore.data?.goodsName}</div>
          <div>商品副标题: {productionDetailStore.data?.goodsNickName}</div>
          <div id="policy">退改政策: {productionDetailStore.data?.refundAndChangePolicy}</div>
          <div className="purchase">
            限购配置：
            <div>增加限购数量: {productionDetailStore.data?.purchaseConfig?.addNum}</div>
            <div>
              任务类型:{' '}
              {productionDetailStore.data?.purchaseConfig?.addType == 1
                ? '下单付款'
                : productionDetailStore.data?.purchaseConfig?.addType == 2
                ? '订单核销'
                : ''}
            </div>
            <div>
              儿童是否占用名额:{' '}
              {productionDetailStore.data?.purchaseConfig?.childOccupation == 0
                ? '否'
                : productionDetailStore.data?.purchaseConfig?.childOccupation == 1
                ? '是'
                : ''}
            </div>
            <div>任务完成次数: {productionDetailStore.data?.purchaseConfig?.finishNum}</div>
            <div>限购天数: {productionDetailStore.data?.purchaseConfig?.purchaseDay}</div>
            <div>限购数量: {productionDetailStore.data?.purchaseConfig?.purchaseNum}</div>
          </div>
        </Col>
        <Col className="right" span={6}>
          <div>创建渠道: {productionDetailStore.data?.createChannelName}</div>
          <div>创建人: {productionDetailStore.data?.updateUserName}</div>
          <div>创建时间: {productionDetailStore.data?.updateTime}</div>
        </Col>
      </Row>
    </div>
  )
}

export default observer(BaseInfo)
