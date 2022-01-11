import React, { FC, useEffect, useState } from 'react'
import { Form, Input, Modal, Select, Radio, message } from 'antd'
import { HttpCode } from '@/constants/HttpCode'
import { MessageService } from '@/service/MessageService'

/**
 * 添加版本弹框
 */

export type DialogMode = 'get' | 'edit'

export type DialogType = '0' | '1' | '2'
interface Props {
  data: any
  mode: DialogMode
  type: DialogType
  show: boolean
  /**内容修改成功回调，页面需要刷新数据 */
  onSuccess: () => void
  onClose: () => void
}
const AEVersionDialog: FC<Props> = ({ data, mode, type, show = false, onSuccess, onClose }) => {
  const [form] = Form.useForm()
  const { TextArea } = Input
  const [title, setTitle] = useState('查看')
  const [contentData, setContentData] = useState({})
  useEffect(() => {
    if (data?.messageType) {
      getContent()
    }
    if (mode == 'edit') {
      setTitle('编辑')
    } else {
      setTitle('查看')
    }
  }, [show])

  useEffect(() => {
    let messageType
    if (data?.messageType == '20') {
      messageType = `订单创建时`
    } else if (data?.messageType == '21') {
      messageType = `订单付款后`
    } else if (data?.messageType == '22') {
      messageType = `订单完成`
    } else if (data?.messageType == '23') {
      messageType = `订单退款通知`
    } else if (data?.messageType == '24') {
      messageType = `提现审核通知`
    } else if (data?.messageType == '25') {
      messageType = `建团`
    } else if (data?.messageType == '26') {
      messageType = `发团通知`
    } else if (data?.messageType == '27') {
      messageType = `修改出发时间`
    } else if (data?.messageType == '28') {
      messageType = `行程结束`
    } else if (data?.messageType == '29') {
      messageType = `人员变动通知（进团/出团）`
    } else if (data?.messageType == '210') {
      messageType = `沟通权限申请通知`
    } else if (data?.messageType == '211') {
      messageType = `区域库审核通知`
    }
    form.setFieldsValue({
      titleType: contentData?.titleType,
      messageType: messageType,
      title: contentData?.title,
      content: contentData?.content,
    })
  }, [contentData])

  const getContent = () => {
    MessageService.templateGet({ messageType: data?.messageType, pushType: type }).then((res) => {
      setContentData(res.data)
    })
  }
  /**提交数据 */
  const _handleUpdate = async () => {
    form
      .validateFields()
      .then((formData) => {
        if (mode === 'edit') {
          MessageService.templateEdit({ ...formData, pushType: type, messageType: data?.messageType }).then((res) => {
            if (res.code === HttpCode.success) {
              onSuccess()
            }
          })
        } else {
          onSuccess()
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
    <Modal title={title} visible={show} onOk={_handleUpdate} onCancel={_formClose}>
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
        <Form.Item label="消息类型" name="messageType">
          <Input readOnly={mode == 'edit' ? false : true} />
        </Form.Item>
        <Form.Item label="标签说明"></Form.Item>
        {type == '1' ? (
          ''
        ) : (
          <>
            <Form.Item label="推送标题" name="titleType">
              <Radio.Group defaultValue={0}>
                <Radio value={1}>自定义</Radio>
                <Radio value={0}>商品名称</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="" name="title" style={{ marginLeft: 120 }}>
              <Input />
            </Form.Item>
          </>
        )}

        <Form.Item label="推送内容" name="content">
          <TextArea rows={6} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AEVersionDialog
