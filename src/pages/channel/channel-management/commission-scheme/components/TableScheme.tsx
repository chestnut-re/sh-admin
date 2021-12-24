/*
 * @Description:功能权限
 * @LastEditTime: 2021-12-24 10:44:11
 */
import { Table, Switch, Space } from 'antd'
import React, { useState, useEffect } from 'react'
import { getMenus } from '@/service/menu'

const TableScheme: React.FC = () => {
  const [checkStrictly, setCheckStrictly] = useState(false)
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    init()
  }, [])
  const init = async () => {
    const res = await getMenus()
    setMenu(res.data?.menus)
    console.log(JSON.stringify(res))
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
      title: 'type',
      dataIndex: 'type',
      width: '30%',
      key: 'type',
    },
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
  }
  return (
    <>
      <Space align="center" style={{ marginBottom: 16 }}>
        是否开启: <Switch checked={checkStrictly} onChange={setCheckStrictly} />
      </Space>
      <Table columns={columns}  key="id"  rowSelection={{ ...rowSelection, checkStrictly,selections:{key:'id'} }} pagination={false} dataSource={menu} />
    </>
  )
}

export default TableScheme
