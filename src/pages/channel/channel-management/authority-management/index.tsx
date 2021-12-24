/*
 * @Description: 渠道权限
 * @LastEditTime: 2021-12-24 14:45:48
 */
import React, { useState, useEffect } from 'react'
import { Menu, Col, Row, Checkbox, Radio, Input, Tooltip } from 'antd'
import { cityDispose } from '@/utils/tree'
import ChannelService from '@/service/ChannelService'
import ChannelListTree from '../components/ChannelListTree'
import TableScheme from '../commission-scheme/components/TableScheme'
import CommissionAuthority from '../commission-scheme/components/CommissionAuthority'
import './index.less'

const AuthorityManagement: React.FC = () => {
  const [radioValue, setValue] = useState('')
  const [current, setCurrent] = useState('one')
  const [switchFunc, setSwitchFunc] = useState('one')

  const [channelId, setChannelId] = useState(null)
  const [structure, setStructure] = useState([])
  useEffect(() => {
    getStructure()
  }, [])
  const getStructure = () => {
    ChannelService.getStructure().then((res) => {
      setStructure(cityDispose([res?.data], 'children'))
    })
  }
  const _onSelectStructure = (id) => {
    console.log(id,'ccc')
    setChannelId(id)
  }

  return (
    <div className="commission-scheme__root">
      <Row className="mb20">
        <Col span={24}>
          <Menu onClick={(e) => setCurrent(e.key)} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="one">功能权限</Menu.Item>
            <Menu.Item key="two">佣金权限</Menu.Item>
          </Menu>
        </Col>
      </Row>

      <Row gutter={[10, 0]}>
        <Col span={3}>
          {structure.length > 0 ? <ChannelListTree structure={structure} onSelectStructure={_onSelectStructure} /> : ''}
        </Col>
        <Col span={21}>
          {current == 'one' ? (
            <>
              <Menu
                onClick={(e) => setSwitchFunc(e.key)}
                className="mb20"
                selectedKeys={[switchFunc]}
                mode="horizontal"
              >
                <Menu.Item key="one">管理后台权限</Menu.Item>
                <Menu.Item key="two">B端权限</Menu.Item>
              </Menu>
              <TableScheme chanId={channelId} />
            </>
          ) : (
            <>
              <CommissionAuthority chanId={channelId} />
            </>
          )}
          {/* <TableScheme /> */}
        </Col>
      </Row>
    </div>
  )
}

export default AuthorityManagement
