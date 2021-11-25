import { getMenus } from '@/service/menu'
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

  setMenu(_menu: any) {
    this.menu = _menu
  }
}

function createAdminStore() {
  return new AdminData()
}

export { createAdminStore }
