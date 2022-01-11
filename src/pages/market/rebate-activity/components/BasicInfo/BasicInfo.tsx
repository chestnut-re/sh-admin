/*
 * @Description:查看
 * @LastEditTime: 2022-01-10 10:46:07
 */
import React, { useState, FC, useEffect } from 'react'
import { Drawer, Button, Descriptions, Table, Row, Col } from 'antd'
import './index.less'

const BasicInfo: FC = ({ data }) => {
  const dataSource = [

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
    <div className="BasicInfo__root">
      <Row>
        <Col span={17} className="basic-l">
          <Descriptions>
            <Descriptions.Item span={24} label="活动名称">
              {data?.activityName}
            </Descriptions.Item>
            <Descriptions.Item span={24} label="活动时间">
              {data?.startTime}-{data?.endTime}
            </Descriptions.Item>
            <Descriptions.Item span={24} label="返利比例">
              {data?.scale}
            </Descriptions.Item>
            <Descriptions.Item span={24} label="分享文案">
              {data?.description}
            </Descriptions.Item>
            <Descriptions.Item span={24} label="返利配置">
              <Table bordered dataSource={dataSource} columns={columns} pagination={false} />
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={6} className="basic-r">
          <Descriptions>
            {/* <Descriptions.Item span={24} label="创建渠道"></Descriptions.Item> */}
            <Descriptions.Item span={24} label="创建人">
              {data?.createUser}
            </Descriptions.Item>
            <Descriptions.Item span={24} label="创建时间">
              {data?.createTime}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </div>
  )
}
export default BasicInfo