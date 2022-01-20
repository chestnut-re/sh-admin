/*
 * @Description: 
 * @LastEditTime: 2022-01-20 10:28:10
 */
import { Layout, ConfigProvider } from 'antd'
import React, { useState } from 'react'
import ContentLayout from './content'
import LayoutSider from './slider'
import './index.less'
import { Content, Header } from 'antd/lib/layout/layout'
import { userLoginOut } from '@/utils/biz'
import zhCN from 'antd/es/locale/zh_CN'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/store/context'
function AdminLayout(): JSX.Element {
  const { adminStore } = useStore()
  const _logout = () => {
    userLoginOut()
  }
  return (
    <ConfigProvider locale={zhCN}>
      <Layout className="AdminLayout">
        <Header className="nav-header">
          <div className="logo">山海云途管理中心</div>
       <div className="menu">
       <div className="name">
            {adminStore.isSubCenter() ? '分中心账号: ' : '集团账号: '} {adminStore.userDetails.nickName}
          </div>
          <div className="logout" onClick={_logout}>
            退出
          </div>
       </div>
        </Header>
        <Content>
          <Layout>
            <LayoutSider />
            <Layout className="AdminContent">
              <ContentLayout />
            </Layout>
          </Layout>
        </Content>
      </Layout>
    </ConfigProvider>
  )
}

export default observer(AdminLayout)
