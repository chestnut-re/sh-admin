/*
 * @Description:功能权限
 * @LastEditTime: 2021-12-24 14:45:11
 */
import { Table, Switch, Space, message } from 'antd'
import React, { useState, useEffect } from 'react'
import { getMenus } from '@/service/menu'

import ChannelService from '@/service/ChannelService'
interface Props {
  channelId: any
}

const TableScheme: React.FC<Props> = ({ channelId }) => {
  const [checkStrictly, setCheckStrictly] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState('')
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    init()
  }, [])
  const init = async () => {
    const res = await getMenus()
    setMenu(res.data?.menus)
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
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    },

    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows)
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows)
    },
    // 1,11,111,112,113,114
    defaultSelectedRowKeys: [],
  }
  const save = () => {
    console.log(!channelId, 'channelId')
    if (!channelId) {
      message.error('请选择渠道!')
    } else {
      const query = {
        menuAuthority: [selectedRowKeys],
        id: channelId,
      }
      ChannelService.edit(query).then((res) => {
        console.log(res, '----')
      })
    }
  }
  return (
    <>
      <Space align="center" style={{ marginBottom: 16 }}>
        是否开启: <Switch checked={checkStrictly} onChange={setCheckStrictly} />
        <button onClick={save}>保存</button>
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