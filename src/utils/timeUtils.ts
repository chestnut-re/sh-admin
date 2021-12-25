/**
 * 时间格式化工具
 */
import dayjs from 'dayjs'

/**
 * 时间格式化
 */
export const formateTime = (date, formate = 'YYYY-MM-DD HH:mm:ss') => {
  if (!date) return
  return dayjs(date).format(formate)
}

/**
 * 两个时间差
 */
export const diffTime = (date1: dayjs.Dayjs, date2: dayjs.Dayjs) => {
  return date1.diff(date2)
}
