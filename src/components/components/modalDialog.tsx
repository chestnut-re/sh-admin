/*
 * @Description:查看
 * @LastEditTime: 2022-01-10 15:10:48
 */
import React, { useState, FC, useEffect } from 'react'
import { Drawer, Button, Descriptions, Table, Row, Col, Modal } from 'antd'
interface Props {
  show: boolean
  data: any
  title?: string
  onChange: () => void
}
const DEModalDialog: FC<Props> = ({ show, data, title, onChange }) => {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    setVisible(show)
  }, [show])

  const onClickClose = () => {
    onChange()
    setVisible(false)
  }

  return (
    <>
      <Modal
        title={title}
        visible={visible}
        onCancel={onClickClose}
        footer={[
          <Button key="submit" type="primary" onClick={onClickClose}>
            确定
          </Button>,
        ]}
      >
        {data()}
      </Modal>
    </>
  )
}
export default DEModalDialog
