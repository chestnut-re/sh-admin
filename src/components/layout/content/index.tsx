/*
 * @Description: 
 * @LastEditTime: 2022-02-08 13:56:23
 */
import { Layout } from 'antd'
import React, { useEffect, useState } from 'react'
import { Redirect, Route, Routes,  } from 'react-router-dom'
import loadable from '@loadable/component'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react-lite'
// import BreadcrumbList from '../BreadcrumbList/index'
type ContentLayoutProps = {
  location: any
}

function ContentLayout({ location }: ContentLayoutProps): JSX.Element {
  const { adminStore } = useStore()
  const mergeMenu = (list: any, routeList: any) => {
    for (const menu of routeList) {
      list.push(menu)
      if (menu.children) {
        mergeMenu(list, menu.children)
      }
    }
  }
  const tempMenuList: any[] = []
  // 这个地方必须同步创建路由，否则会自动转发到 /error/404 界面
  mergeMenu(tempMenuList, adminStore.menu)

  return (
    <Layout.Content>
      <Routes location={location}>
        <>
          {/* <BreadcrumbList adminStore={adminStore.menu}> */}
            <>
              {tempMenuList.map((route) => {
                return (
                  <Route
                    element={React.createElement(loadable(
                      () => import(/* webpackChunkName: 'page'*/ `../../../pages${route.componentPath}`)
                    ))}
                    key={route.path}
                    path={route.path}
                  />
                )
              })}
            </>
          {/* </BreadcrumbList> */}
        </>

        {/* {adminStore.menu?.length > 0 && <Redirect to="/error/404" />} */}
      </Routes>
    </Layout.Content>
  )
}

export default (observer(ContentLayout))
