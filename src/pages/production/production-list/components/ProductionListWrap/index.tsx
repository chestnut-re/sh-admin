import { Tabs } from 'antd'
import React from 'react'
import ProductionListPage from '../ProductionList'

/**
 * 商品管理-商品库
 */
const ProductionListWrap: React.FC = () => {
  const onChange = (activeKey: string) => {
    console.log(activeKey)
  }

  return (
    <div className="page-root">
      <Tabs defaultActiveKey="1" onChange={onChange}>
        <Tabs.TabPane tab="商品库" key="1">
          <ProductionListPage type="normal" />
        </Tabs.TabPane>
        <Tabs.TabPane tab="待发布商品库" key="2">
          <ProductionListPage type="unRelease" />
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default ProductionListWrap
