/*
 * @Description: APP营销
 * @LastEditTime: 2022-01-06 18:08:03
 */
import { Tabs } from 'antd'
import React from 'react'
import RefundPolicy from './RefundPolicy'
import Banner from './banner'

const AppMarket: React.FC = () => {
  const onChange = (activeKey: string) => {
    console.log(activeKey)
  }

  return (
    <div className="page-root">
      <Tabs defaultActiveKey="1" onChange={onChange}>
        <Tabs.TabPane tab="退款理由" key="1">
          <Banner />
        </Tabs.TabPane>
        <Tabs.TabPane tab="退改政策" key="2">
          <RefundPolicy />
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default AppMarket
