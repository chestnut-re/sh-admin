/*
 * @Description: 结构树处理 新 之前有些乱 不动 慢慢在这维护
 * @LastEditTime: 2021-12-31 15:02:23
 */
/**
 * @description:  根据id 获取父 - 子 数据
 * @param {Array} oldArray
 * @param {string} isId
 * @return {Array}
 */

export const shellArray = (arr: any[], id: string, areas = 'areas', adcode = 'adcode', pid = 'adcode') => {
  // eslint-disable-next-line prefer-const
  let temp: any[]
  // eslint-disable-next-line prefer-const
  temp = []
  const callback = function (nowArr: string | any[], id: any) {
    for (let i = 0; i < nowArr.length; i++) {
      const item = nowArr[i]

      if (item[adcode] == id) {
        temp.unshift(item)
        callback(arr, item[pid])
        break
      } else {
        // item.pid = id
        if (item[areas]) {
          callback(item[areas], id)
        }
      }
    }
  }
  callback(arr, id)

  return temp //最后返回
}

/**
 * @description:  渠道名称 总部 到自身上一级  	集团-分中心-区域代理-12
 * @param {Array} oldArray
 * @param {string} isId
 * @return {string} 	集团-分中心-区域代理-12
 */
export const analysisName = (
  oldArray: Array<any>,
  isId: string,
  areas = 'areas',
  adcode = 'adcode',
  pid = 'adcode'
): string => {
  const returnData = shellArray(oldArray, isId, areas, adcode, pid).map((res: { name: any }) => {
    return res?.name
  })
  returnData.splice(returnData.length - 1, 1)
  return returnData.join('-')
}
