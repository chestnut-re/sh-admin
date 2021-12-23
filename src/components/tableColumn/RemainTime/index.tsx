import dayjs from 'dayjs'
import React from 'react'
import { deprecate } from 'util'
import './index.less'

interface Props {
  endDate: any
}

/**
 * 剩余时间
 */
const RemainTime: React.FC<Props> = ({ endDate }) => {
  //时分秒换算
  const calculateDiffTime = (start_time: any, endTime: any) => {
    const timeDiff: any = endTime - start_time
    let day: any = parseInt(timeDiff / 86400)
    let hour: any = parseInt((timeDiff % 86400) / 3600)
    let minute: any = parseInt(((timeDiff % 86400) % 3600) / 60)
    let second: any = parseInt((((timeDiff % 86400) % 3600) % 60) % 60)
    day = day ? day + '天' : ''
    hour = hour ? hour + '时' : ''
    minute = minute ? minute + '分' : ''
    second = second ? second + '秒' : ''
    return day + hour + minute + second
  }
  if (endDate) {
    const now = dayjs().unix()
    const end = dayjs(endDate.split('+')[0]).unix() || null
    if (end) {
      if (end < now) {
        return 0
      } else {
        return calculateDiffTime(now, end)
      }
    } else {
      return null
    }
  } else {
    return null
  }

  return <p></p>
}
export default RemainTime
