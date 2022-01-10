/*
 * @Description: 活动审核查看
 * @LastEditTime: 2022-01-10 13:38:58
 */
import { Table, Space, Button, Modal, Form, Row, Col } from 'antd'
import BasicInfo from '../../../rebate-activity/components/BasicInfo/BasicInfo'
import AssociatedGoods from '../AssociatedGoods'
import AuditProcessing from '../AuditProcessing'
import LinkedList from '../LinkedList'
import React, { useEffect, useState } from 'react'
import './index.less'
interface Props {}
const ShowReviewActivity: React.FC<Props> = ({}) => {
  const [form] = Form.useForm()
  useEffect(() => {
    console.log('---')
  }, [])

  return (
    <div className="ShowReviewActivity__root">
      <div className="header-title">1.基本信息</div>
      <BasicInfo></BasicInfo>
      <div className="header-title">2.关联商品信息</div>
      <AssociatedGoods></AssociatedGoods>
      <div className="header-title">3.关联清单信息</div>
      <LinkedList></LinkedList>
      <div className="header-title">4.上线审核处理</div>
      <AuditProcessing></AuditProcessing>
    </div>
  )
}

export default ShowReviewActivity
