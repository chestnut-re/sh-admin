import { getRolesAll } from '@/service/role'
import { Form, Input, Modal, Select, Radio, Checkbox, Switch } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { HttpCode } from '@/constants/HttpCode'
// import { AdminService } from '@/service/AdminService'

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
const AEPaymentDialog: FC<Props> = ({ data, mode, show = false, onSuccess, onClose }) => {
  const [form] = Form.useForm()
  const [role, setRole] = useState('全部')
  const [state, setState] = React.useState(1)

  const roleList = [
    {
      key: 1,
      value: '全部',
    },
    {
      key: 2,
      value: '超管',
    },
    {
      key: 3,
      value: '运营管家',
    },
    {
      key: 4,
      value: '运营商品小二',
    },
    {
      key: 5,
      value: '运营营销小二',
    },
    {
      key: 6,
      value: '运营渠道小二',
    },
    {
      key: 7,
      value: '运营财务小二',
    },
    {
      key: 8,
      value: '分中心',
    },
  ]

  useEffect(() => {
    form.setFieldsValue({
      roleName: data?.roleName,
      nickName: data?.nickName,
      mobile: data?.mobile,
      state: data?.state,
    })
  }, [show])

  /**提交数据 */
  const _handleUpdate = async () => {
    form
      .validateFields()
      .then((formData) => {
        console.log(formData)
        if (mode === 'add') {
          // create
          // AdminService.add({ ...formData, roleId: 0 }).then((res) => {
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
    <Modal title="用户" visible={show} onOk={_handleUpdate} onCancel={_formClose} okText="保存提交">
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
        <Form.Item label="模版名称" name="roleName" rules={[{ required: true, message: '请输入模版名称' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="支付方式" name="state" rules={[{ required: true, message: '请选择支付方式' }]}>
          <Radio.Group onChange={(e) => setState(e.target.value)} value={state}>
            <Radio value={0}>微信</Radio>
            <Radio value={1}>支付宝</Radio>
          </Radio.Group>
        </Form.Item>
        {state === 0 ? (
          <>
            <Form.Item label="支付密钥" name="mobile" rules={[{ required: true, message: '请输入支付密钥' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="商户证书" name="mobile" rules={[{ required: true, message: '请输入商户证书' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="商户key证书" name="mobile" rules={[{ required: true, message: '请输入商户key证书' }]}>
              <Input />
            </Form.Item>
          </>
        ) : (
          <>
            <Form.Item label="应用ID" name="mobile" rules={[{ required: true, message: '请输入支付密钥' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="支付宝公钥" name="mobile" rules={[{ required: true, message: '请输入商户证书' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="应用私钥" name="mobile" rules={[{ required: true, message: '请输入商户key证书' }]}>
              <Input />
            </Form.Item>
          </>
        )}
        <Form.Item label="发布渠道" name="qudao">
          <Checkbox.Group>
            <Checkbox value="APP">APP</Checkbox>
            <Checkbox value="小程序">小程序</Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item label="启用状态" name="state" rules={[{ required: true, message: '请选择状态' }]}>
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AEPaymentDialog
