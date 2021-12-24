/*
 * @Description: 城市数据处理
 * @LastEditTime: 2021-12-24 14:56:47
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
          if (item[areas].some((row: { [x: string]: string }) => row[adcode] == id)) {
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
    .map((res: { name: any }) => {
      return res?.name
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
  return shellArray(oldArray, isId, areas, adcode).map((res: { [x: string]: any }) => res[adcode])
}

export const echoData = (oldArray: Array<any>, data: string) => {
  data.split(',').map((res) => {
    return analysisId(oldArray, res)
  })
}
/**
 * @description:  array length last join 
 * @param {*} array
 * @return {*}
 */
export const lastOneJoin = (array: any[]) => {
  return array
    .map((item: string | any[]) => {
      return item[item.length - 1]
    })
    .join(',')
}

/**
 * @description: 
 * @param {function} array
 * @param {any} area
 * @return {*} 'name,name'
 */
export const arrayNameJoin = (array: (string | any[])[], area: any[], areas = 'areas', adcode = 'adcode') => {
  return array
    .map((item: string | any[]) => {
      return analysisName(area, item[item.length - 1], areas, adcode)
    })
    .join(',')
}
/**
 * @description:  code array 用于回显 根据  最后一级 
 * @param {string} array
 * @param {any} area [id,id]
 * @param {*} areas
 * @param {*} adcode
 * @return {*} [[pid,cid],[pid,cid]]
 */
export const regionsCodeArray = (array: string, area: any[], areas = 'areas', adcode = 'adcode') => {
  return array.split(',')
    .map((item: string) => {
      return analysisId(area, item, areas, adcode)
    })
}

/**
 * @description:  根据所有id string 获取对应的tree数据
 * @param {*}
 * @return {*}
 */
//  export const getChild =(arr:  any[],stringId): any=>{
 
// }