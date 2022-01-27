/*
 * @Description: 字典
 * @LastEditTime: 2022-01-27 14:33:37
 */

export const status = {
  0: '全部',
  1: '开启',
  2: '关闭',
}

export const enumState = {
  '': '全部',
  0: '关闭',
  1: '开启',
}
export const enumRoleState = {
  '': '全部',
  0: '启用',
  1: '禁用',
}
export const regCode = {
  1: '扫码',
  2: '任务分享',
  3: '商品分享',
  4: 'app自然流量',
  5: '小程序自然流量',
  6: 'B端人员创建',
}
/**
 * @description:  按钮权限
 */
export const btnPermission = {
  edit: 'edit',
  add: 'add',
  del: 'del',
}
/**
 * @description:  按钮类型
 */
export const typePermission = {
  edit: 'edit',
  add: 'add',
  del: 'del',
}
/**
//  * 人员管理 类型
 */
export const personState = {
  0: '禁用',
  1: '正常',
  2: '全部',
}

/**
 * 人员类型
 */
export const personType = {
  // 0: '渠道账户',
  1: '内部渠道',
  2: '外部渠道',
}
/**
 * 人员类型
 */
 export const specialState = {
  0: '下线',
  1: '待上线',
  2: '上线',
}

/**
 *创建平台
 */
export const createChannel = {
  0: '管理后台',
  1: 'biz山海',
}

/**
 * 弹框状态管理
 * 添加: add
 * 编辑: edit
 */
export type DialogMode = 'add' | 'edit'