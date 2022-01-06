import { Form, Modal, Col, Row } from 'antd'
import React, { FC, useEffect } from 'react'
import UploadImage from '@/components/formItem/UploadImage'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/store/context'
import { TemplateType } from '../../template'

interface Props {
  type: TemplateType
  show: boolean
  /**内容修改成功回调，页面需要刷新数据 */
  onSuccess: () => void
  onClose: () => void
}

/**
 * 模版弹框
 */
const TemplateDialog: FC<Props> = ({ type, show = false, onSuccess, onClose }) => {
  const { productionDetailStore } = useStore()

  useEffect(() => {}, [show])

  /**提交数据 */
  const _handleUpdate = async () => {}

  const _formClose = () => {
    onClose()
  }

  return (
    <Modal title="模版" visible={show} onOk={_handleUpdate} onCancel={_formClose} width={1000}>
      <Row>
        <Col span={12}></Col>
      </Row>
    </Modal>
  )
}

export default observer(TemplateDialog)