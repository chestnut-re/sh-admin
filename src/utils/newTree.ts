/*
 * @Description: 结构树处理 新 之前有些乱 不动 慢慢在这维护
 * @LastEditTime: 2022-01-14 18:48:10
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
// 是否包含某id
export const isInclude = (arrayList: Array<any>, id = '') => {
  let isIncludeType = false
  const each = (treeList, children) => {
    const treeListData = treeList ?? []
    treeListData.forEach((item) => {
      if (item['id'] != id) {
        item = each(item['children'], children)
      } else {
        isIncludeType = true
      }
    })
  }
  each(arrayList, id)
  return isIncludeType
}

/**
 * @description:  路由处理
 * @param {Array} oldArray
 */
export const newMenu = (menuList: Array<any>) => {
  return menuList.reduce((pre, item) => {
    if (item.type == '2' || !item.path || !item.componentPath) return pre
    const child = { ...item }
    delete child.children
    const menuChild = newMenu(item.children)
    if (menuChild && menuChild.length > 0) {
      child.children = menuChild
    }
    pre.push(child)
    return pre
  }, [])
}
/**
 * @description: 所有按钮权限处理
 * @param {Array} oldArray
 */
export const newBtnMenu = (menuList: Array<any>) => {
  const tempMenuList: any[] = []
  const each = (menuList, list) => {
    for (const menu of menuList) {
      if (menu.type == '2' && menu.visible) {
        list.push(menu)
      }
      if (menu.children) {
        each(menu.children, list)
      }
    }
  }
  each(menuList, tempMenuList)
  return tempMenuList
}
export const isIntoMenu = (menuList: Array<any>, id: number) => {
  return menuList.reduce((pre, item) => {
    if (item.id == id) {
      pre = true
      return pre
    }
    if (item.children && item.children.length > 0) {
      isIntoMenu(item.children, id)
    }
    return pre
  }, false)
}
