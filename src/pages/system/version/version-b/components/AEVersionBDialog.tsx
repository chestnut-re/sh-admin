import React, { FC, useEffect, useState } from 'react'
import { Form, Input, Modal, Select } from 'antd'
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
  useEffect(() => {
    form.setFieldsValue({
      bannerImg: data?.bannerImg,
      title: data?.title,
      bannerUrl: data?.bannerUrl,
      sort: data?.sort,
      startDate: data?.startDate,
      endDate: data?.endDate,
    })
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
    <Modal title="用户" visible={show} onOk={_handleUpdate} onCancel={_formClose}>
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
        <Form.Item label="相对路径" name="bannerImg" rules={[{ message: '请输入图片相对路径' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="标题" name="title" rules={[{ message: '请输入标题' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="跳转地址" name="bannerUrl" rules={[{ message: '请输入跳转地址' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="排序" name="sort" rules={[{ message: '请输入排序号' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="展示结束时间" name="startDate" rules={[{ message: '请输入展示结束时间' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="展示开始时间" name="endDate" rules={[{ message: '请输入展示开始时间' }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AEVersionBDialog
