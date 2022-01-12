import useQuery from '@/hooks/useQuery'
import { ProductionService } from '@/service/ProductionService'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './index.less'

/**
 * 上架信息展示: 分中心视角
 */
const PutOnInfoShowSubCenter: React.FC = () => {
  const history = useHistory()
  const query = useQuery()
  const { productionDetailStore } = useStore()
  const [data, setData] = useState<any>({})

  useEffect(() => {
    const id = query.get('id') ?? ''
    ProductionService.channelGoodsListByGoodsId(id).then((res) => {
      setData(res.data)
    })
  }, [])

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  }

  return (
    <div className="PutOnInfoShowSubCenter__root">
      <h4>6. 上架审核处理</h4>
      <div className="info">
        <div className="one-info">
          <div className="canal">申请渠道 </div>
          <div>责任区域 </div>
        </div>
        <div>申请人 </div>
        <div>申请时间 </div>
        <div>分佣方案 </div>
        <div>表格</div>
        {JSON.stringify(data)}
      </div>
    </div>
  )
}

export default observer(PutOnInfoShowSubCenter)
