/*
 * @Description: APP营销
 * @LastEditTime: 2022-01-10 17:01:53
 */
import { Tabs } from 'antd'
import React from 'react'
import RefundPolicy from './RefundPolicy'
import Banner from './RefundReason'
import OrderIsSet from './OrderIsSet'
const ConfigManagement: React.FC = () => {
  const onChange = (activeKey: string) => {
    console.log(activeKey)
  }

  return (
    <div className="page-root">
      <Tabs defaultActiveKey="3" onChange={onChange}>
        <Tabs.TabPane tab="退款理由" key="1">
          <Banner />
        </Tabs.TabPane>
        <Tabs.TabPane tab="退改政策" key="2">
          <RefundPolicy />
        </Tabs.TabPane>
        <Tabs.TabPane tab="订单设置" key="3">
          <OrderIsSet />
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default ConfigManagement
