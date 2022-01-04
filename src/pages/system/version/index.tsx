import { Tabs } from 'antd'
import React from 'react'
import VersionBPage from './components/version-b'
import VersionCPage from './components/version-c'

/**
 * 版本管理
 */
const VersionPage: React.FC = () => {
  const onChange = (activeKey: string) => {
    console.log(activeKey)
  }

  return (
    <div className="page-root">
      <Tabs defaultActiveKey="1" onChange={onChange}>
        <Tabs.TabPane tab="C端版本管理" key="1">
          <VersionBPage />
        </Tabs.TabPane>
        <Tabs.TabPane tab="B端版本管理" key="2">
          <VersionCPage />
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default VersionPage
