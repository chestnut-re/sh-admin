import dayjs from 'dayjs'
import React from 'react'

interface Props {
  travelMode: number
}

/**
 * 出行类型
 */
const TravelModeColumn: React.FC<Props> = ({ travelMode }) => {
  // if (!travelMode) return <p></p>
  return <p>{travelMode === 0 ? '固定时间出行' : '约定时间出行'}</p>
}

export default TravelModeColumn
