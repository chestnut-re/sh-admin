import React, { useState } from 'react'
import { Tabs } from 'antd'
import SalesListPage from './components/SalesList'
// import './index.less'
/**账户中心 */
const SalesPerformancePage: React.FC = () => {
  const { TabPane } = Tabs
  return (
    <div className="sales__root">
      <div className="sales-header">
        <span>账户中心/账户明细</span>
      </div>
      <div className="sales-content">
        <div className="con1">
          <span>归属渠道：</span>
          <span></span>
          <span>姓名：</span>
          <span></span>
          <span>账号：</span>
          <span></span>
        </div>
        <div className="con2">
          <span>账户总额：</span>
          <span></span>
        </div>
        <div className="con3">
          <span>可用金额：</span>
          <span></span>
          <span>运营资金：</span>
          <span></span>
          <span>待释放：</span>
          <span></span>
          <span>提现中：</span>
          <span></span>
        </div>
      </div>
      <div className="sales-tabs">
        <Tabs defaultActiveKey="1">
          <TabPane tab="佣金" key="1">
            <SalesListPage />
          </TabPane>
          <TabPane tab="提现" key="2"></TabPane>
          <TabPane tab="运营资金" key="3"></TabPane>
        </Tabs>
      </div>
    </div>
  )
}
export default SalesPerformancePage
