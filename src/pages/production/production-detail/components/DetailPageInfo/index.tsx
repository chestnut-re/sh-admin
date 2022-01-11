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
          <div className="item-name">首页</div>
          <div className="title">模版名称: {productionDetailStore.data?.goodsDetail.goodsDetailStart.pageTemplate}</div>
          <div className="title">
            图片素材:
            <div className="title-box">
              <div>
                <div className="pic-box">
                  <img src={productionDetailStore.data?.goodsDetail.goodsDetailStart.goodsTypeTagImage} alt="" />
                </div>
                <div>商品类型</div>
              </div>
              <div>
                <div className="pic-box">
                  <img src={productionDetailStore.data?.goodsDetail.goodsDetailStart.detailTitleImage} alt="" />
                </div>
                <div>商品名称</div>
              </div>
              <div>
                <div className="pic-box">
                  <img src={productionDetailStore.data?.goodsDetail.goodsDetailStart.detailDescImage} alt="" />
                </div>
                <div>商品简介</div>
              </div>
              <div>
                <div className="pic-box">
                  <img src={productionDetailStore.data?.goodsDetail.goodsDetailStart.backgroundImage} alt="" />
                </div>
                <div>背景</div>
              </div>
              <div>
                <div className="pic-box">
                  <img src={productionDetailStore.data?.goodsDetail.goodsDetailStart.submitOrderImage} alt="" />
                </div>
                <div>按钮</div>
              </div>
              <div>
                <div className="pic-box">
                  <img src={productionDetailStore.data?.goodsDetail.goodsDetailStart.priceImage} alt="" />
                </div>
                <div>价格</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {productionDetailStore.data?.goodsDetail.goodsDetailPage.map((item, index) => {
            // return (
            //   <div key={index} className="item">
            //     <div className="item-name">内容页{index + 1}</div>
            //     <div className="title">模版名称: {item.pageTemplate}</div>
            //     <div className="title">
            //       图片素材:
            //       <div className="title-box">
            //         <div>
            //           <div className="pic-box">
            //             <img src={item.detailTitleImage} alt="" />
            //           </div>
            //           <div>商品名称</div>
            //         </div>
            //         {item?.contentImages?.map((it, i) => {
            //           return (
            //             <div key={i}>
            //               <div className="pic-box">
            //                 <img src={it} alt="" />
            //               </div>
            //               <div>轮播图{i + 1}</div>
            //             </div>
            //           )
            //         })}
            //         <div>
            //           <div className="pic-box">
            //             <img src={item.detailDescImage} alt="" />
            //           </div>
            //           <div>商品简介</div>
            //         </div>
            //         <div>
            //           <div className="pic-box">
            //             <img src={item.backgroundImage} alt="" />
            //           </div>
            //           <div>背景</div>
            //         </div>
            //         <div>
            //           <div className="pic-box">
            //             <img src={item.submitOrderImage} alt="" />
            //           </div>
            //           <div>按钮</div>
            //         </div>
            //         <div>
            //           <div className="pic-box">
            //             <img src={item.priceImage} alt="" />
            //           </div>
            //           <div>价格</div>
            //         </div>
            //       </div>
            //     </div>
            //   </div>
            // )
          })}
        </div>
        <div className="end">
          <div className="item-name">尾页</div>
          <div className="title">模版名称: {productionDetailStore.data?.goodsDetail.goodsDetailEnd.pageTemplate}</div>
          <div className="title">
            图片素材:
            <div className="title-box">
              <div>
                <div className="pic-box">
                  <img src={productionDetailStore.data?.goodsDetail.goodsDetailEnd.detailTitleImage} alt="" />
                </div>
                <div>商品名称</div>
              </div>
              <div>
                <div className="pic-box">
                  <img src={productionDetailStore.data?.goodsDetail.goodsDetailEnd.detailDescImage} alt="" />
                </div>
                <div>商品简介</div>
              </div>
              <div>
                <div className="pic-box">
                  <img src={productionDetailStore.data?.goodsDetail.goodsDetailEnd.backgroundImage} alt="" />
                </div>
                <div>背景</div>
              </div>
              <div>
                <div className="pic-box">
                  <img src={productionDetailStore.data?.goodsDetail.goodsDetailEnd.submitOrderImage} alt="" />
                </div>
                <div>按钮</div>
              </div>
              <div>
                <div className="pic-box">
                  <img src={productionDetailStore.data?.goodsDetail.goodsDetailEnd.priceImage} alt="" />
                </div>
                <div>价格</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div>{JSON.stringify(productionDetailStore.data?.goodsDetail)}</div> */}
    </div>
  )
}

export default observer(DetailPageInfo)
