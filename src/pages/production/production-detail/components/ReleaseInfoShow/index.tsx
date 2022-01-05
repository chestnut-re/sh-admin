import useQuery from '@/hooks/useQuery'
import { ProductionService } from '@/service/ProductionService'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './index.less'

/**
 * 发布信息展示
 */
const ReleaseInfoShow: React.FC = () => {
  const history = useHistory()
  const query = useQuery()
  const { productionDetailStore } = useStore()
  const [data, setData] = useState<any>({})

  useEffect(() => {
    console.log(query.get('id'))
    ProductionService.get(query.get('id') ?? '').then((res) => {
      console.log(res)
      productionDetailStore.init(res.data)
    })

    return () => {
      productionDetailStore.clearData()
    }
  }, [])

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  }

  useEffect(() => {
    const id = query.get('goodsId') ?? ''
    ProductionService.getPublishCheckInfo(id).then((res) => {
      setData(res.data)
    })
  }, [])

  return (
    <div className="ReleaseInfoShow__root">
      <h4>4. 发布信息</h4>
      <div>{JSON.stringify(data)}</div>
      <div className="box">
        <div className="left">
          <div>审核结果 {data?.checkState == 1 ? '通过' : '不通过'}</div>
          <div>添加库存</div>
          <div>代币抵现</div>
          <div>
            <div>手工补现</div>
            <div>
              <div>
                <div>补销量</div>
                <div>补点赞量</div>
                <div>补分享量</div>
              </div>
              <div>手工补量直接影响前端展示数值，商品的数据由真实销量和手工补量构成</div>
            </div>
          </div>
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

export default observer(ReleaseInfoShow)
