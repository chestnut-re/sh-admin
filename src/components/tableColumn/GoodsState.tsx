import React from 'react'

interface Props {
  state: string
}

/**
 * 商品状态
 */
const GoodsState: React.FC<Props> = ({ state }) => {
  const map = {
    0: '禁用',
    1: '待发布', // 对于分中心来说就是 待上架
    2: '已发布', // 对于分中心来说就是 待发布
    3: '已下架',
    4: '失效',
  }
  return <>{map[state]}</>
}

export default GoodsState
