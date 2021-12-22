import { getRolesAll } from '@/service/role'
import { BannerService } from '@/service/BannerService'
import { Form, Input, Modal, Select, DatePicker } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { HttpCode } from '@/constants/HttpCode'
import dayjs from 'dayjs'
import moment from 'moment'

export type DialogMode = 'add' | 'edit'

interface Props {
  data: any
  mode: DialogMode
  show: boolean
  /**内容修改成功回调，页面需要刷新数据 */
  onSuccess: () => void
  onClose: () => void
}

const { Option } = Select

/**
 * 添加&编辑
 */
const AEBannerDialog: FC<Props> = ({ data, mode, show = false, onSuccess, onClose }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    console.log(data)
    form.setFieldsValue({
      bannerImg: data?.bannerImg,
      title: data?.title,
      bannerUrl: data?.bannerUrl,
      sort: data?.sort,
      startDate: moment(dayjs(data?.startDate.split('+')[0]).format('YYYY-MM-DD HH:mm:ss')),
      endDate: moment(dayjs(data?.endDate.split('+')[0]).format('YYYY-MM-DD HH:mm:ss')),
    })
  }, [show])

  /**提交数据 */
  const _handleUpdate = async () => {
    form
      .validateFields()
      .then((formData) => {
        if (mode === 'add') {
          // create
          formData.startDate = dayjs(formData.startDate).format('YYYY-MM-DD HH:mm')
          formData.endDate = dayjs(formData.endDate).format('YYYY-MM-DD HH:mm')
          BannerService.newBanner({ ...formData }).then((res) => {
            if (res.code === HttpCode.success) {
              onSuccess()
            }
          })
          console.log(formData)
        } else {
          //edit

          BannerService.edit({ ...formData, id: data.id }).then((res) => {
            if (res.code === HttpCode.success) {
              onSuccess()
            }
          })
          console.log(formData)
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
  const onChange = (value, dateString) => {
    console.log('Selected Time: ', value)
    console.log('Formatted Selected Time: ', dateString)
  }

  const onOk = (value) => {
    console.log('onOk: ', value)
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
        <Form.Item label="相对路径" name="bannerImg" rules={[{ required: true, message: '请输入图片相对路径' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="跳转地址" name="bannerUrl" rules={[{ required: true, message: '请输入跳转地址' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="排序" name="sort">
          <Input />
        </Form.Item>
        <Form.Item label="展示结束时间" name="startDate">
          <DatePicker showTime onChange={onChange} onOk={onOk} format="YYYY-MM-DD HH:mm" />
        </Form.Item>
        <Form.Item label="展示开始时间" name="endDate">
          <DatePicker showTime onChange={onChange} onOk={onOk} format="YYYY-MM-DD HH:mm" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AEBannerDialog
