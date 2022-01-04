import React from 'react'

interface Props {
  checkState: string
}

/**
 * 商品审核状态
 */
const GoodsAuditState: React.FC<Props> = ({ checkState }) => {
  // （0待审核，1商品审核通过，2商品审核不通过）
  const map = {
    0: '待审核',
    1: '通过',
    2: '不通过',
  }
  return <p>{map[checkState]}</p>
}

export default GoodsAuditState
