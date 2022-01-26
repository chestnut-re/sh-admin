import { getRolesAll } from '@/service/role'
import { Form, Input, Modal, Select, Radio, Checkbox, Switch } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { HttpCode } from '@/constants/HttpCode'
import { MessageService } from '@/service/MessageService'

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
const { TextArea } = Input

/**
 * 添加&编辑
 */
const AEMessageDialog: FC<Props> = ({ data, mode, show = false, onSuccess, onClose }) => {
  const [form] = Form.useForm()
  const [messageType, setMessageType] = useState(0)
  const [selectData, setSelectData] = useState<any>({})

  useEffect(() => {
    if (data?.id) {
      getDetails()
    }
  }, [show])

  useEffect(() => {
    form.setFieldsValue({
      pushLink: selectData?.pushLink,
      pushTitle: selectData?.pushTitle,
      pushContent: selectData?.pushContent,
      messageType: selectData?.messageType,
      pushUser: selectData?.pushUser,
    })
    setMessageType(selectData?.messageType ?? 0)
  }, [selectData])

  const getDetails = () => {
    MessageService.details(data?.id).then((res) => {
      setSelectData(res.data)
    })
  }

  /**提交数据 */
  const _handleUpdate = async () => {
    form
      .validateFields()
      .then((formData) => {
        console.log(formData, messageType)
        if (mode === 'add') {
          // create
          MessageService.add({ ...formData, messageType: messageType }).then((res) => {
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
    <>
      {mode == 'add' ? (
        <Modal title="发布消息" visible={show} onOk={_handleUpdate} onCancel={_formClose} okText="推送">
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            // initialValues={{ messageType: 0 }}
            onFinish={(values: any) => {}}
            onFinishFailed={(errorInfo: any) => {}}
            autoComplete="off"
            form={form}
          >
            <Form.Item label="推送用户" name="pushUser">
              <Select>
                <Option value={0}>全部</Option>
                <Option value={1}>B端用户</Option>
                <Option value={2}>C端用户</Option>
              </Select>
            </Form.Item>
            <Form.Item label="消息类型" name="messageType">
              <Radio.Group defaultValue={0} onChange={(e) => setMessageType(e.target.value)}>
                <Radio value={0}>站内信</Radio>
                <Radio value={2}>APP推送</Radio>
                <Radio value={1}>短信</Radio>
              </Radio.Group>
            </Form.Item>

            {messageType === 2 ? (
              <>
                <Form.Item label="推送链接" name="pushLink">
                  <Input />
                </Form.Item>
              </>
            ) : (
              <></>
            )}
            {messageType !== 1 ? (
              <>
                <Form.Item label="推送标题" name="pushTitle">
                  <Input />
                </Form.Item>
              </>
            ) : (
              <></>
            )}
            <Form.Item label="推送内容" name="pushContent">
              <TextArea rows={4} />
            </Form.Item>
            {/* {messageType === 2 ? (
          <div>
            发送条数&nbsp;&nbsp;&nbsp;&nbsp;发送条数：
            <span>200</span>
            条&nbsp;&nbsp;&nbsp;&nbsp;可用短信条数：
            <span>10000</span>条
          </div>
        ) : (
          <></>
        )} */}
          </Form>
        </Modal>
      ) : (
        <Modal title="发布消息" visible={show} footer={null} onOk={_handleUpdate} onCancel={_formClose} okText="推送">
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            // initialValues={{ messageType: 0 }}
            onFinish={(values: any) => {}}
            onFinishFailed={(errorInfo: any) => {}}
            autoComplete="off"
            form={form}
          >
            <Form.Item label="推送用户" name="pushUser">
              <Select>
                <Option value={0}>全部</Option>
                <Option value={1}>B端用户</Option>
                <Option value={2}>C端用户</Option>
              </Select>
            </Form.Item>
            <Form.Item label="消息类型" name="messageType">
              <Radio.Group defaultValue={0} onChange={(e) => setMessageType(e.target.value)}>
                <Radio value={0}>站内信</Radio>
                <Radio value={2}>APP推送</Radio>
                <Radio value={1}>短信</Radio>
              </Radio.Group>
            </Form.Item>

            {messageType === 2 ? (
              <>
                <Form.Item label="推送链接" name="pushLink">
                  <Input />
                </Form.Item>
              </>
            ) : (
              <></>
            )}
            {messageType !== 1 ? (
              <>
                <Form.Item label="推送标题" name="pushTitle">
                  <Input />
                </Form.Item>
              </>
            ) : (
              <></>
            )}
            <Form.Item label="推送内容" name="pushContent">
              <TextArea rows={4} />
            </Form.Item>
            {/* {messageType === 2 ? (
          <div>
            发送条数&nbsp;&nbsp;&nbsp;&nbsp;发送条数：
            <span>200</span>
            条&nbsp;&nbsp;&nbsp;&nbsp;可用短信条数：
            <span>10000</span>条
          </div>
        ) : (
          <></>
        )} */}
          </Form>
        </Modal>
      )}
    </>
  )
}

export default AEMessageDialog
