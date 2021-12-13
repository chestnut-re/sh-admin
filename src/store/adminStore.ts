import { getMenus } from '@/service/menu'
import { UserService } from '@/service/user'
import { setJWT } from '@/utils/biz'
import { action, makeObservable, observable } from 'mobx'

// const adminStore = observable({
//   menu: [],
//   async init() {
//     //init menu
//     const res = await getMenus()
//     this.setMenu(res.data.menus)
//     console.log(JSON.stringify(res))
//   },
//   setMenu(_menu: any) {
//     this.menu = _menu
//   },
// })

/**
 * 管理后台必备 Store
 * 1. 菜单
 * 2. 登录
 */
class AdminData {
  menu: any[] = []

  constructor() {
    makeObservable(this, {
      menu: observable,
      init: action,
      setMenu: action,
    })
  }

  async init() {
    /// init menu
    const res = await getMenus()
    this.setMenu(res.data.menus)
    console.log(JSON.stringify(res))
  }

  /**登录 */
  async login(username, password){
    const loginRes = await UserService.login(username, password)
    console.log(loginRes);
    setJWT(loginRes.data.accessToken)
    window.location.href = '/'
  }

  setMenu(_menu: any) {
    this.menu = _menu
  }
}

function createAdminStore() {
  return new AdminData()
}

export { createAdminStore }
