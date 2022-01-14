/*
 * @Description:
 * @LastEditTime: 2022-01-14 18:02:01
 */
import { USER_DETAIL } from '@/constants/CookiesC'
import { getMenus, getDevMenus } from '@/service/menu'
import { UserService } from '@/service/user'
import { isUserLogin, setJWT } from '@/utils/biz'
import { getCookie, setCookie } from '@/utils/cookies'
import { action, makeObservable, observable } from 'mobx'
import { newMenu } from '@/utils/newTree'
/**
 * 管理后台必备 Store
 * 1. 菜单
 * 2. 登录
 */
const env = process.env.NODE_ENV
class AdminData {
  menu: any[] = []
  userDetails: any = {}

  constructor() {
    makeObservable(this, {
      menu: observable,
      userDetails: observable,
      init: action,
      setMenu: action,
      login: action,
    })
  }

  async init() {
    // if (env == 'development') {
      const res = await getDevMenus()
      this.setMenu(res.data.menus)
    // } else {
      // const user = JSON.parse(getCookie(USER_DETAIL) ?? '')
      // const res = await getMenus(user?.userId)
      // this.setMenu(newMenu(res.data))
    // }

    if (!isUserLogin()) {
      // 未登录，去登录页面
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    } else {
      if (getCookie(USER_DETAIL)) {
        this.userDetails = JSON.parse(getCookie(USER_DETAIL) ?? '')
        console.log('this.userDetails', this.userDetails)
      }
    }
  }

  /**登录 */
  async login(username, password) {
    const loginRes = await UserService.login(username, password)
    console.log(loginRes)
    setJWT(loginRes.data.accessToken)
    this.userDetails = loginRes.data.userDetails
    setCookie(USER_DETAIL, JSON.stringify(loginRes.data.userDetails))
    window.location.href = '/'
  }

  setMenu(_menu: any) {
    this.menu = _menu
  }

  /**是否是分中心 */
  isSubCenter() {
    return this.userDetails.channelLevel !== 1
  }
}

function createAdminStore() {
  return new AdminData()
}

export { createAdminStore }
