/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Description: 渠道权限
 * @LastEditTime: 2021-12-27 15:52:37
 */
import React, { useState, useEffect } from 'react'
import { Menu, Col, Row, Checkbox, Radio, Input, Tooltip } from 'antd'
import { cityDispose, getMaxFloor } from '@/utils/tree'
import ChannelService from '@/service/ChannelService'
import ChannelListTree from '../components/ChannelListTree'
import TableScheme from './components/TableScheme'
import CommissionAuthority from './components/CommissionAuthority'
import './index.less'

const AuthorityManagement: React.FC = () => {
  const [current, setCurrent] = useState('one')
  const [switchFunc, setSwitchFunc] = useState('admin')
  const [ranked, setRanked] = useState([])
  const [channelId, setChannelId] = useState(null)
  const [structure, setStructure] = useState([])
  const [channelDetail, setChannelDetail] = useState('')
  useEffect(() => {
    getStructure()
  }, [])
  useEffect(() => {
    getDetail()
  }, [channelId])

  const getStructure = () => {
    ChannelService.getStructure().then((res) => {
      setStructure(cityDispose([res?.data], 'children'))
      setRanked(getMaxFloor([res?.data]))
    })
  }
  const getDetail = () => {
    if (!!channelId) {
      ChannelService.get(channelId).then((res) => {
        setChannelDetail(JSON.stringify(res?.data))
        // setStructure(cityDispose([res?.data], 'children'))
      })
    }
  }
  const _onSelectStructure = (id) => {
    console.log(id, 'ccc')
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
      <Col xxl={3} xl={5} lg={7} md={8}>
          {structure.length > 0 ? <ChannelListTree structure={structure} onSelectStructure={_onSelectStructure} /> : ''}
        </Col>
    
        <Col xxl={21} xl={19} lg={17} md={16}>
          {current == 'one' ? (
            <>
              <Menu
                onClick={(e) => setSwitchFunc(e.key)}
                className="mb20"
                selectedKeys={[switchFunc]}
                mode="horizontal"
              >
                <Menu.Item key="admin">管理后台权限</Menu.Item>
                <Menu.Item key="toB">B端权限</Menu.Item>
              </Menu>
              <TableScheme channelDetail={channelDetail} chanId={channelId} switchFc={switchFunc} />
            </>
          ) : (
            <>
              {ranked.length == 0 ? (
                ''
              ) : (
                <CommissionAuthority
                  channelDetail={channelDetail}
                  chanId={channelId}
                  ranked={ranked}
                  structure={structure}
                />
              )}
            </>
          )}
          {/* <TableScheme /> */}
        </Col>
      </Row>
    </div>
  )
}

export default AuthorityManagement
