import useQuery from '@/hooks/useQuery'
import { ProductionService } from '@/service/ProductionService'
import { useStore } from '@/store/context'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import BaseInfo from './components/BaseInfo'
import DetailPageInfo from './components/DetailPageInfo'
import PutOnInfo from './components/PutOnInfo'
import PutOnInfoShow from './components/PutOnInfoShow'
import ReleaseInfo from './components/ReleaseInfo'
import ReleaseInfoShow from './components/ReleaseInfoShow'
import TravelInfo from './components/TravelInfo'

/**
 * 商品详情页
 */
const ProductionDetail: React.FC = () => {
  const query = useQuery()
  const { productionDetailStore } = useStore()
  const history = useHistory()

  useEffect(() => {
    console.log(query.get('id'), query.get('type'))
    ProductionService.get(query.get('id') ?? '').then((res) => {
      console.log(res)
      productionDetailStore.init(res.data)
    })

    return () => {
      productionDetailStore.clearData()
    }
  }, [])

  const type = query.get('type')

  return (
    <div>
      {/* 基本信息 */}
      <BaseInfo />
      {/* 行程信息 */}
      <TravelInfo />
      {/* 移动页详情信息 */}
      <DetailPageInfo />
      {/* 发布审核 ->发布信息 */}
      {type === 'publish' && <ReleaseInfo />}
      {/* 上架审核 ->发布信息 */}
      {type === 'release' && <ReleaseInfoShow />}
      {/* 上架审核 -> 上架信息 */}
      {type === 'release' && <PutOnInfo />}
      {/* 查看详情 */}
      {type === 'detail' && <PutOnInfoShow />}
    </div>
  )
}

export default ProductionDetail
