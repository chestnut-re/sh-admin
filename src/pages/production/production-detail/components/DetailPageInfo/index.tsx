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
      <div className="info">
        <div className="item">
          <div className="item-name">{productionDetailStore.data?.goodsDetail.goodsDetailStart.pageTemplate}</div>
          <div className="title">商品名称: {}</div>
          <div className="title">商品标签: {}</div>
          <div className="title">模版名称: {}</div>
          <div className="title">图片素材: {}</div>
          <div className="title">商品名称: {}</div>
        </div>
        <div>
          {productionDetailStore.data?.goodsDetail.goodsDetailPage.map((item, index) => {
            return (
              <div key={index} className="item">
                <div className="item-name">{item.pageTemplate}</div>
                <div className="title">商品名称: {}</div>
                <div className="title">商品标签: {}</div>
                <div className="title">模版名称: {}</div>
                <div className="title">图片素材: {}</div>
                <div className="title">价格: {}</div>
              </div>
            )
          })}
        </div>
        <div className="end">
          <div className="item-name">{productionDetailStore.data?.goodsDetail.goodsDetailEnd.pageTemplate}</div>
          <div className="title">商品名称: {}</div>
          <div className="title">商品标签: {}</div>
          <div className="title">模版名称: {}</div>
          <div className="title">图片素材: {}</div>
          <div className="title">商品名称: {}</div>
        </div>
      </div>

      {/* <div>{JSON.stringify(productionDetailStore.data?.goodsDetail)}</div> */}
    </div>
  )
}

export default observer(DetailPageInfo)
