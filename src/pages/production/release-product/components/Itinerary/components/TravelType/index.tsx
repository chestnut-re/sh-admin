import { travelTypeKey, travelTypeNameMap } from '@/pages/production/release-product/utils'
import React from 'react'
import './index.less'

interface Props {
  data: any
}

/**
 * 行程项目 后面的类型
 */
const TravelType: React.FC<Props> = ({ data }) => {
  let title = ''

  if (data.travelType === 3) {
    // 酒店
    title = data.travelGoods[travelTypeKey[data.travelType]].hotelName
  } else if (data.travelType === 5) {
    // 景点
    title = data.travelGoods[travelTypeKey[data.travelType]].scenicSpotName
  } else if (data.travelType === 4) {
    // 饭店
    title = data.travelGoods[travelTypeKey[data.travelType]].restaurantName
  } else if (data.travelType === 1) {
    // 机票
    title = data.travelGoods[travelTypeKey[data.travelType]].airline
  } else if (data.travelType === 2) {
    // 大巴
    title = '大巴'
  } else if (data.travelType === 6) {
    // 火车
    title = '火车'
  }

  return (
    <>
      {data.travelType !== 0 && (
        <div className="travelType__root">
          {travelTypeNameMap[data.travelType]} - {title}
        </div>
      )}
    </>
  )
}

export default TravelType
