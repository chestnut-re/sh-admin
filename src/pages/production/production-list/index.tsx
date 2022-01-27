import { Tabs } from 'antd'
import React from 'react'
import DraftBoxPage from './components/DraftBox'
import ProductionListWrap from './components/ProductionListWrap'

/**
 * 商品管理-商品库
 */
const ProductionManage: React.FC = () => {
  const onChange = (activeKey: string) => {
    console.log(activeKey)
  }

  return (
    <div className="page-root">
      <ProductionListWrap />
      {/* <Tabs defaultActiveKey="1" onChange={onChange}>
        <Tabs.TabPane tab="商品库" key="1">
          <ProductionListWrap />
        </Tabs.TabPane>
        <Tabs.TabPane tab="草稿箱" key="2">
          <DraftBoxPage />
        </Tabs.TabPane>
      </Tabs> */}
    </div>
  )
}

export default ProductionManage
