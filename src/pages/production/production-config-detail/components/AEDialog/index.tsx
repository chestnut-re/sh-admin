import { Form, Modal, Col, Row } from 'antd'
import React, { FC, useEffect } from 'react'
import UploadImage from '@/components/formItem/UploadImage'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/store/context'

interface Props {
  data: any
  show: boolean
  /**内容修改成功回调，页面需要刷新数据 */
  onSuccess: () => void
  onClose: () => void
}

/**
 * 添加&编辑
 */
const AEDialog: FC<Props> = ({ data, show = false, onSuccess, onClose }) => {
  const { productionDetailStore } = useStore()
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      ...data,
    })
  }, [show])

  /**提交数据 */
  const _handleUpdate = async () => {
    form
      .validateFields()
      .then((formData) => {
        console.log(formData)
        productionDetailStore.saveTemplate({ ...data, ...formData })
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

  return (
    <Modal title="模版" visible={show} onOk={_handleUpdate} onCancel={_formClose} width={1000}>
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
    </Modal>
  )
}

export default observer(AEDialog)
