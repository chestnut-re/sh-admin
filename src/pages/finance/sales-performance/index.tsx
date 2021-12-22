import React, { useState } from 'react'
import { Tabs } from 'antd'
import SalesListPage from './components/SalesList'
import './index.less'
/**账户中心 */
const SalesPerformancePage: React.FC = () => {
  const { TabPane } = Tabs
  return (
    <div className="sales__root">
      <div className="sales-header">
        <span>账户中心</span>
      </div>
      <div className="sales-tabs">
        <Tabs defaultActiveKey="1">
          <TabPane tab="账户管理" key="1">
            <SalesListPage />
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}
export default SalesPerformancePage
