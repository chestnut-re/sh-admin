import useQuery from '@/hooks/useQuery'
import { ProductionService } from '@/service/ProductionService'
import { Row } from 'antd'
import React, { useEffect } from 'react'

/**
 * 商品配置详情页
 */
const ProductionConfigDetail: React.FC = () => {
  const query = useQuery()

  useEffect(() => {
    console.log(query.get('id'))
    ProductionService.get(query.get('id') ?? '').then((res) => {
      console.log(res)
    })
  }, [])
  return <Row>商品配置详情页</Row>
}

export default ProductionConfigDetail
