import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd'
import ClassManagement from './components/ClassManagement'
import './index.less'

/**
 * 商品配置
 */
const CommoditAllocationPage: React.FC = () => {
  const { TabPane } = Tabs
  return (
    <div className="allocation__root">
      <div className="allocation__root-tabs">
        <Tabs defaultActiveKey="1">
          <TabPane tab="分类管理" key="1">
            <ClassManagement />
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}
export default CommoditAllocationPage
