import { Tabs } from 'antd'
import React from 'react'
import AuditScreen from './components/AuditScreen'

/**
 * 运营中心-商品管理-商品审核
 */
const CommodityAuditPage: React.FC = () => {
  const onChange = (activeKey: string) => {
    console.log(activeKey)
  }

  return (
    <div className="page-root">
      <Tabs defaultActiveKey="1" onChange={onChange}>
        <Tabs.TabPane tab="发布审核" key="1">
          <AuditScreen type="publish" />
        </Tabs.TabPane>
        <Tabs.TabPane tab="上架审核" key="2">
          <AuditScreen type="release" />
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default CommodityAuditPage
