import { BannerService } from '@/service/BannerService'
import { Form, Input, Modal, DatePicker } from 'antd'
import React, { FC, useEffect } from 'react'
import { HttpCode } from '@/constants/HttpCode'
import dayjs from 'dayjs'
import moment from 'moment'
import UploadImage from '@/components/formItem/UploadImage'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

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
  const { RangePicker } = DatePicker

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
    console.log(form.getFieldsValue())

    form
      .validateFields()
      .then((formData) => {
        formData.startDate = formData.time ? dayjs(formData.time[0]).format('YYYY-MM-DD HH:mm:ss') : ''
        formData.endDate = formData.time ? dayjs(formData.time[1]).format('YYYY-MM-DD HH:mm:ss') : ''
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
    console.log('_formClose')
    form.resetFields()
    onClose()
  }

  return (
    <Modal title="轮播图配置" visible={show} onOk={_handleUpdate} onCancel={_formClose} afterClose={_formClose}>
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
        <Form.Item label="展示时段" name="time">
          <RangePicker showTime locale={locale} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AEBannerDialog
