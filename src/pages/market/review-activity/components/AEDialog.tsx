/*
 * @Description:
 * @LastEditTime: 2022-01-05 15:34:02
 */
import { Form, Input, Modal, InputNumber, Radio, Switch, Row, Col, Checkbox } from 'antd'
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
    <Modal title="返利活动" width={900} visible={show} onOk={_handleUpdate} onCancel={_formClose}>
      <Form
        name="basic"
        // labelCol={{ span: 20 }}
        // wrapperCol={{ span: 20 }}
        initialValues={{ saleScale: 0 }}
        autoComplete="off"
        form={form}
      >
        <Form.Item label="活动名称" name="planName" rules={[{ required: true, message: '请输入' }]}>
          <Input style={{ width: '200px' }} />
        </Form.Item>
        <Form.Item label="活动时间" name="planName" rules={[{ required: true, message: '请输入' }]}>
          <Input style={{ width: '200px' }} />
        </Form.Item>

        <Form.Item label="返利比例" name="saleScale">
          <InputNumber addonBefore="实付款" style={{ width: '160px' }} addonAfter="%" type="number" />
        </Form.Item>
        <Form.Item label="分享文案" name="planName" rules={[{ required: true, message: '请输入' }]}>
          <Input.TextArea showCount maxLength={20} />
        </Form.Item>

        <Row>
          <Col span={24}>
            <Form.Item name="checked" label="分享返利" valuePropName="checked">
              <Switch checkedChildren="开启" unCheckedChildren="关闭" />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="checked" label="任务目标" valuePropName="checked">
              <Switch checkedChildren="开启" unCheckedChildren="关闭" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="checked" valuePropName="checked">
              <Switch checkedChildren="开启" unCheckedChildren="关闭" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="checked" label="完成条件">
              <Checkbox.Group>
                <Checkbox value="A" style={{ lineHeight: '32px' }}>
                  分享成功
                </Checkbox>
                <Checkbox value="A" style={{ lineHeight: '32px' }}>
                  触达独立IP
                </Checkbox>
              </Checkbox.Group>
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item name="checked">
              <InputNumber addonAfter="个" style={{ width: '100px' }} type="number" />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item name="checked" label="行动转化" valuePropName="checked">
              <Switch checkedChildren="开启" unCheckedChildren="关闭" />
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item name="checked" label="任务目标" valuePropName="checked">
            <InputNumber addonBefore="转化" addonAfter="个" style={{ width: '170px' }} type="number" />
            </Form.Item>
          </Col>
        
          <Col span={12}>
            <Form.Item name="checked" label="完成条件">
              <Radio.Group>
                <Radio value="A" style={{ lineHeight: '32px' }}>
                  新用户注册
                </Radio>
                <Radio value="A" style={{ lineHeight: '32px' }}>
                  订单核销
                </Radio>
                <Radio value="A" style={{ lineHeight: '32px' }}>
                  行程结束
                </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          {/* <Col span={2}>
            <Form.Item name="checked">
              <InputNumber addonAfter="个" style={{ width: '100px' }} type="number" />
            </Form.Item>
          </Col> */}
        </Row>

      </Form>
    </Modal>
  )
}

export default AEDialog
