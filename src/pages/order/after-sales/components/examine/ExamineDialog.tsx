import { getRolesAll } from '@/service/role'
import { Form, Input, Modal, Select, Radio, Space, Button, Result } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { HttpCode } from '@/constants/HttpCode'
import { AdminService } from '@/service/AdminService'
import { getRoles } from '@/service/role'
import { CheckOutlined } from '@ant-design/icons'

interface Props {
  data: any
  show: boolean
  /**内容修改成功回调，页面需要刷新数据 */
  onSuccess: () => void
  onClose: () => void
}
const { TextArea } = Input

/**
 * 添加&编辑
 */
const ExamineDialog: FC<Props> = ({ data, show = false, onSuccess, onClose }) => {
  const [form] = Form.useForm()
  const [roleList, setRoleList] = useState([])
  const [state, setState] = React.useState(1)
  const [roleId, setRoleId] = React.useState('')
  const [checked, setChecked] = useState(false)
  const [checked1, setChecked1] = useState(false)

  useEffect(() => {
    // form.setFieldsValue({
    //   roleName: data?.roleName,
    //   nickName: data?.nickName,
    //   mobile: data?.mobile,
    // })
  }, [show])

  /**提交数据 */
  const _handleUpdate = async () => {
    // form
    //   .validateFields()
    //   .then((formData) => {
    //     1
    //   })
    //   .catch((e) => {
    //     console.error(e)
    //   })
    return (
      <Result
        status="success"
        title="Successfully Purchased Cloud Server ECS!"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
          <Button type="primary" key="console">
            Go Console
          </Button>,
          <Button key="buy">Buy Again</Button>,
        ]}
      />
    )
  }

  const _formClose = () => {
    form.resetFields()
    onClose()
  }

  return (
    <Modal
      title="订单退款审核"
      visible={show}
      onOk={_handleUpdate}
      onCancel={_formClose}
      cancelText="取消"
      okText="确定提交"
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
        <Form.Item label="审核结果" name="roleName">
          <Space>
            <Button
              onClick={() => {
                setChecked(true)
                setChecked1(false)
              }}
              icon={checked ? <CheckOutlined /> : null}
              value={1}
            >
              通过
            </Button>
            <Button
              onClick={() => {
                setChecked1(true)
                setChecked(false)
              }}
              icon={checked1 ? <CheckOutlined /> : null}
              value={2}
            >
              驳回
            </Button>
          </Space>
        </Form.Item>
        {checked ? (
          <>
            <div style={{ margin: '0 0 20px 80px' }}>同意退款后，将撤销该笔订单关联的各角色分佣、福利返利</div>
            <Form.Item label="审核备注" name="beizhu">
              <TextArea rows={4} />
            </Form.Item>
          </>
        ) : (
          <Form.Item label="驳回原因" name="beizhu">
            <TextArea rows={4} />
          </Form.Item>
        )}
      </Form>
    </Modal>
  )
}

export default ExamineDialog