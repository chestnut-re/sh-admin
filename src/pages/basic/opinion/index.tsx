import { Tabs } from 'antd'
import React from 'react'
import OpinionBPage from './components/opinion-b'
import OpinionCPage from './components/opinion-c'

/**
 * 意见反馈
 */
const OpinionPage: React.FC = () => {
  const onChange = (activeKey: string) => {
    console.log(activeKey)
  }

  return (
    <div className="page-root">
      <Tabs defaultActiveKey="1" onChange={onChange}>
        <Tabs.TabPane tab="C端意见反馈" key="1">
          <OpinionCPage />
        </Tabs.TabPane>
        <Tabs.TabPane tab="B端意见反馈" key="2">
          <OpinionBPage />
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default OpinionPage
