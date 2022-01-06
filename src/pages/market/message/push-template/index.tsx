import { Tabs } from 'antd'
import React from 'react'
import TemplateBPage from './components/template-b'
import TemplateCPage from './components/template-c'
import './index.less'

/**
 * 版本管理
 */
const VersionPage: React.FC = () => {
  const onChange = (activeKey: string) => {
    console.log(activeKey)
  }

  return (
    <div className="push__root">
      <div className="push-header">
        <span className="header-title">消息推送模版</span>
      </div>
      <div className="push-tabs">
        <Tabs defaultActiveKey="1" onChange={onChange}>
          <Tabs.TabPane tab="C端消息推送模版" key="1">
            <TemplateCPage />
          </Tabs.TabPane>
          <Tabs.TabPane tab="B端消息推送模版" key="2">
            <TemplateBPage />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default VersionPage
