import { useStore } from '@/store/context'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import './index.less'

const ProductionListPage: React.FC = observer(() => {
  const [getResult, setGetResult] = useState('')
  const store = useStore()

  return (
    <div className="ProductionList__root">
      <h1 className="title">ProductionList</h1>
    </div>
  )
})

export default ProductionListPage
