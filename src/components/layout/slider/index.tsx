import { useStore } from '@/store/context'
import { getURLPath } from '@/utils/urlUtils'
import { Layout, Menu } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './index.less'

function LayoutSider(): JSX.Element {
  const { adminStore } = useStore()
  const selectedKeys = [getURLPath()]
  /**
   * 创建菜单节点
   */
  const getMenuNodes = (_menuList: any[]) => {
    return _menuList.reduce((pre, item) => {
      if (item.visible) return pre
      if (item.children && item.children.length > 0&&item.children.find(res=>res.visible==false)) {
        pre.push(
          <Menu.SubMenu
            key={item.path}
            title={
              <span>
                {item.icon && React.createElement(item.icon)}
                <span>{item.name}</span>
              </span>
            }
          >
            {getMenuNodes(item.children)}
          </Menu.SubMenu>
        )
      } else {
        pre.push(
          <Menu.Item key={item.path}>
            <Link to={item.path}>
              {item.icon && React.createElement(item.icon)}
              <span>{item.name}</span>
            </Link>
          </Menu.Item>
        )
      }
      return pre
    }, [])
  }

  return (
    <Layout.Sider className="Sider">
      <Menu mode="inline" theme="dark" selectedKeys={selectedKeys}>
        {getMenuNodes(adminStore.menu)}
      </Menu>
    </Layout.Sider>
  )
}

export default withRouter(observer(LayoutSider))
