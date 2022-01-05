import useQuery from '@/hooks/useQuery'
import { ProductionService } from '@/service/ProductionService'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './index.less'

/**
 * 分中心上架申请 展示
 */
const CenterPutOnRequestShow: React.FC = () => {
  const history = useHistory()
  const query = useQuery()
  const { productionDetailStore } = useStore()
  const [data, setData] = useState<any>({})

  useEffect(() => {
    const id = query.get('id') ?? ''
    ProductionService.centerPutOnRequestGet(id).then((res) => {
      setData(res.data)
    })
  }, [])

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  }

  return (
    <div className="CenterPutOnRequestShow__root">
      <h4>5. 上架申请信息</h4>
      <div>{JSON.stringify(data)}</div>
    </div>
  )
}

export default observer(CenterPutOnRequestShow)
