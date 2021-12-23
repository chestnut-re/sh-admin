/*
 * @Description: 渠道权限
 * @LastEditTime: 2021-12-23 11:22:14
 */
import React, { useState, useEffect } from 'react'
import { Menu, Col, Row, Checkbox, Radio, Input, Tooltip } from 'antd'

import { InfoCircleOutlined } from '@ant-design/icons'

import ChannelTree from '../components/ChannelListTree'
import './index.less'

const ChannelListPage: React.FC = () => {
  const [radioValue, setValue] = useState('')
  const [current, setCurrent] = useState('one')
  const handleClick = (e) => {
    console.log(e, '-----')
    setCurrent(e.key)
  }
  const onChange = (e) => {
    console.log(e, '---')
  }
  const onChangeRadio = (e) => {
    setValue(e.target.value)
  }

  return (
    <div className="channel-list">
      <Row gutter={[10, 0]}>
        <Col span={3}>
          <ChannelTree />
        </Col>
        <Col span={21}>
          <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="one">功能权限</Menu.Item>
            <Menu.Item key="two">佣金权限</Menu.Item>
          </Menu>
          {/* <ChannelTree /> */}
          <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
            <Row>
              <Col span={1}>佣金权限</Col>
              <Col span={2}>
                <Checkbox value="A">销售分佣</Checkbox>
              </Col>
              <Col span={2}>
                <Checkbox value="B">直销分佣</Checkbox>
              </Col>
              <Col span={2}>
                <Checkbox value="C">发团服务费</Checkbox>
              </Col>
              <Col span={4}>
                <Checkbox value="D">
                  {/* 预设团建奖金
                  <Input suffix="%" /> */}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    预设团建奖金&nbsp; &nbsp;
                    <Input suffix="%" style={{ width: '100px' }} />
                  </div>
                </Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
          <Row>
            <Col span={1}>结算要求</Col>
            <Col span={23}>
              <Radio.Group onChange={onChangeRadio} value={radioValue}>
                <Radio value={2}>下单</Radio>
                <Radio value={3}>核销</Radio>
                <Radio value={4}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    行程结束 &nbsp; &nbsp;且需满&nbsp; &nbsp;
                    <Input suffix="天" style={{ width: '100px' }} />
                  </div>
                </Radio>
              </Radio.Group>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default ChannelListPage
