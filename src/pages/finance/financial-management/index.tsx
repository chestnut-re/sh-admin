import React, { useState } from 'react'
import { Tabs } from 'antd'
import SurveyPage from './components/Survey'
import DetailedPage from './components/Detailed'
import './index.less'
/**账户管理 */
const FinancialManagementPage: React.FC = () => {
  const { TabPane } = Tabs
  return (
    <div className="financial__root">
      <div className="financial-header">
        <span>财务管理</span>
      </div>
      <div className="financial-tabs">
        <Tabs defaultActiveKey="1">
          <TabPane tab="财务概况" key="1">
            <SurveyPage />
          </TabPane>
          <TabPane tab="财务明细" key="2">
            <DetailedPage />
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}
export default FinancialManagementPage
