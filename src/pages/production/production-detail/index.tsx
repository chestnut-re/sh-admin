import useQuery from '@/hooks/useQuery'
import { ProductionService } from '@/service/ProductionService'
import { useStore } from '@/store/context'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import BaseInfo from './components/BaseInfo'

/**
 * 商品详情页
 */
const ProductionDetail: React.FC = () => {
  const query = useQuery()
  const { productionDetailStore } = useStore()
  const history = useHistory()

  useEffect(() => {
    console.log(query.get('goodsId'))
    ProductionService.get(query.get('goodsId') ?? '').then((res) => {
      console.log(res)
      productionDetailStore.init(res.data)
    })

    return () => {
      productionDetailStore.clearData()
    }
  }, [])

  return (
    <div>
      商品详情页
      <BaseInfo />
    </div>
  )
}

export default ProductionDetail
