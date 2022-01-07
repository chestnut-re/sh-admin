/*
 * @Description:查看
 * @LastEditTime: 2022-01-07 13:51:31
 */
import React, { useState, FC, useEffect } from 'react'
import { Drawer, Button, Descriptions, Table, Row, Col } from 'antd'
interface Props {
  show: boolean
  data: any
  onChange: () => void
}
const DEDialog: FC<Props> = ({ show, data,onChange}) => {
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
      <Drawer width={1000} placement="right" onClose={onClickClose} visible={visible}>
        {data()}
      </Drawer>
    </>
  )
}
export default DEDialog
