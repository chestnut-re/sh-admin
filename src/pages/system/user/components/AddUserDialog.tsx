import { getRolesAll } from '@/service/role'
import { createUser, editUser } from '@/service/user'
import { Form, Input, Modal, Select } from 'antd'
import React, { FC, useEffect, useState } from 'react'

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
const AddUserDialog: FC<Props> = ({ data, mode, show = false, onSuccess, onClose }) => {
  const [form] = Form.useForm()
  const [selectedRoles, setSelectedRoles] = useState<Array<any>>([])
  const [roles, setRoles] = useState<Array<any>>([])

  useEffect(() => {
    setSelectedRoles(data?.roles ?? [])
  }, [data])

  useEffect(() => {
    getRolesAll().then((res) => {
      setRoles(res.data)
    })
  }, [])

  useEffect(() => {
    form.setFieldsValue({
      id: data?.id,
      name: data?.name,
      account: data?.account,
      password: data?.pwd,
      roles: data?.roles,
    })
  }, [show])

  /**提交数据 */
  const _handleUpdate = async () => {
    form
      .validateFields()
      .then((formData) => {
        if (mode === 'add') {
          // create
          const postData = { ...formData, menus: selectedRoles }
          console.log(postData)
          createUser(postData).then((res) => {
            if (res.code === 200) {
              onSuccess()
            }
          })
        } else {
          const postData = {
            ...formData,
            id: data?.id,
            menus: selectedRoles,
          }
          console.log('postData', postData)
          editUser(postData).then((res) => {
            if (res.code === 200) {
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

  const handleChange = (value) => {
    console.log(value)
    setSelectedRoles(value)
  }

  return (
    <Modal title="用户" visible={show} onOk={_handleUpdate} onCancel={_formClose}>
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
        <Form.Item label="账号" name="account" rules={[{ required: true, message: '请输入账号' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="姓名" name="name" rules={[{ required: true, message: '请输入姓名' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item label="角色" name="roles">
          <Select mode="multiple" allowClear placeholder="请选择角色" value={selectedRoles} onChange={handleChange}>
            {roles.map((i) => {
              return (
                <Option key={i.id} value={i.id}>
                  {i.name}
                </Option>
              )
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddUserDialog
