import { getRolesAll } from '@/service/role'
import { Form, Input, Modal, Select, Radio } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { HttpCode } from '@/constants/HttpCode'
import { AdminService } from '@/service/AdminService'
import { getRoles } from '@/service/role'

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
  const [roleList, setRoleList] = useState([])
  const [state, setState] = React.useState(1)
  const [roleId, setRoleId] = React.useState('')

  useEffect(() => {
    form.setFieldsValue({
      roleName: data?.roleName,
      nickName: data?.nickName,
      mobile: data?.mobile,
      state: data?.state,
    })
    loadRoleData()
  }, [show])

  const loadRoleData = () => {
    getRoles({ state: 0 }).then((res) => {
      setRoleList(res.data)
    })
  }

  /**提交数据 */
  const _handleUpdate = async () => {
    form
      .validateFields()
      .then((formData) => {
        if (mode === 'add') {
          // create
          AdminService.add({
            mobile: formData.mobile,
            nickName: formData.nickName,
            roleId: roleId,
            state: formData.state,
          }).then((res) => {
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
    <Modal
      title="添加管理员"
      visible={show}
      onOk={_handleUpdate}
      onCancel={_formClose}
      cancelText="取消"
      okText="保存提交"
    >
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
        <Form.Item label="角色" name="roleName">
          <Select placeholder="请选择角色" onChange={(value, e) => setRoleId(e.key)}>
            {roleList.map((item) => {
              return (
                <Option value={item.roleName} key={item.id}>
                  {item.roleName}
                </Option>
              )
            })}
          </Select>
        </Form.Item>
        <Form.Item label="姓名" name="nickName" rules={[{ required: true, message: '请输入姓名' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="手机号/账号"
          // style={{ width: 500 }}
          name="mobile"
          rules={[{ required: true, message: '请输入手机号/账号' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateAdminDialog
