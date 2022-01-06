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
const { TextArea } = Input

/**
 * 添加&编辑
 */
const AEMessageDialog: FC<Props> = ({ data, mode, show = false, onSuccess, onClose }) => {
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
    <Modal title="发布消息" visible={show} onOk={_handleUpdate} onCancel={_formClose} okText="推送">
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
        <Form.Item label="推送用户" name="roleName">
          <Select defaultValue={''}>
            <Option value={''}>全部</Option>
          </Select>
        </Form.Item>
        <Form.Item label="消息类型" name="state">
          <Radio.Group defaultValue={0} onChange={(e) => setState(e.target.value)} value={state}>
            <Radio value={0}>APP推送</Radio>
            <Radio value={1}>站内信</Radio>
            <Radio value={2}>短信</Radio>
          </Radio.Group>
        </Form.Item>

        {state === 0 ? (
          <>
            <Form.Item label="推送链接" name="mobile">
              <Input />
            </Form.Item>
          </>
        ) : (
          <></>
        )}
        {state !== 2 ? (
          <>
            <Form.Item label="推送标题" name="mobile">
              <Input />
            </Form.Item>
          </>
        ) : (
          <></>
        )}
        <Form.Item label="推送内容" name="content">
          <TextArea rows={4} />
        </Form.Item>
        {state === 2 ? (
          <div>
            发送条数&nbsp;&nbsp;&nbsp;&nbsp;发送条数：
            <span>200</span>
            条&nbsp;&nbsp;&nbsp;&nbsp;可用短信条数：
            <span>10000</span>条
          </div>
        ) : (
          <></>
        )}
      </Form>
    </Modal>
  )
}

export default AEMessageDialog
