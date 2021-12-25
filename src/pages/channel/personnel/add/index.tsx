/*
 * @Description: 添加人员
 * @LastEditTime: 2021-12-24 10:52:27
 */
import React from 'react'
import { Button, Modal, Space } from 'antd'
import './index.less'
import FromData from '../component/FromData'
export type DialogMode = 'add' | 'edit'
interface Props {
  data: any
  mode: DialogMode
  structure: Array<any>
  show: boolean
  onSuccess: () => void
  onClose: () => void
}
const CreatePerson: React.FC<Props> = ({ data, mode, structure, show = false, onSuccess, onClose }) => {
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
        <FromData
          data={undefined}
          mode={'add'}
          structure={[]}
          show={false}
          onSuccess={function (): void {
            throw new Error('Function not implemented.')
          }}
          onClose={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </Modal>
    </div>
  )
}
export default CreatePerson
