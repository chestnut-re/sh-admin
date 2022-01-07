/*
 * @Description:查看
 * @LastEditTime: 2022-01-07 14:03:31
 */
import React, { useState, FC, useEffect } from 'react'
import { Drawer, Button, Descriptions, Table, Row, Col } from 'antd'
import './index.less'
import { formateTime } from '@/utils/timeUtils'
interface props {
  data: any
  editGo: (data) => void
}
const ShowRefund: FC<props> = ({ data,editGo}) => {
  const editGoClick = () => {
    editGo(data)
  }
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ]

  const columns = [
    {
      title: '返利任务方式',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '任务目标',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '完成条件',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '返利金额',
      dataIndex: 'address',
      key: 'address',
    },
  ]

  return (
    <>
    <div className="ShowRefund__root">
      <Row>
        <Col span={17} className="basic-l">
          <Descriptions>
            <Descriptions.Item span={24} label="活动名称">
              {data?.policyName}
            </Descriptions.Item>
            <Descriptions.Item span={24} label="政策内容">
              <div dangerouslySetInnerHTML={{ __html: data?.policyContent }} />
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={7} className="basic-r">
          <Descriptions>
            {/* <Descriptions.Item span={24} label="创建渠道">
              Zhou Maomao
            </Descriptions.Item> */}
            <Descriptions.Item span={24} label="创建人">
              {data?.createUser}
            </Descriptions.Item>
            <Descriptions.Item span={24} label="创建时间">
              {formateTime(data?.createTime)}
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col> </Col>
      </Row>
    
    </div>

  <div style={{textAlign:'center',marginTop:'40px'}}>
  <Button onClick={editGoClick}>编 辑</Button>
  </div>
      </>
  )
}
export default ShowRefund
