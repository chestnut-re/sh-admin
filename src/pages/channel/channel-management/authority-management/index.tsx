/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Description: 渠道权限
 * @LastEditTime: 2021-12-28 16:39:11
 */
import React, { useState, useEffect } from 'react'
import { Menu, Col, Row, Checkbox, Radio, Input, Tooltip } from 'antd'
import { cityDispose, getMaxFloor, getTwoTier, findIcChild } from '@/utils/tree'
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
  const [staticStructure, setStaticStructure] = useState([])
  const [channelDetail, setChannelDetail] = useState('')
  useEffect(() => {
    getStructure()
  }, [current])

  useEffect(() => {
    getDetail()
    console.log(channelId, '---')
  }, [channelId])

  const getStructure = () => {
    ChannelService.getStructure().then((res) => {
      const data = JSON.parse(JSON.stringify(cityDispose([res?.data], 'children')))
      const twoData = JSON.parse(JSON.stringify(getTwoTier([res?.data], 'children')))
      setStaticStructure(data)
      if (current == 'one') {
        const id = JSON.parse(JSON.stringify(data[0]))?.id
        setStructure(data)
        setChannelId(id)
        getDetail()
      } else {
        const id = JSON.parse(JSON.stringify(twoData[0]))?.id
        setStructure(twoData)
        setChannelId(id)
        getDetail()
      }
    })
  }
  const getDetail = () => {
    if (!!channelId) {
      ChannelService.get(channelId).then((res) => {
        setChannelDetail(JSON.stringify(res?.data))
        if (current == 'two') {
          // 佣金权限 找到对应渠道的最深数据
          setRanked(getMaxFloor(findIcChild(staticStructure, res?.data.id)))
        }
      })
    }
  }
  const _onSelectStructure = (id) => {
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
          {structure.length > 0 ? (
            <ChannelListTree
              structure={structure}
              defaultSelectedKeys={structure[0]?.id}
              onSelectStructure={_onSelectStructure}
            />
          ) : (
            ''
          )}
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
            
                <CommissionAuthority
                  channelDetail={channelDetail}
                  chanId={channelId}
                  ranked={ranked}
                  structure={structure}
                />

            </>
          )}
          {/* <TableScheme /> */}
        </Col>
      </Row>
    </div>
  )
}

export default AuthorityManagement
