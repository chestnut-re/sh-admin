import { getNanoId } from '@/utils/nanoid'
import { formateTime } from '@/utils/timeUtils'

/**商品详情页 */
export enum ProductionMode {
  /**创建 */
  create,
}

/**获取 Step信息 */
export const getStepsInfo = (): any => {
  return [
    {
      title: '基础信息',
      index: 0,
    },
    {
      title: '行程信息',
      index: 1,
    },
  ]
}

/**获取 Panes 数据 */
export const createPanesData = (data: any): any[] => {
  return data.goodsPrices.map((item) => {
    if (item.startDate !== item.endDate) {
      return {
        title: `${formateTime(item.startDate, 'YYYY-MM-DD')}-${formateTime(item.endDate, 'YYYY-MM-DD')}`,
        key: item.key,
        travels: item.travels,
      }
    } else {
      return { title: formateTime(item.startDate, 'YYYY-MM-DD'), key: item.key, travels: item.travels }
    }
  })
}

/**
 * 行程
 */
export const whatDay = {
  0: '第一天',
  1: '第二天',
  2: '第三天',
  3: '第四天',
  4: '第五天',
  5: '第六天',
  6: '第七天',
  7: '第八天',
  8: '第九天',
  9: '第十天',
  10: '第十一天',
  11: '第十二天',
  12: '第十三天',
  13: '第十四天',
  14: '第十五天',
}

/**类型 */
export const travelTypeNameMap = {
  0: '',
  1: '机票',
  2: '大巴',
  3: '酒店',
  4: '饭店',
  5: '景点',
  6: '火车',
}

export const travelTypeKey = {
  0: '',
  1: 'airTicket',
  2: 'bus',
  3: 'hotel',
  4: 'restaurant',
  5: 'scenicSpot',
  6: 'train',
}

/**行程Item 类型 */
export type TravelType = 0 | 1 | 2 | 3 | 4 | 5 | 6

/**交通方式 1：飞机 2：火车 3：大巴 */
export type TransportationType = 1 | 2 | 3
