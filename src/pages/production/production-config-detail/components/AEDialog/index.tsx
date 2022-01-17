import { Form, Modal, Col, Row, Button, message } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import UploadImage from '@/components/formItem/UploadImage'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/store/context'
import TemplateDialog from '../TemplateDialog'
import { getTemplate, TemplateType } from '../../template'

interface Props {
  type: TemplateType
  data: any
  show: boolean
  /**内容修改成功回调，页面需要刷新数据 */
  onSuccess: () => void
  onClose: () => void
}

/**
 * 添加&编辑
 */
const AEDialog: FC<Props> = ({ data, type, show = false, onSuccess, onClose }) => {
  const { productionDetailStore } = useStore()
  const [form] = Form.useForm()
  const [showTemplateDialog, setShowTemplateDialog] = useState<boolean>(false)
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)

  useEffect(() => {
    console.log('data', data)
    form.resetFields()
    form.setFieldsValue({
      ...data,
    })
    setSelectedTemplate(getTemplate(data?.pageTemplateKey))
  }, [show, data])

  /**提交数据 */
  const _handleUpdate = async () => {
    form
      .validateFields()
      .then((formData) => {
        console.log('确定', formData)
        if (!selectedTemplate) {
          message.error('请选择模版')
          return
        }
        const template = {
          pageTemplateKey: selectedTemplate.key,
          pageTemplate: selectedTemplate.name,
          templateImgUrl: selectedTemplate.templateImgUrl,
        }
        if (type === 'center') {
          productionDetailStore.saveTemplate({ ...data, ...formData, ...template })
        } else if (type === 'end') {
          productionDetailStore.saveTemplateEnd({ ...data, ...formData, ...template })
        } else if (type === 'face') {
          productionDetailStore.saveTemplateFace({ ...data, ...formData, ...template })
        }
        onSuccess()
      })
      .catch((e) => {
        console.error(e)
      })
  }

  const _formClose = () => {
    form.resetFields()
    onClose()
  }

  const _onDialogSuccess = (template) => {
    console.log('选中', template)
    setSelectedTemplate(template)
    setShowTemplateDialog(false)
  }

  const _onDialogClose = () => {
    setSelectedTemplate(null)
    setShowTemplateDialog(false)
  }

  return (
    <Modal title={data?.pageTemplate} visible={show} onOk={_handleUpdate} onCancel={_formClose} width={1000}>
      <Row>
        <Col span={12}></Col>
        <Col span={12}>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            autoComplete="off"
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
          >
            <Button
              onClick={() => {
                setShowTemplateDialog(true)
              }}
            >
              选择模版
            </Button>
            {selectedTemplate?.name}
            <Form.Item label="商品名称" name="detailTitleImage" rules={[{ required: false }]}>
              <UploadImage />
            </Form.Item>
            <Form.Item label="商品简介" name="detailDescImage" rules={[{ required: false }]}>
              <UploadImage />
            </Form.Item>
            <Form.Item label="类型标签" name="goodsTypeTagImage" rules={[{ required: false }]}>
              <UploadImage />
            </Form.Item>
            <Form.Item label="价格图" name="priceImage" rules={[{ required: false }]}>
              <UploadImage />
            </Form.Item>
            <Form.Item label="背景图片" name="backgroundImage" rules={[{ required: false }]}>
              <UploadImage />
            </Form.Item>
            <Form.Item label="下单按钮" name="submitOrderImage" rules={[{ required: false }]}>
              <UploadImage />
            </Form.Item>
          </Form>
        </Col>
      </Row>

      <TemplateDialog show={showTemplateDialog} type={type} onClose={_onDialogClose} onSuccess={_onDialogSuccess} />
    </Modal>
  )
}

export default observer(AEDialog)
