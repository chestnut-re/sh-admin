import { BannerService } from '@/service/BannerService'
import { Form, Input, Modal, DatePicker } from 'antd'
import React, { FC, useEffect } from 'react'
import { HttpCode } from '@/constants/HttpCode'
import dayjs from 'dayjs'
import moment from 'moment'
import UploadImage from '@/components/formItem/UploadImage'
import { formateTime } from '@/utils/timeUtils'

export type DialogMode = 'add' | 'edit'

interface Props {
  data: any
  mode: DialogMode
  show: boolean
  /**内容修改成功回调，页面需要刷新数据 */
  onSuccess: () => void
  onClose: () => void
}

/**
 * 添加&编辑
 */
const AEBannerDialog: FC<Props> = ({ data, mode, show = false, onSuccess, onClose }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      bannerImg: data?.bannerImg,
      title: data?.title,
      bannerUrl: data?.bannerUrl,
      sort: data?.sort,
      startDate: moment(dayjs(data?.startDate).format('YYYY-MM-DD HH:mm:ss')),
      endDate: moment(dayjs(data?.endDate).format('YYYY-MM-DD HH:mm:ss')),
    })
  }, [show])

  /**提交数据 */
  const _handleUpdate = async () => {
    form
      .validateFields()
      .then((formData) => {
        console.log(formData)
        formData.startDate = formateTime(formData.startDate)
        formData.endDate = formateTime(formData.endDate)
        if (mode === 'add') {
          // create
          BannerService.newBanner({ ...formData }).then((res) => {
            if (res.code === HttpCode.success) {
              onSuccess()
            }
          })
        } else {
          //edit
          BannerService.edit({ ...formData, id: data.id }).then((res) => {
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
    <Modal title="用户" visible={show} onOk={_handleUpdate} onCancel={_formClose}>
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        form={form}
      >
        <Form.Item label="图片" name="bannerImg" rules={[{ required: true, message: '请输入图片相对路径' }]}>
          <UploadImage />
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
        <Form.Item label="展示开始时间" name="startDate">
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item label="展示结束时间" name="endDate">
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AEBannerDialog
