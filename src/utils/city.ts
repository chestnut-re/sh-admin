/*
 * @Description: 城市数据处理
 * @LastEditTime: 2021-12-23 15:09:22
 */

/**
 * @description: 把city 数据的children 为null 的去掉
 * @param {*} city 原始数据
 * @param {*} children
 * @return {*}
 */
export const cityDispose = (city: Array<any>, children: string): any => {
  city.forEach((item) => {
    if (item[children] && item[children].length > 0) {
      item = cityDispose(item[children], children)
    } else {
      delete item[children]
    }
    return item
  })
  return city
}
/**
 * @description:  根据id 获取父 - 子 数据
 * @param {Array} oldArray
 * @param {string} isId
 * @return {Array}
 */
export const shellArray = (oldArray: Array<any>, isId: string, areas = 'areas', adcode = 'adcode') => {
  const newArray: any = []
  const shellArr = (oldArray: Array<any>, id: string): any => {
    if (oldArray.length) {
      oldArray.forEach((item) => {
        if (item[areas] && item[areas].length) {
          if (item[areas].some((row) => row[adcode] == id)) {
            newArray.push(item)
            shellArr(oldArray, item[adcode])
            return item
          } else {
            shellArr(item[areas], id)
          }
        } else {
          if (item[adcode] == isId) {
            newArray.push(item)
          }
          return
        }
      })
    }
  }
  shellArr(oldArray, isId)
  return newArray
}
/**
 * @description:  获取城市名字 列表展示 省-市
 * @param {Array} oldArray
 * @param {string} isId
 * @return {string}
 */

export const analysisName = (oldArray: Array<any>, isId: string, areas = 'areas', adcode = 'adcode'): string => {
  return shellArray(oldArray, isId, areas, adcode)
    .map((res) => {
      return res.name
    })
    .join('-')
}
/**
 * @description: 获取id
 * @param {Array} oldArray
 * @param {string} isId
 * @return {Array}
 */
export const analysisId = (oldArray: Array<any>, isId: string, areas = 'areas', adcode = 'adcode') => {
  console.log(shellArray(oldArray, isId, areas, adcode))
  return shellArray(oldArray, isId, areas, adcode).map((res) => res[adcode])
}
export const echoData = (oldArray: Array<any>, data: string) => {
  data.split(',').map((res) => {
    return analysisId(oldArray, res)
  })
}
/**
 * @description:  最后一个join string
 * @param {*} array
 * @return {*}
 */
export const lastOneJoin = (array) => {
  return array
    .map((item) => {
      return item[item.length - 1]
    })
    .join(',')
}

export const arrayNameJoin = (array, area, areas = 'areas', adcode = 'adcode') => {
  return array
    .map((item) => {
      return analysisName(area, item[item.length - 1], areas, adcode)
    })
    .join(',')
}
export const regionsCodeArray = (array, area, areas = 'areas', adcode = 'adcode') => {
console.log(array,'xxx')
  return array.split(',')
    .map((item) => {
      return analysisId(area, item, areas, adcode)
    })
}
