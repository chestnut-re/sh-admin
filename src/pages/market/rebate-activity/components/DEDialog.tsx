/*
 * @Description:查看
 * @LastEditTime: 2022-01-06 17:12:57
 */
import React, { useState, FC, useEffect } from 'react'
import { Drawer, Button, Descriptions, Table, Row, Col } from 'antd'
import RebateBasicInfo from '../../components/RebateBasicInfo'
interface Props {
  show: boolean
  data: any
}
const DEDialog: FC<Props> = ({ show, data }) => {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (data) {
      setVisible(true)
    }
  }, [show, data])

  const onClickClose = () => {
    setVisible(false)
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
