
// import { BannerService } from '@/service/BannerService'
import { usersAddUser } from '@/service/user'

import { Form, Input, Modal, Select ,Button,Row,Col} from 'antd'
import React, { FC, useEffect, useState } from 'react'
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
    form.setFieldsValue({
      bannerImg: data?.bannerImg,
      title: data?.title,
      bannerUrl: data?.bannerUrl,
      sort: data?.sort,
      startDate: data?.startDate,
      endDate: data?.endDate,
    })
  }, [show])

  /**提交数据 */
  const _handleUpdate = async () => {
    form
      .validateFields()
      .then((formData) => {
        if (mode === 'add') {
          // create
          usersAddUser({ ...formData }).then((res) => {
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
        <Form.Item label="姓名" name="realName" rules={[{ message: '请输入姓名' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="角色ID" name="roleId" rules={[{ message: '请输入角色ID' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="手机号" name="phoneNumber" rules={[{ message: '请输入手机号' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="微信号" name="wechatNumber" rules={[{ message: '请输入排序号' }]}>
          <Input />
        </Form.Item>
      
        <Form.Item label="验证码" >
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="vaildCode"
              noStyle
              rules={[{ required: true, message: '请输入验证码' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button>获取验证码</Button>
          </Col>
        </Row>
      </Form.Item>

      
      </Form>
    </Modal>
  )
}

export default AEBannerDialog
