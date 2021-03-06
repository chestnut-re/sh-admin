/*
 * @Description:查看
 * @LastEditTime: 2022-01-17 16:04:06
 */
import React, { useState, FC, useEffect } from 'react'
import { Drawer, Button, Descriptions, Table, Row, Col } from 'antd'
import { marketService } from '@/service/marketService'
import { formateTime } from '@/utils/timeUtils'
import './index.less'
interface props {
  data: any
}
const BasicInfo: FC<props> = ({ data }) => {
  const [dataSource, setDataSource] = useState([])
  const [List, setList] = useState([])

  useEffect(() => {
    if (!!data) {
      console.log(JSON.parse(data), 'JSON.parse(data)JSON.parse(data)JSON.parse(data)')
      let list = []
      marketService.get(JSON.parse(data)?.rebateId).then((res) => {
        setDataSource(res?.data)
        let type = {
          1: '新用户注册',
          2: '订单核销',
          3: '行程结束',
        }
        if (res?.data.isShareRebate == 1) {
          list.push({
            name: `分享返利`,
            target: `累计分享${res?.data?.shareTotal}次，间隔${res?.data?.shareTime}小时`,
            condition: `${res?.data?.isShareSuccess == 1 ? '分享成功' : ''}
  ${res?.data?.isSharePoint == '1' ? `触达独立IP${res?.data?.sharePointIp}个` : ''}`,
            rebateAmount: `每次均分`,
            id: 1,
          })
        }
        if (res?.data.isPullRebate == 1) {
          list.push({
            name: '行动转换',
            target: `${res?.data.pullTotal}个`,
            condition: type[res?.data.pullType],
            rebateAmount: `每次均分`,
            id: 2,
          })
        }
        setList(list)
      })
    }
    // console.log(data, '-')
  }, [data])
  const columns = [
    {
      title: '返利任务方式',
      dataIndex: 'name',
      className: 'table-light-color',
    },
    {
      title: '任务目标',
      dataIndex: 'target',
      className: 'table-light-color',
    },
    {
      title: '完成条件',
      dataIndex: 'condition',
      className: 'table-light-color',
    },
    {
      title: '返利金额',
      dataIndex: 'rebateAmount',
      className: 'table-light-color',
    },
  ]

  return (
    <div className="BasicInfo__root">
      <Row>
        <Col span={17} className="basic-l">
          <Descriptions>
            <Descriptions.Item span={24} label="活动名称">
              {dataSource?.name}
            </Descriptions.Item>
            <Descriptions.Item span={24} label="活动时间">
              {formateTime(dataSource?.beginTime)} - {formateTime(dataSource?.endTime)}
            </Descriptions.Item>
            <Descriptions.Item span={24} label="返利比例">
              {dataSource?.scale}
            </Descriptions.Item>
            <Descriptions.Item span={24} label="分享文案">
              {dataSource?.description}
            </Descriptions.Item>
            <Descriptions.Item span={24} label="返利配置">
              <Table bordered rowKey="id" dataSource={List} columns={columns} pagination={false} />
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={7} className="basic-r">
          <Descriptions>
            <Descriptions.Item span={24} label="创建渠道">
              {dataSource?.createChannelName}
            </Descriptions.Item>
            <Descriptions.Item span={24} label="创建人">
              {dataSource?.createUserName}
            </Descriptions.Item>
            <Descriptions.Item span={24} label="创建时间">
              {dataSource?.createTime}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </div>
  )
}
export default BasicInfo
