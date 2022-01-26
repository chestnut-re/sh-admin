/*
 * @Description:退款理由
 * @LastEditTime: 2022-01-26 10:57:36
 */
import { ConfigRefundService } from '@/service/OrderService'
import { Form, Input, Modal} from 'antd'
import React, { FC, useEffect, useState } from 'react'
export type DialogMode = 'add' | 'edit'
interface Props {
  data: any
  mode: DialogMode
  show: boolean
  onSuccess: () => void
  onClose: () => void
}

const AEActivityDialog: FC<Props> = ({ data, mode, show = false, onSuccess, onClose }) => {
  const [form] = Form.useForm()
  useEffect(() => {
    if (show) {
      form.setFieldsValue({
        id: data?.id,
        dictValue: data?.dictValue,
      })
    }
  }, [show])

  /**提交数据 */
  const _handleUpdate = async () => {
    form
      .validateFields()
      .then((formData) => {
        const postData = {
          ...formData,
        }
        if (mode === 'add') {
          ConfigRefundService.add(postData).then((res) => {
            if (res.code === '200' || res.code == 200) {
              onSuccess()
            }
          })
        } else {
          postData.id = data.id
          ConfigRefundService.edit(data.id,postData).then((res) => {
            if (res.code === '200' || res.code == 200) {
              onSuccess()
            }
          })
        }
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
    <>
      <Modal title="退款理由" width={800} visible={show} onOk={_handleUpdate} onCancel={_formClose}>
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          form={form}
        >
          <Form.Item label="退款理由" name="dictValue" rules={[{ required: false, message: '请选择退款理由' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default AEActivityDialog
