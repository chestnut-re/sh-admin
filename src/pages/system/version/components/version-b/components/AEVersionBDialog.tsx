import React, { FC, useEffect, useState } from 'react'
import { Form, Input, Modal, Select, Radio } from 'antd'
import { HttpCode } from '@/constants/HttpCode'

/**
 * b端版本弹框
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
const AEVersionBDialog: FC<Props> = ({ data, mode, show = false, onSuccess, onClose }) => {
  const [form] = Form.useForm()
  const [title, setTitle] = useState('添加版本记录')
  useEffect(() => {
    form.setFieldsValue({
      bannerImg: data?.bannerImg,
      title: data?.title,
      bannerUrl: data?.bannerUrl,
      sort: data?.sort,
      startDate: data?.startDate,
      endDate: data?.endDate,
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
          // BannerService.newBanner({ ...formData }).then((res) => {
          //   if (res.code === HttpCode.success) {
          //     onSuccess()
          //   }
          // })
        } else {
          //edit
          // BannerService.edit({ ...formData }).then((res) => {
          //   if (res.code === HttpCode.success) {
          //     onSuccess()
          //   }
          // })
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
        <Form.Item label="版本号" name="bannerImg" rules={[{ message: '请输入图片相对路径' }]}>
          <Input placeholder="(必填)" />
        </Form.Item>
        <Form.Item label="下载链接" name="title" rules={[{ message: '请输入标题' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="更新内容" name="bannerUrl" rules={[{ message: '请输入跳转地址' }]}>
          <Input placeholder="(必填)" />
        </Form.Item>
        <Form.Item label="备注" name="sort" rules={[{ message: '请输入排序号' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="是否强制更新" name="startDate" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value={0}>是</Radio>
            <Radio value={1}>否</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AEVersionBDialog
