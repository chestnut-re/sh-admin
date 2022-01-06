import { Modal } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/store/context'
import { templateMap, TemplateType } from '../../template'
import './index.less'

interface Props {
  type: TemplateType
  show: boolean
  /**内容修改成功回调，页面需要刷新数据 */
  onSuccess: (template) => void
  onClose: () => void
}

/**
 * 模版弹框
 */
const TemplateDialog: FC<Props> = ({ type, show = false, onSuccess, onClose }) => {
  const { productionDetailStore } = useStore()
  const [templateList, setTemplateList] = useState<any[]>([])

  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)

  useEffect(() => {
    setTemplateList(templateMap[type])
  }, [show])

  /**提交数据 */
  const _handleUpdate = async () => {
    onSuccess(selectedTemplate)
  }

  const _formClose = () => {
    onClose()
  }

  return (
    <Modal title="模版" visible={show} onOk={_handleUpdate} onCancel={_formClose} width={1000}>
      <div className="TemplateDialog__root">
        {templateList.map((item) => {
          const name = item.key === selectedTemplate?.key ? 'templateImgUrlSelected' : 'templateImgUrl'
          return (
            <img
              key={item.key}
              className={name}
              src={item.templateImgUrl}
              onClick={() => {
                if (item == selectedTemplate) {
                  setSelectedTemplate(null)
                } else {
                  setSelectedTemplate(item)
                }
              }}
            ></img>
          )
        })}
      </div>
    </Modal>
  )
}

export default observer(TemplateDialog)
