import { Form, Input, Modal, DatePicker, Row, Col, InputNumber } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { HttpCode } from '@/constants/HttpCode'
import { SubCenterSelect } from '@/components/formItem/SubCenterSelect'
import { ProductionCommission } from '@/service/ProductionCommission'

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
const AEDialog: FC<Props> = ({ data, mode, show = false, onSuccess, onClose }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      planName: data?.planName,
      saleScale: data?.saleScale,
      channelPlanList: data?.channelPlanList.map((item, index) => {
        item.key = `${Date.now()}-${index}`
        return item
      }),
    })
  }, [show])

  /**提交数据 */
  const _handleUpdate = async () => {
    form
      .validateFields()
      .then((formData) => {
        console.log(formData)
        if (mode === 'add') {
          ProductionCommission.add({ ...formData }).then((res) => {
            if (res.code === HttpCode.success) {
              onSuccess()
            }
          })
        } else {
          // ProductionCommission.edit({ ...formData, id: data.id }).then((res) => {
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
    <Modal title="商品分佣方案" visible={show} onOk={_handleUpdate} onCancel={_formClose}>
      <Form
        name="basic"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 30 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        form={form}
      >
        <Form.Item label="方案名称" name="planName" rules={[{ required: true, message: '请输入' }]}>
          <Input />
        </Form.Item>
        <p>直销商品分佣方案配置</p>

        <Form.Item label="" name="channelPlanList" rules={[]}>
          <SubCenterSelect />
        </Form.Item>
        <p>分销商品分佣方案配置</p>
        <Form.Item label="分佣比例" name="saleScale">
          <InputNumber style={{ width: '100px' }} addonAfter="%" type="number" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AEDialog
