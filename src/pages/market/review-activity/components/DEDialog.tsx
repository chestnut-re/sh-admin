/*
 * @Description:查看
 * @LastEditTime: 2022-01-05 18:12:53
 */
import React, { useState, FC, useEffect } from 'react'
import { Drawer, Button, Descriptions, Table, Row, Col } from 'antd'
import RebateBasicInfo from '../../components/RebateBasicInfo'
interface Props {
  show: boolean
  onClose: () => void
}
const DEDialog: FC<Props> = ({ show, onClose }) => {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    setVisible(show)
  }, [show])

  const onClickClose = () => {
    onClose()
  }



  return (
    <>
      <Drawer title="活动详情" width={1000} placement="right" onClose={onClickClose} visible={visible}>
      <RebateBasicInfo></RebateBasicInfo>
      </Drawer>
    </>
  )
}
export default DEDialog
