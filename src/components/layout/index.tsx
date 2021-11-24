import { Layout } from 'antd'
import React, { useState } from 'react'
import ContentLayout from './content'
import LayoutSider from './slider'
import './index.less'
import { Content, Header } from 'antd/lib/layout/layout'

function AdminLayout(): JSX.Element {
  return (
    <Layout className="AdminLayout">
      <Header className="nav-header">
        <div className="logo">山海云途</div>
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
  )
}

export default AdminLayout
