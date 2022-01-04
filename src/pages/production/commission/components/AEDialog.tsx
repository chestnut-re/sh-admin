import { Form, Input, Modal, InputNumber, Radio } from 'antd'
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
  const [day, setDay] = useState('')
  const [type, setType] = useState('')

  useEffect(() => {
    form.setFieldsValue({
      planName: data?.planName,
      saleScale: data?.saleScale,
      channelPlanList: data?.channelPlanList.map((item, index) => {
        item.key = `${Date.now()}-${index}`
        return item
      }),
      saleSettleType: data?.saleSettleType,
    })
  }, [show])

  /**提交数据 */
  const _handleUpdate = async () => {
    form
      .validateFields()
      .then((formData) => {
        console.log(formData, day, type)
        if (mode === 'add') {
          ProductionCommission.add({ ...formData, saleSettleDay: day, saleSettleType: type }).then((res) => {
            if (res.code === HttpCode.success) {
              onSuccess()
            }
          })
        } else {
          ProductionCommission.edit({ ...formData, id: data.id }).then((res) => {
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
    <Modal title="商品分佣方案" visible={show} onOk={_handleUpdate} onCancel={_formClose}>
      <Form
        name="basic"
        // labelCol={{ span: 20 }}
        // wrapperCol={{ span: 20 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        form={form}
      >
        <Form.Item label="方案名称" name="planName" rules={[{ required: true, message: '请输入' }]}>
          {mode == 'add' ? <Input style={{ width: '200px' }} /> : <Input style={{ width: '200px' }} readOnly />}
        </Form.Item>
        <p>直销商品分佣方案配置</p>

        <Form.Item label="" name="channelPlanList" rules={[]}>
          <SubCenterSelect mode={mode} />
        </Form.Item>
        <p>分销商品分佣方案配置</p>
        <Form.Item label="分佣比例" name="saleScale">
          {mode == 'add' ? (
            <InputNumber style={{ width: '100px' }} addonAfter="%" type="number" />
          ) : (
            <InputNumber style={{ width: '100px' }} addonAfter="%" type="number" readOnly />
          )}
        </Form.Item>
        {mode == 'add' ? (
          <Form.Item label="直销/分销结算要求">
            <Radio.Group onChange={(e) => setType(e.target.value)}>
              <Radio value={1}>核销</Radio>
              <Radio value={2}>行程结束</Radio>
            </Radio.Group>
            <span>
              且需满
              {/* <Form.Item name="groupSettleDay" style={{ marginBottom: '0', display: 'inline-block' }}> */}
              <InputNumber value={day} onChange={(value) => setDay(value)} addonAfter="天" style={{ width: 100 }} />
              {/* </Form.Item> */}
            </span>
          </Form.Item>
        ) : (
          <Form.Item label="直销/分销结算要求" name="saleSettleType">
            <Radio.Group disabled value={data?.saleSettleType}>
              <Radio value={1}>核销</Radio>
              <Radio value={2}>行程结束</Radio>
            </Radio.Group>
            <span>
              且需满
              {/* <Form.Item name="groupSettleDay" style={{ marginBottom: '0', display: 'inline-block' }}> */}
              <InputNumber value={data?.saleSettleDay} addonAfter="天" style={{ width: 100 }} />
              {/* </Form.Item> */}
            </span>
          </Form.Item>
        )}
      </Form>
    </Modal>
  )
}

export default AEDialog
