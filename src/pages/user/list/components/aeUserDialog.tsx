/*
 * @Description: 用户详情
 * @LastEditTime: 2022-01-28 11:29:20
 */

import { usersAddUser } from '@/service/user'
import { status, regCode } from '@/utils/enum'
import { Form, Input, Modal, Select, Button, Row, Col } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import {maskTel} from '@/utils/util'
import { HttpCode } from '@/constants/HttpCode'
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
const AEBannerDialog: FC<Props> = ({ data, mode, show = false, onSuccess, onClose }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (show) {
      form.setFieldsValue({
        address: data?.address,
        phone: maskTel(data?.phone),
        registerChannel: regCode[data?.registerChannel],
        registerTime: data?.registerTime,
        state: status[data?.state],
        tokenAmount: data?.tokenAmount,
        userName: data?.userName,
        relationChannel:data?.relationChannel
      })
    }
  }, [show])

  /**提交数据 */
  const _handleUpdate = async () => {
    if (mode === 'add') {
      form
        .validateFields()
        .then((formData) => {
          // create
          usersAddUser({ ...formData }).then((res) => {
            if (res.code === HttpCode.success) {
              onSuccess()
            }
          })
        })
        .catch((e) => {
          console.error(e)
        })
    } else {
      onSuccess()
      //edit
      // BannerService.edit({ ...formData }).then((res) => {
      //   if (res.code === HttpCode.success) {
      //     onSuccess()
      //   }
      // })
    }
  }

  const _formClose = () => {
    form.resetFields()
    onClose()
  }

  return (
    <Modal
      title={mode == 'edit' ? '查看' : '创建'}
      getContainer={false}
      visible={show}
      onCancel={_formClose}
      footer={[
        <Button key="ok" type="primary" onClick={_handleUpdate}>
          确定
        </Button>,
      ]}
      // onCancel={_formClose}
    >
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        form={form}
      >
        <Form.Item label="姓名" name="userName" rules={[{ message: '请输入姓名' }]}>
          <Input disabled={mode == 'edit'} />
        </Form.Item>
        <Form.Item label="手机号" name="phone" rules={[{ message: '请输入手机号' }]}>
          <Input disabled={mode == 'edit'} />
        </Form.Item>
        <Form.Item label="常住地址" name="address" rules={[{ message: '请输入常住地址' }]}>
          <Input disabled={mode == 'edit'} />
        </Form.Item>
        <Form.Item label="注册途径" name="registerChannel" rules={[{ message: '请输入' }]}>
          <Input disabled={mode == 'edit'} />
        </Form.Item>
        <Form.Item label="注册时间" name="registerTime" rules={[{ message: '请输入' }]}>
          <Input disabled={mode == 'edit'} />
        </Form.Item>
        <Form.Item label="关系归属" name="relationChannel" rules={[{ message: '请输入' }]}>
          <Input disabled={mode == 'edit'} />
        </Form.Item>
        <Form.Item label="状态" name="state" rules={[{ message: '请输入' }]}>
          <Input disabled={mode == 'edit'} />
        </Form.Item>
        <Form.Item label="账户代币余额" name="tokenAmount" rules={[{ message: '请输入' }]}>
          <Input disabled={mode == 'edit'} />
        </Form.Item>

        {/* <Form.Item label="验证码">
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item name="vaildCode" noStyle rules={[{ required: true, message: '请输入验证码' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Button>获取验证码</Button>
            </Col>
          </Row>
        </Form.Item> */}
      </Form>
    </Modal>
  )
}

export default AEBannerDialog
