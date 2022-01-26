/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * @Description: 城市数据处理
 * @LastEditTime: 2022-01-26 14:43:49
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

export const shellArrayDuo = (arr: any[], id: string, areas = 'areas', adcode = 'adcode', pid = 'adcode') => {
  // eslint-disable-next-line prefer-const
  let temp: any[]
  // eslint-disable-next-line prefer-const
  temp = []
  const callback = function (nowArr: string | any[], id: any) {
    for (let i = 0; i < nowArr.length; i++) {
      const item = nowArr[i]

      if (item[adcode] == id) {
        temp?.unshift(item)
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
 * @description:  渠道名称 总部 到自身上一级  	集团-分中心1-区域代理1-12
 * @param {Array} oldArray
 * @param {string} isId
 * @return {string}
 */
export const analysisNameDuo = (
  oldArray: Array<any>,
  isId: string,
  areas = 'areas',
  adcode = 'adcode',
  pid = 'adcode'
): string => {
  const returnData = shellArrayDuo(oldArray, isId, areas, adcode, pid).map((res: { name: any }) => {
    return res?.name
  })
  // returnData.splice(returnData.length - 1, 1)
  return returnData.join('-')
}

export const analysisName = (oldArray: Array<any>, isId: string, areas = 'areas', adcode = 'adcode'): string => {
  console.log(
    shellArray(oldArray, isId, areas, adcode).map((res: { name: any }) => {
      return res?.name
    })
  )
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
  // console.log(shellArray(oldArray, isId, areas, adcode))
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
  return array.split(',').map((item: string) => {
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

/**
 * @description: 找最多层级，去掉等级为1 的
 * @param {*}
 * @return {*}
 */
export const getMaxFloor = (treeData: any[] = []) => {
  let max = 0
  const arrayList = []
  const each = (data: any[] = [], floor: number) => {
    data.forEach((e) => {
      e.floor = floor
      if (floor > max) {
        max = floor
        if (e.level != 1) {
          arrayList.push(e)
        }
      }
      if (e.children?.length > 0) {
        each(e.children, floor + 1)
      }
    })
  }
  each(treeData, 1)
  return arrayList
}

/**
 * @description: 只要 level 2 的
 * @param {Array} treeList
 * @param {string} children
 * @return {*}
 */
export const getTwoTier = (treeList: Array<any>, children: string): any => {
  let newArray = []
  const each = (treeList, children) => {
    const treeListData = treeList ?? []
    treeListData.some((item) => {
      if (item['level'] <= 2) {
        if (item['level'] == 2) {
          const items = JSON.parse(JSON.stringify(item))
          delete items[children]
          newArray.push(items)
        }
        item = each(item[children], children)
      } else {
        // delete item[children]
      }
      return item
    })
  }
  each(treeList, children)
  console.log(newArray, 'newArray')
  return newArray
}

/**
 * @description: 只要 level 1 和2 的
 * @param {Array} treeList
 * @param {string} children
 * @return {*}
 */
export const getLastTwoTier = (treeList: Array<any>, children: string): any => {
  treeList.forEach((item) => {
    if (item['level'] != 2) {
      item = getLastTwoTier(item['children'], children)
    } else {
      delete item[children]
    }
    return item
  })
  return treeList
}

/**
 * @description:  根据[id,id] 找到对应的数据树
 * @param {Array} city
 * @param {any} arrayId
 * @return {*}
 */
export const nwqRouter = (city: Array<any>, arrayId: any[]) => {
  city.forEach((item) => {
    if (arrayId.includes(item['arrayId'])) {
      item = nwqRouter(item['children'], arrayId)
    } else {
      // console.log(item, '------')
      delete item['children']
    }
    return item
  })
  return city
}
/**
 * @description: 找到当前id 以及当前下的所有子tree
 * @param {Array} dataTree
 * @param {*} id
 * @return {*}
 */
export const findIcChild = (dataTree: Array<any>, id) => {
  let arrayList
  // console.log(dataTree,'dataTree')
  const each = (dataTree, id) => {
    const dataList = dataTree ?? []
    dataList.some((item) => {
      if (item['id'] == id) {
        arrayList = [item]
      } else {
        each(item['children'], id)
      }
    })
  }
  each(dataTree, id)

  return arrayList
}
