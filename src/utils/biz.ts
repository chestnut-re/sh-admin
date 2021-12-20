import { getCookie, removeCookie, setCookie } from './cookies'

/**
 * 退出登录
 */
export function userLoginOut() {
  removeJWT()
  if (window.location.pathname === '/login') return
  window.location.href = '/login'
}

/**
 * 获取 jwt
 */
export function getJWT() {
  return getCookie('auth')
}

/**
 * 设置 jwt
 */
export function setJWT(value: string) {
  return setCookie('auth', value)
}

/**
 * remove jwt
 */
export function removeJWT() {
  return removeCookie('auth')
}

/**
 * 用户是否已经登录
 */
export function isUserLogin(): boolean {
  return !!getJWT()
}

/**
 * 菜单数据转化成树形结构需要的数据
 */
export const menus2TreeData = (menus: Array<any>) => {
  return menus?.map((i) => {
    const newI: any = {
      title: i.name,
      key: i.id,
    }
    if (i.children && i.children.length > 0) {
      newI.children = menus2TreeData(i.children)
    }
    return newI
  })
}
