/*
 * @Description: 添加渠道
 * @LastEditTime: 2021-12-21 16:07:01
 */

import { createUser, editUser } from '@/service/user'
import { Form, Input, Modal, Select, Cascader } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import {cityDispose} from '@/utils/city'
export type DialogMode = 'add' | 'edit'

interface Props {
  data: any
  mode: DialogMode
  show: boolean
  cityData: Array<any>
  onSuccess: () => void
  onClose: () => void
}

const { Option } = Select

/**
 * 添加&编辑
 */
const AddUserDialog: FC<Props> = ({ data, mode, show = false, cityData, onSuccess, onClose }) => {
  const [form] = Form.useForm()
  const [selectedRoles, setSelectedRoles] = useState<Array<any>>([])
  const [roles] = useState<Array<any>>([])

  useEffect(() => {
    // cityDispose()
    setSelectedRoles(data?.roles ?? [])
    console.log(cityData, '--111-')
  }, [cityData])

  useEffect(() => {
    // getRolesAll().then((res) => {
    //   setRoles(res.data)
    // })
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
  const casOnChange = (e) => {
    console.log(e)
  }

  return (
    <Modal title={mode == 'add' ? '创建渠道' : '渠道详情'} visible={show} onOk={_handleUpdate} onCancel={_formClose}>
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={(values: any) => {
          console.log(values)
        }}
        onFinishFailed={(errorInfo: any) => {
          console.log(errorInfo)
        }}
        autoComplete="off"
        form={form}
      >
        <Form.Item label="分中心名称" name="name" rules={[{ required: true, message: '请输入账号' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="责任区域" name="region" rules={[{ required: true, message: '请输入姓名' }]}>
          {/* <Input /> */}
          <Cascader
            options={cityData}
            defaultValue={[['340000', '340800']]}

            onChange={casOnChange}
            multiple
            fieldNames={{ label: 'name', value: 'adcode', children: 'areas' }}
          />
        </Form.Item>
        <Form.Item label="责任人姓名" name="person" rules={[{ required: true, message: '请输入密码' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="手机号" name="mobile" rules={[{ required: true, message: '请输入密码' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="归属渠道" name="parentId" rules={[{ required: true, message: '请输入密码' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="客服热线" name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input />
        </Form.Item>

        {/* <Form.Item label="角色" name="roles">
          <Select mode="multiple" allowClear placeholder="请选择角色" value={selectedRoles} onChange={handleChange}>
            {roles.map((i) => {
              return (
                <Option key={i.id} value={i.id}>
                  {i.name}
                </Option>
              )
            })}
          </Select>
        </Form.Item> */}
      </Form>
    </Modal>
  )
}

export default AddUserDialog
