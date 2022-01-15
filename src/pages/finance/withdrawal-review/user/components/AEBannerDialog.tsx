import { Form, Input, Modal, DatePicker, Select, Radio } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { HttpCode } from '@/constants/HttpCode'
import dayjs from 'dayjs'
import moment from 'moment'
import { WithdrawalReviewService } from '@/service/FinanceAccountService'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

export type DialogMode = 'see' | 'edit'

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
  const { Option } = Select
  const { TextArea } = Input
  const [sts, setSts] = useState('2')

  useEffect(() => {
    form.setFieldsValue({
      channelNm: data?.channelNm,
      name: data?.name,
      account: data?.account,
      amount: data?.amount,
      rejectReason: data?.rejectReason,
      remark: data?.remark,
    })
    if (mode == 'see') {
      if (data?.sts == '1') {
        form.setFieldsValue({
          sts: '待审核',
        })
      } else if (data?.sts == '2') {
        form.setFieldsValue({
          sts: '已通过',
        })
      } else if (data?.sts == '3') {
        form.setFieldsValue({
          sts: '已驳回',
        })
      }
    } else {
      form.setFieldsValue({
        sts: data?.sts,
      })
    }
  }, [show])

  /**提交数据 */
  const _handleUpdate = async () => {
    form
      .validateFields()
      .then((formData) => {
        formData.startDate = formData.time ? dayjs(formData.time[0]).format('YYYY-MM-DD HH:mm:ss') : ''
        formData.endDate = formData.time ? dayjs(formData.time[1]).format('YYYY-MM-DD HH:mm:ss') : ''
        if (mode === 'see') {
          onSuccess()
        } else {
          //edit
          WithdrawalReviewService.edit({
            rejectReason: formData?.rejectReason,
            remark: formData?.remark,
            sts: formData?.sts,
            id: data?.id,
            type: 2,
          }).then((res) => {
            // if (res.code === HttpCode.success) {
            onSuccess()
            // }
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
    <Modal title="提现审核" visible={show} onOk={_handleUpdate} onCancel={_formClose} okText="确认" cancelText="取消">
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        form={form}
      >
        <Form.Item label="所属渠道" name="channelNm">
          <Input readOnly />
        </Form.Item>
        <Form.Item label="姓名" name="name">
          <Input readOnly />
        </Form.Item>
        <Form.Item label="账户" name="account">
          <Input readOnly />
        </Form.Item>
        <Form.Item label="提现金额" name="amount">
          <Input readOnly />
        </Form.Item>

        {mode == 'see' ? (
          <>
            <Form.Item label="审核状态" name="sts">
              <Input readOnly />
            </Form.Item>
          </>
        ) : (
          <>
            <Form.Item label="审核状态" name="sts">
              <Radio.Group value={sts} onChange={(e) => setSts(e.target.value)}>
                <Radio value={2}>通过</Radio>
                <Radio value={3}>驳回</Radio>
              </Radio.Group>
            </Form.Item>
          </>
        )}
        {sts == '2' ? (
          <Form.Item label="审核备注" name="remark">
            <TextArea readOnly={mode == 'see' ? true : false} rows={4} />
          </Form.Item>
        ) : (
          <Form.Item label="驳回理由" name="rejectReason">
            <TextArea readOnly={mode == 'see' ? true : false} rows={4} />
          </Form.Item>
        )}
      </Form>
    </Modal>
  )
}

export default AEBannerDialog
