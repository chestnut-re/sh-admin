import { useStore } from '@/store/context'
import { Button, Tabs } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ProductionList from '../ProductionList'
import ProductionListCenter from '../ProductionListCenter'
import UnReleaseProductionListPage from '../UnReleaseProductionList'

/**
 * 商品管理-商品库
 */
const ProductionListWrap: React.FC = () => {
  const history = useNavigate()
  const { adminStore } = useStore()

  const onChange = (activeKey: string) => {
    console.log(activeKey)
  }

  const operations = (
    <Button
      onClick={() => {
        history('/production/draftbox')
      }}
      htmlType="button"
      style={{marginLeft: '40px'}}
    >
      草稿箱
    </Button>
  )

  console.log('adminStore.isSubCenter()', adminStore.isSubCenter())

  return (
    <div className="page-root">
      <Tabs defaultActiveKey="1" onChange={onChange} tabBarExtraContent={operations}>
        <Tabs.TabPane tab="商品库" key="1">
          {adminStore.isSubCenter() && <ProductionListCenter />}
          {!adminStore.isSubCenter() && <ProductionList />}
        </Tabs.TabPane>
        {!adminStore.isSubCenter() && (
          <Tabs.TabPane tab="待发布商品库" key="2">
            <UnReleaseProductionListPage />
          </Tabs.TabPane>
        )}
      </Tabs>
    </div>
  )
}

export default ProductionListWrap
