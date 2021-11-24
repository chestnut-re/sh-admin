import Cookies from 'js-cookie'

/**
 * 设置 Cookie
 */
export function setCookie(key: string, value: string) {
  Cookies.set(key, value)
}

/**
 * 获取 Cookie
 */
export function getCookie(key: string) {
  return Cookies.get(key)
}

/**
 * remove Cookie
 */
export function removeCookie(key: string) {
  return Cookies.remove(key)
}
