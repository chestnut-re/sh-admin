/*
 * @Description:
 * @LastEditTime: 2021-12-20 11:12:35
 */

import moment from 'moment'
export const dayjsFormat = (date: string, format: string) => {
 return moment(date, format)
}
