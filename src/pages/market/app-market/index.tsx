/*
 * @Description: APP营销
 * @LastEditTime: 2022-01-05 11:45:23
 */
import { Tabs } from 'antd'
import React from 'react'
import Activities from './activities'
import Banner from './banner'

const AppMarket: React.FC = () => {
  const onChange = (activeKey: string) => {
    console.log(activeKey)
  }

  return (
    <div className="page-root">
      <Tabs defaultActiveKey="1" onChange={onChange}>
        <Tabs.TabPane tab="轮播图管理" key="1">
          <Banner />
        </Tabs.TabPane>
        <Tabs.TabPane tab="专题管理" key="2">
          <Activities />
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default AppMarket
