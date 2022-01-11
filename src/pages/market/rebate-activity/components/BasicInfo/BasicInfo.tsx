/*
 * @Description:查看
 * @LastEditTime: 2022-01-11 15:05:06
 */
import React, { useState, FC, useEffect } from 'react'
import { Drawer, Button, Descriptions, Table, Row, Col } from 'antd'
import { marketService } from '@/service/marketService'
import './index.less'
interface props {
  data: any
}
const BasicInfo: FC<props> = ({ data }) => {
  const [dataSource, setDataSource] = useState([])
  const [List, setList] = useState([])

  useEffect(() => {
    if (!!data) {
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
          })
        }
        if (res?.data.isPullRebate == 1) {
          list.push({
            name: '行动转换',
            target: `${res?.data.pullTotal}个`,
            condition: type[res?.data.pullType],
            rebateAmount: `每次均分`,
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
    },
    {
      title: '任务目标',
      dataIndex: 'target',
    },
    {
      title: '完成条件',
      dataIndex: 'condition',
    },
    {
      title: '返利金额',
      dataIndex: 'rebateAmount',
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
              {dataSource?.beginTime}-{dataSource?.endTime}
            </Descriptions.Item>
            <Descriptions.Item span={24} label="返利比例">
              {dataSource?.scale}
            </Descriptions.Item>
            <Descriptions.Item span={24} label="分享文案">
              {dataSource?.shareAmount}
            </Descriptions.Item>
            <Descriptions.Item span={24} label="返利配置">
              <Table bordered dataSource={List} columns={columns} pagination={false} />
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={7} className="basic-r">
          <Descriptions>
            {/* <Descriptions.Item span={24} label="创建渠道"></Descriptions.Item> */}
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
