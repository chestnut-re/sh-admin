import React, { useEffect, useState, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import './index.less'
import BaseInfo from './components/BaseInfo'
import Itinerary from './components/Itinerary'
import StepView from './components/StepView'
import { useStore } from '@/store/context'
import { ProductionService } from '@/service/ProductionService'
import { message } from 'antd'
import { useHistory } from 'react-router-dom'
import useQuery from '@/hooks/useQuery'

/**
 * 商品管理-发布商品
 */
const ReleaseProductPage: React.FC = () => {
  const history = useHistory()
  const query = useQuery()
  const { productionStore } = useStore()
  // 详情页模式
  const [current, setCurrent] = useState(0)
  const baseInfoRef = useRef<any>()
  const itineraryRef = useRef<any>()

  useEffect(() => {
    console.log(query.get('id'))
    if (query.get('id')) {
      // 编辑
      ProductionService.get(query.get('id') ?? '').then((res) => {
        console.log(res)
        productionStore.initData(res.data)
      })
    } else {
      // 添加
      productionStore.initData()
    }

    return () => {
      productionStore.clearData()
    }
  }, [])

  /**下一步 */
  const next = () => {
    if (current === 0) {
      baseInfoRef.current.next()
      setCurrent(current + 1)
    } else if (current == 1) {
      const postData = { ...productionStore.data }
      postData.inDraftBox = 0 // 非草稿箱，待发布
      ProductionService.save(postData).then((res) => {
        console.log(res)
        if (res.code === '200') {
          message.success('成功')
          history.goBack()
        } else {
          message.error(res.msg)
        }
      })
    }
  }

  const prev = () => {
    setCurrent(current - 1)
  }

  /**
   * 保存草稿箱
   */
  const onDraft = () => {
    if (current === 0) {
      baseInfoRef.current.next()
    }
    const postData = { ...productionStore.data }
    postData.inDraftBox = 1 // 草稿箱
    ProductionService.save(postData).then((res) => {
      if (res.code === '200') {
        message.success('成功')
        history.goBack()
      } else {
        message.error(res.msg)
      }
    })
  }

  return (
    <div className="ReleaseProduct__root">
      <StepView current={current} />
      <div className="steps-content">
        {current == 0 && <BaseInfo ref={baseInfoRef} />}
        {current == 1 && <Itinerary ref={itineraryRef} />}

        <div className="btnView">
          <div className="item">
            {current > 0 && (
              <div onClick={() => prev()} className="nextBtn prev">
                上一步
              </div>
            )}
            <div onClick={() => next()} className="nextBtn">
              {current === 1 ? '提交至待发布' : '下一步'}
            </div>
          </div>

          <div onClick={() => onDraft()} className="draftBtn">
            保存至草稿箱
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(ReleaseProductPage)
