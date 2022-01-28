/*
 * @Description: 工具类
 * @LastEditTime: 2022-01-28 11:29:50
 */
/**
 * @description: 手机号中间四位 yanma
 * @param {*} 手机号
 */
export const maskTel = (tel) => {
  const reg = /(\d{3})\d{4}(\d{4})/
  return tel.replace(reg, '$1****$2')
}
