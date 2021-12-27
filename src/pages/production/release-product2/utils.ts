import { getNanoId } from '@/utils/nanoid'
import { formateTime } from '@/utils/timeUtils'

/**商品详情页 */
export enum ProductionMode {
  /**创建 */
  create,
}

/**获取 Step信息 */
export const getStepsInfo = (productionMode: ProductionMode): any => {
  if (productionMode === ProductionMode.create) {
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
  return []
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
