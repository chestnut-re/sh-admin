import useQuery from '@/hooks/useQuery'
import { ProductionService } from '@/service/ProductionService'
import { useStore } from '@/store/context'
import { Button, message } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AEDialog from './components/AEDialog'
import TemplateItem from './components/TemplateItem'
import { TemplateType } from './template'
import add from '@/assets/img/add.png'
import './index.less'
import UploadImage from '@/components/formItem/UploadImage'

/**
 * 商品配置详情页
 */
const ProductionConfigDetail: React.FC = () => {
  const query = useQuery()
  const { productionDetailStore } = useStore()
  const history = useNavigate()

  const [showDialog, setShowDialog] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const [selectedType, setSelectedType] = useState<TemplateType>('face')

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
    setSelectedType('face')
    setSelectedData(productionDetailStore.data.goodsDetail.goodsDetailStart)
    setShowDialog(true)
  }

  /**编辑模版 封底*/
  const _editEnd = () => {
    setSelectedType('end')
    setSelectedData(productionDetailStore.data.goodsDetail.goodsDetailEnd)
    setShowDialog(true)
  }

  /**删除模版 */
  const _delPage = (key: string) => {
    productionDetailStore.removeTemplate(key)
  }

  /**编辑模版 */
  const _editPage = (key: string) => {
    setSelectedType('center')
    setSelectedData(productionDetailStore.data.goodsDetail.goodsDetailPage.find((i) => i.key === key))
    setShowDialog(true)
  }

  const _onDialogSuccess = () => {
    console.log('提交', productionDetailStore.data.goodsDetail)
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
        history(-1)
      } else {
        message.error(res.msg)
      }
    })
  }

  /**保存 */
  const _save = () => {
    ProductionService.save(productionDetailStore.data).then((res) => {
      console.log(res)
      if (res.code === '200') {
        message.success('成功')
        history(-1)
      } else {
        message.error(res.msg)
      }
    })
  }

  const _onPreviewImgChange = (value) => {
    productionDetailStore.setPromotionImgUrl(value)
  }

  return (
    <div className="ProductionConfigDetail__root">
      <div className="template">
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
      </div>
      <div className="preview-img">
        商品预览图
        <UploadImage onChange={_onPreviewImgChange} value={productionDetailStore?.data?.promotionalImageUrl} />
      </div>
      <div className="btn-one">
        <Button className="button-add" onClick={_addTemplate}>
          <img className="img-add" src={add} />
          添加模版
        </Button>
      </div>
      <div className="btn-two">
        <Button className="button-box" onClick={_submit}>
          提交审核
        </Button>
        <Button className="button-box" onClick={_save}>
          保存
        </Button>
      </div>

      <AEDialog
        type={selectedType}
        data={selectedData}
        onSuccess={_onDialogSuccess}
        show={showDialog}
        onClose={_onDialogClose}
      />
    </div>
  )
}

export default observer(ProductionConfigDetail)
