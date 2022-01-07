/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Description:查看
 * @LastEditTime: 2022-01-07 16:54:47
 */
import React, { useState, FC, useEffect } from 'react'
import { Drawer, Button, Descriptions, Table, Row, Col } from 'antd'
import { taskService } from '@/service/marketService'
import './index.less'
interface Props {
  dataValue: any
}
const TaskBasicInfo: FC<Props> = ({ dataValue }) => {
  const [data, setData] = useState([])
  const [dataSourceValue,setDataSource] = useState([])
  useEffect(() => {
    if(!!dataValue){
    taskService.get(dataValue?.id).then((res) => {
      setData(res?.data)
      console.log(res?.data?.taskInventoryGood,'res?.data?.taskInventoryGood)')
      setDataSource(res?.data?.taskInventoryGood)
    })
    }
  },[dataValue])

  const columns = [
    {
      title: '序号',
      dataIndex: 'name',
      dataIndex: 'goodsNo',
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
    },
    {
      title: '关联返利活动',
      dataIndex: 'activityName',
    },
  ]

  return (
    <div className="TaskBasicInfo__root">
      <Row>
        <Col span={17} className="basic-l">
          <Descriptions>
            <Descriptions.Item span={24} label="清单名称">
              {data?.name}
            </Descriptions.Item>
            <Descriptions.Item span={24} label="匹配权重">
              {data?.mathFlag==1?'随机匹配':'关联地域'}
            </Descriptions.Item>
            <Descriptions.Item span={24} label="分享商品">
              <Table rowKey="goodsId" bordered dataSource={dataSourceValue} columns={columns} pagination={false} />
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={6} className="basic-r">
          <Descriptions>
            {/* <Descriptions.Item span={24} label="创建渠道"></Descriptions.Item> */}
            <Descriptions.Item span={24} label="创建人">
              {data?.updateUserName}
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
export default TaskBasicInfo
