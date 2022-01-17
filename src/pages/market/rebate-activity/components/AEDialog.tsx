/*
 * @Description:
 * @LastEditTime: 2022-01-17 15:57:44
 */
import { Form, Input, Modal, InputNumber, Radio, Switch, Row, Col, Checkbox, DatePicker } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { HttpCode } from '@/constants/HttpCode'
import { SubCenterSelect } from '@/components/formItem/SubCenterSelect'
import { marketService } from '@/service/marketService'
import ActionConversion from './ActionConversion'
import { dayjsFormat } from '@/utils/dayFormate'
export type DialogMode = 'add' | 'edit'
interface Props {
  data: any
  mode: DialogMode
  show: boolean
  onSuccess: (e) => void
  onClose: () => void
}
const AEDialog: FC<Props> = ({ data, mode, show = false, onSuccess, onClose }) => {
  const [form] = Form.useForm()
  const [day, setDay] = useState('')
  const [type, setType] = useState('')

  useEffect(() => {
    form.setFieldsValue({
      name: '',
      time: [],
      scale: 0,
      description: '',
      state: 1,
      isShareRebate: false,
      shareTotal: 0,
      shareTime: 0,
      isShareSuccess: [],
      isSharePoint: [],
      sharePointIp: 0,
      shareAmount: '1',
      isPullRebate: false,
      pullTotal: 0,
      pullType: '1',
    })
  }, [show])

  /**提交数据 */
  const _handleUpdate = async () => {
    form
      .validateFields()
      .then((formData) => {
        console.log(formData,'formData')
        const postData = { ...formData }
        console.log(postData)
        if (mode === 'add') {
          postData.isSharePoint = Number(formData.isSharePoint)
          postData.isShareSuccess = Number(formData.isShareSuccess)
          postData.isShareRebate = Number(formData.isShareRebate)
          postData.isPullRebate = Number(formData.isPullRebate)
          delete postData.time
          postData.beginTime = new Date(formData.time[0]).getTime()
          postData.endTime = new Date(formData.time[1]).getTime()
          console.log(postData, 'postData')
          // marketService.add({ ...postData }).then((res) => {
          //   if (res.code === HttpCode.success) {
          //     onSuccess(res.data)
          //   }
          // })
        } else {
          marketService.edit({ ...formData, id: data.id }).then((res) => {
            if (res.code === HttpCode.success) {
              onSuccess(res.data)
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
    <Modal title="返利活动" width={980} visible={show} onOk={_handleUpdate} onCancel={_formClose}>
      <Form
        name="basic"
        // labelCol={{ span: 20 }}
        // wrapperCol={{ span: 20 }}
        initialValues={{ saleScale: 0 }}
        autoComplete="off"
        form={form}
      >
        <Form.Item label="活动名称" name="name" rules={[{ required: true, message: '请输入' }]}>
          <Input style={{ width: '200px' }} />
        </Form.Item>
        <Form.Item label="活动时间" name="time" rules={[{ required: true, message: '请输入' }]}>
          <DatePicker.RangePicker
            format="YYYY-MM-DD HH:mm:ss"
            showTime={{
              hideDisabledOptions: true,
            }}
          />
          {/* <Input style={{ width: '200px' }} /> */}
        </Form.Item>
        {/* <Form.Item label="活动结束时间" name="endTime" rules={[{ required: true, message: '请输入' }]}>
          <Input style={{ width: '200px' }} />
        </Form.Item> */}
        <Form.Item label="返利比例" name="scale" rules={[{
                    pattern: /^[0-9]\d{0,1}$/,
                    message: '请输入0-100的整数!',
                  },{ required: true, message: '请输入' }]}>
          <InputNumber addonBefore="实付款" style={{ width: '160px' }} addonAfter="%" type="number" />
        </Form.Item>
        <Form.Item label="分享文案" name="description" rules={[{ required: true, message: '请输入' }]}>
          <Input.TextArea showCount maxLength={20} />
        </Form.Item>

        <ActionConversion></ActionConversion>
      </Form>
    </Modal>
  )
}

export default AEDialog
