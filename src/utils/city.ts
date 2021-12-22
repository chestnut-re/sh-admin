/*
 * @Description: 城市数据处理
 * @LastEditTime: 2021-12-21 19:06:01
 */

/**
 * @description: 把city 数据的children 为null 的去掉
 * @param {*} city 原始数据
 * @param {*} children
 * @return {*}
 */
export const cityDispose = (city: Array<any>, children: string):any=> {
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
export const shellArray = (oldArray: Array<any>, isId: string) => {
  const newArray: any = []
  const shellArr = (oldArray: Array<any>, id: string): any => {
    if (oldArray.length) {
      oldArray.forEach((item) => {
        if (item.areas && item.areas.length) {
          if (item.areas.some((row) => row.adcode == id)) {
            newArray.push(item)
            shellArr(oldArray, item.adcode)
            return item
          } else {
            shellArr(item.areas, id)
          }
        } else {
          if (item.adcode == isId) {
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
export const analyName = (oldArray: Array<any>, isId: string):string=>{
  return shellArray(oldArray,isId).map(res=>res.name).join('-')
}
/**
 * @description: 获取id
 * @param {Array} oldArray
 * @param {string} isId
 * @return {Array} 
 */
export const analyId = (oldArray: Array<any>, isId: string)=>{
  return shellArray(oldArray,isId).map(res=>res.name)
}