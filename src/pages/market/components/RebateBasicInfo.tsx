/*
 * @Description:查看
 * @LastEditTime: 2022-01-05 18:06:04
 */
import React, { useState, FC, useEffect } from 'react'
import { Drawer, Button, Descriptions, Table, Row, Col } from 'antd'
import './index.less'
const RebateBasicInfo: FC = () => {
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
    <div className="RebateBasicInfo__root" >
      <Row>
        <Col span={17} className="basic-l">
          <Descriptions>
            <Descriptions.Item span={24} label="活动名称">
              Zhou Maomao
            </Descriptions.Item>
            <Descriptions.Item span={24} label="活动时间">
              1810000000
            </Descriptions.Item>
            <Descriptions.Item span={24} label="返利比例">
              Hangzhou, Zhejiang
            </Descriptions.Item>
            <Descriptions.Item span={24} label="分享文案">
              empty
            </Descriptions.Item>
            <Descriptions.Item span={24} label="返利配置">
              <Table bordered dataSource={dataSource} columns={columns} pagination={false} />
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={6} className="basic-r">
          <Descriptions>
            <Descriptions.Item span={24} label="创建渠道">
              Zhou Maomao
            </Descriptions.Item>
            <Descriptions.Item span={24} label="创建人">
              1810000000
            </Descriptions.Item>
            <Descriptions.Item span={24} label="创建时间">
              Hangzhou, Zhejiang
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </div>
  )
}
export default RebateBasicInfo
