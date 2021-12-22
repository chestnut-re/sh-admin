import { getRolesAll } from '@/service/role'
import { Form, Input, Modal, Select, Radio } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { HttpCode } from '@/constants/HttpCode'
import { AdminService } from '@/service/AdminService'

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
const CreateAdminDialog: FC<Props> = ({ data, mode, show = false, onSuccess, onClose }) => {
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
          AdminService.add({ ...formData, roleId: 0 }).then((res) => {
            if (res.code === HttpCode.success) {
              onSuccess()
            }
          })
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
        <Form.Item label="角色" name="roleName" rules={[{ required: true, message: '请选择角色' }]}>
          <Select placeholder="请选择角色" style={{ width: 120 }} onChange={(value) => setRole(value)}>
            {roleList.map((item) => {
              return (
                <Option value={item.value} key={item.key}>
                  {item.value}
                </Option>
              )
            })}
          </Select>
        </Form.Item>
        <Form.Item label="姓名" name="nickName" rules={[{ required: true, message: '请输入姓名' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="手机号/账号" name="mobile" rules={[{ required: true, message: '请输入手机号/账号' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="状态" name="state" rules={[{ required: true, message: '请选择状态' }]}>
          <Radio.Group onChange={(e) => setState(e.target.value)} value={state}>
            <Radio value={0}>禁用</Radio>
            <Radio value={1}>正常</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateAdminDialog
