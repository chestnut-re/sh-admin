import useQuery from '@/hooks/useQuery'
import { ProductionService } from '@/service/ProductionService'
import { useStore } from '@/store/context'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import BaseInfo from './components/BaseInfo'
import CenterPutOnRequest from './components/CenterPutOnRequest'
import CenterPutOnRequestShow from './components/CenterPutOnRequestShow'
import CenterPutOnRequestShowSubCenter from './components/CenterPutOnRequestShowSubCenter'
import DetailPageInfo from './components/DetailPageInfo'
import PutOnInfo from './components/PutOnInfo'
import PutOnInfoShow from './components/PutOnInfoShow'
import PutOnInfoShowSubCenter from './components/PutOnInfoShowSubCenter'
import ReleaseInfo from './components/ReleaseInfo'
import ReleaseInfoShow from './components/ReleaseInfoShow'
import TravelInfo from './components/TravelInfo'

import './index.less'
/**
 * 商品详情页
 */
const ProductionDetail: React.FC = () => {
  const query = useQuery()
  const { adminStore, productionDetailStore } = useStore()
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

  console.log('adminStore.isSubCenter', adminStore.isSubCenter)

  return (
    <div className="ProductionDetail__root">
      {/* 基本信息 */}
      <BaseInfo />
      {/* 行程信息 */}
      <TravelInfo />
      {/* 移动页详情信息 */}
      {type !== 'unRelease' && <DetailPageInfo />}

      {/* 3 发布审核*/}
      {type === 'publish' && <ReleaseInfo />}
      {(type === 'release' ||
        type === 'publishCheck' ||
        type === 'releaseCheck' ||
        type === 'centerPublish' ||
        type === 'detailList') && <ReleaseInfoShow />}

      {/* 4 分中心 上架申请 centerPublish */}
      {type === 'centerPublish' && <CenterPutOnRequest />}
      {(type === 'release' || type === 'releaseCheck' || type === 'detailList') && adminStore.isSubCenter() && (
        <CenterPutOnRequestShowSubCenter />
      )}
      {(type === 'release' || type === 'releaseCheck' || type === 'detailList') && !adminStore.isSubCenter() && (
        <CenterPutOnRequestShow />
      )}

      {/* 上架审核  */}
      {type === 'release' && <PutOnInfo />}

      {/* 查看详情页 */}
      {/* {adminStore.isSubCenter() && (type === 'detail' || type === 'detailList') && <PutOnInfoShowSubCenter />}
      {!adminStore.isSubCenter() && (type === 'detail' || type === 'detailList') && <PutOnInfoShow />} */}
      {/* {type === 'release' && <PutOnInfoShow />} */}
    </div>
  )
}

export default ProductionDetail
