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
  return <>{travelMode === 0 ? '固定' : '约定'}</>
}

export default TravelModeColumn
