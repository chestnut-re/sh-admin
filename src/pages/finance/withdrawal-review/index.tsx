import { Tabs } from 'antd'
import React from 'react'
import UserPage from './user'
import ChannelPage from './channel'
import './index.less'

/**
 * 提现审核
 */

const AppMarket: React.FC = () => {
  const onChange = (activeKey: string) => {
    console.log(activeKey)
  }

  return (
    <div className="page__root">
      <div className="page-header">
        <span className="header-title">提现审核</span>
      </div>
      <div className="page-tabs">
        <Tabs defaultActiveKey="1" onChange={onChange}>
          <Tabs.TabPane tab="渠道提现" key="1">
            <ChannelPage />
          </Tabs.TabPane>
          <Tabs.TabPane tab="用户提现" key="2">
            <UserPage />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default AppMarket
