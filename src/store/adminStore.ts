import { getMenus } from '@/service/menu'
import { observable } from 'mobx'

/**
 * 管理后台必备 Store
 * 1. 菜单
 */
const adminStore = observable({
  menu: [],
  async init() {
    //init menu
    const res = await getMenus()
    this.setMenu(res.data.menus)
    console.log(JSON.stringify(res))
  },
  setMenu(_menu: any) {
    this.menu = _menu
  },
})

export default adminStore
