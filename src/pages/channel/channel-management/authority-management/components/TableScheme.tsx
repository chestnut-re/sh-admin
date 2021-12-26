/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Description:功能权限
 * @LastEditTime: 2021-12-26 17:15:12
 */
import { Table, Switch, Space, message, Button } from 'antd'
import React, { useState, useEffect } from 'react'
import { getMenusType } from '@/service/menu'
import {cityDispose} from '@/utils/tree'
import ChannelService from '@/service/ChannelService'
interface Props {
  chanId: any
  switchFc: any
  channelDetail: any
}

const TableScheme: React.FC<Props> = ({ chanId, switchFc, channelDetail }) => {
  const [checkStrictly, setCheckStrictly] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [menu, setMenu] = useState(false)
  const [isOpen, setIdOPen] = useState(false)
  useEffect(() => {
    // init()
    if (channelDetail != '') {
      const newChannelDetail = JSON.parse(channelDetail)
      if (switchFc == 'admin') {
        const data = newChannelDetail?.menuAuthority ?? []
        if (data.length > 0) {
          setSelectedRowKeys(data.map(Number))
        } else {
          setSelectedRowKeys(data)
        }
        setIdOPen(newChannelDetail?.menuIsOpen == 1)
      } else {
        const data = newChannelDetail?.businessAuthority ?? []
        if (data.length > 0) {
          setSelectedRowKeys(data.map(Number))
        } else {
          setSelectedRowKeys(data)
          setIdOPen(newChannelDetail?.businessIsOpen == 1)
        }
      }
    }
  }, [channelDetail])
  useEffect(() => {
    setSelectedRowKeys([])
    init()
  }, [switchFc])

  const init = async () => {
    const res = await getMenusType({
      platformType: switchFc == 'admin' ? 0 : 1,
    })
    setMenu(cityDispose(res?.data,'children'))
  }
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
      width: '12%',
    },
    {
      title: 'path',
      dataIndex: 'path',
      width: '30%',
      key: 'path',
    },
    {},
  ]

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys)
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    },

    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows)
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows)
    },
    // 1,11,111,112,113,114
    selectedRowKeys: selectedRowKeys,
  }
  const save = () => {
    console.log(!chanId, 'chanId')
    console.log(isOpen, 'isOpen')
    if (!chanId) {
      message.error('请选择渠道!')
    } else {
      const query = {
        id: chanId,
      }
      if (switchFc == 'admin') {
        query['menuAuthority'] = selectedRowKeys
        query['menuIsOpen'] = isOpen == true ? 1 : 0
      } else {
        query['businessAuthority'] = selectedRowKeys
        query['businessIsOpen'] = isOpen == true ? 1 : 0
      }

      ChannelService.edit(query).then((res) => {
        console.log(res, '----')
      })
    }
  }
  return (
    <>
      <Space align="center" style={{ marginBottom: 16 }}>
        是否开启: <Switch checked={isOpen} onChange={setIdOPen} />
        <Button type="primary" onClick={save}>
          保存
        </Button>
      </Space>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        rowSelection={{ ...rowSelection, checkStrictly }}
        pagination={false}
        dataSource={menu}
      />
    </>
  )
}

export default TableScheme