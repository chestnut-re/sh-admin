import useQuery from '@/hooks/useQuery'
import { ProductionService } from '@/service/ProductionService'
import { useStore } from '@/store/context'
import { Button, message } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import AEDialog from './components/AEDialog'
import TemplateItem from './components/TemplateItem'
import './index.less'

/**
 * 商品配置详情页
 */
const ProductionConfigDetail: React.FC = () => {
  const query = useQuery()
  const { productionDetailStore } = useStore()
  const history = useHistory()

  const [showDialog, setShowDialog] = useState(false)
  const [selectedData, setSelectedData] = useState(null)

  useEffect(() => {
    console.log(query.get('id'))
    ProductionService.get(query.get('id') ?? '').then((res) => {
      console.log(res)
      productionDetailStore.init(res.data)
    })

    return () => {
      productionDetailStore.clearData()
    }
  }, [])

  /**添加模版 */
  const _addTemplate = () => {
    productionDetailStore.addTemplate()
  }

  /**编辑模版 封面 */
  const _editStart = () => {
    setSelectedData(productionDetailStore.data.goodsDetail.goodsDetailStart)
    setShowDialog(true)
  }

  /**编辑模版 封底*/
  const _editEnd = () => {
    setSelectedData(productionDetailStore.data.goodsDetail.goodsDetailEnd)
    setShowDialog(true)
  }

  /**删除模版 */
  const _delPage = (key: string) => {
    productionDetailStore.removeTemplate(key)
  }

  /**编辑模版 */
  const _editPage = (key: string) => {
    setSelectedData(productionDetailStore.data.goodsDetail.goodsDetailPage.find((i) => i.key === key))
    setShowDialog(true)
  }

  const _onDialogSuccess = () => {
    setSelectedData(null)
    setShowDialog(false)
  }

  const _onDialogClose = () => {
    setSelectedData(null)
    setShowDialog(false)
  }

  /**提交审核 */
  const _submit = () => {
    ProductionService.saveToAudit(productionDetailStore.data).then((res) => {
      console.log(res)
      if (res.code === '200') {
        history.goBack()
      } else {
        message.error(res.msg)
      }
    })
  }

  return (
    <div className="ProductionConfigDetail__root">
      {productionDetailStore?.data?.goodsDetail && (
        <TemplateItem data={productionDetailStore?.data?.goodsDetail?.goodsDetailStart} onEdit={_editStart} />
      )}
      {productionDetailStore?.data?.goodsDetail &&
        productionDetailStore?.data?.goodsDetail.goodsDetailPage.map((item) => {
          return <TemplateItem key={item.key} data={item} onDel={_delPage} onEdit={_editPage} />
        })}
      {productionDetailStore?.data?.goodsDetail && (
        <TemplateItem data={productionDetailStore?.data?.goodsDetail?.goodsDetailEnd} onEdit={_editEnd} />
      )}
      <Button onClick={_addTemplate}>添加模版</Button>
      <Button onClick={_submit}>提交审核</Button>

      <AEDialog data={selectedData} onSuccess={_onDialogSuccess} show={showDialog} onClose={_onDialogClose} />
    </div>
  )
}

export default observer(ProductionConfigDetail)
