import React from 'react'
import { Form, Input, Button, Checkbox, Modal, Cascader, Divider, Space } from 'antd'
import './index.less'
import FromData from '../component/FromData'
/**
 * 添加人员
 * @returns
 */
const CreatePerson: React.FC = (menus) => {
  const [visible, setVisible] = React.useState(false)
  const [confirmLoading, setConfirmLoading] = React.useState(false)

  const showModal = () => {
    setVisible(true)
  }

  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setVisible(false)
      setConfirmLoading(false)
    }, 2000)
  }

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setVisible(false)
  }
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        添加人员
      </Button>
      <Modal
        title="添加人员"
        centered={true}
        width={740}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Space>基本信息</Space>
        <FromData />
      </Modal>
    </div>
  )
}
export default CreatePerson
