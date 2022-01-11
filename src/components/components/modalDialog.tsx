/*
 * @Description:查看
 * @LastEditTime: 2022-01-11 16:33:30
 */
import React, { useState, FC, useEffect } from 'react'
import { Drawer, Button, Descriptions, Table, Row, Col, Modal } from 'antd'
interface Props {
  show: boolean
  data: any
  title?: string
  width?: string | number
  onChange: () => void
}
const DEModalDialog: FC<Props> = ({ show, data, title,width, onChange }) => {
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
        width={width}
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
