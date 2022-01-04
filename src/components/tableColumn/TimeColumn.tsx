import dayjs from 'dayjs'
import React from 'react'

interface Props {
  time: string
}

/**
 * 时间列
 */
const TimeColumn: React.FC<Props> = ({ time }) => {
  if (!time) {
    return <p></p>
  }
  return <p>{dayjs(time).format('YYYY-MM-DD HH:mm:ss')}</p>
}

export default TimeColumn
