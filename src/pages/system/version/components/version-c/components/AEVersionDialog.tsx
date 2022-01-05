import React, { FC, useEffect, useState } from 'react'
import { Form, Input, Modal, Select, Radio } from 'antd'
import { HttpCode } from '@/constants/HttpCode'
import { VersionService } from '@/service/VersionService'

/**
 * 添加版本弹框
 */

export type DialogMode = 'add' | 'edit'
interface Props {
  data: any
  mode: DialogMode
  show: boolean
  /**内容修改成功回调，页面需要刷新数据 */
  onSuccess: () => void
  onClose: () => void
}
const AEVersionDialog: FC<Props> = ({ data, mode, show = false, onSuccess, onClose }) => {
  const [form] = Form.useForm()
  const [title, setTitle] = useState('添加版本记录')
  useEffect(() => {
    form.setFieldsValue({
      clientVersionNo: data?.clientVersionNo,
      fileUrl: data?.fileUrl,
      versionContent: data?.versionContent,
      remark: data?.remark,
      mandatoryUpdate: data?.mandatoryUpdate,
    })
    if (mode == 'add') {
      setTitle('添加版本记录')
    } else {
      setTitle('修改版本记录')
    }
  }, [show])
  /**提交数据 */
  const _handleUpdate = async () => {
    form
      .validateFields()
      .then((formData) => {
        if (mode === 'add') {
          // create
          VersionService.add({ ...formData, platform: 2 }).then((res) => {
            if (res.code === HttpCode.success) {
              onSuccess()
            }
          })
        } else {
          //edit
          VersionService.edit({ ...formData, platform: 2, id: data.id }).then((res) => {
            if (res.code === HttpCode.success) {
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
    <Modal title={title} visible={show} onOk={_handleUpdate} onCancel={_formClose}>
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={(values: any) => {}}
        onFinishFailed={(errorInfo: any) => {}}
        autoComplete="off"
        form={form}
      >
        <Form.Item label="版本号" name="clientVersionNo" rules={[{ message: '请输入图片相对路径' }]}>
          <Input placeholder="(必填)" />
        </Form.Item>
        <Form.Item label="下载链接" name="fileUrl" rules={[{ message: '请输入标题' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="更新内容" name="versionContent" rules={[{ message: '请输入跳转地址' }]}>
          <Input placeholder="(必填)" />
        </Form.Item>
        <Form.Item label="备注" name="remark" rules={[{ message: '请输入排序号' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="是否强制更新" name="mandatoryUpdate" rules={[{ required: true }]}>
          <Radio.Group defaultValue={0}>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AEVersionDialog
