/*
 * @Description:
 * @LastEditTime: 2022-01-06 20:13:04
 */
import { ConfigManagementService } from '@/service/OrderService'
import { Form, Input, Modal, Select, DatePicker, Button, Row, Col, Radio } from 'antd'
import React, { FC, useEffect, useState } from 'react'
// import RichInput from '@/components/formItem/RichInput'
import Editor from './Editor'
export type DialogMode = 'add' | 'edit'
interface Props {
  data: any
  mode: DialogMode
  show: boolean
  onSuccess: () => void
  onClose: () => void
}

/**
 * 添加&编辑
 */
const AEActivityDialog: FC<Props> = ({ data, mode, show = false, onSuccess, onClose }) => {
  const [form] = Form.useForm()
  const [content, setContent] = useState('')
  useEffect(() => {
    if (show) {
      form.setFieldsValue({
        id: data?.id,
        policyName: data?.policyName,
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
          ConfigManagementService.add(postData).then((res) => {
            if (res.code === '200' || res.code == 200) {
              onSuccess()
            }
          })
        } else {
          postData.id = data.id
          ConfigManagementService.edit(postData).then((res) => {
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
  const changeRich = (e) => {
    console.log('xxx', e)
    setContent(e)
  }
  return (
    <>
      <Modal title="退改政策" width={800} visible={show} onOk={_handleUpdate} onCancel={_formClose}>
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          form={form}
        >
          <Form.Item label="政策名称" name="policyName" rules={[{ required: false, message: '请输入活动标题' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="政策内容" name="policyContent" rules={[{ required: false, message: '请输入副标题' }]}>
               <Editor onChange={changeRich}></Editor>
          </Form.Item>
        </Form>
     
      </Modal>
    </>
  )
}

export default AEActivityDialog
