/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Description:功能权限
 * @LastEditTime: 2022-01-12 13:58:11
 */
import { Table, Switch, Space, message, Menu } from 'antd'
import React, { useState, useEffect } from 'react'
import { getMenusType } from '@/service/menu'
import { cityDispose } from '@/utils/tree'
import {isInclude} from '@/utils/newTree'
import ChannelService from '@/service/ChannelService'
import { getRenderPropValue } from 'antd/lib/_util/getRenderPropValue'
interface Props {
  adminType: boolean
  bType: boolean
  roleList: any
  datachannel:any
  getFucValue: (string) => void
  _setBType: (string) => void
  _setAdminType: (string) => void
}

const TableMenu: React.FC<Props> = ({
  adminType,
  bType,
  roleList,
  datachannel,
  getFucValue,
  _setAdminType,
  _setBType,
}) => {
  const [checkStrictly, setCheckStrictly] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [switchFc, setSwitchFunc] = useState('admin')
const [tobeActList,setTobeActList] = useState([])
const [adminActList,setAdminActList] = useState([])
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    init()
 
    // setSelectedRowKeys([])
  }, [switchFc,datachannel])

  const init = async () => {
    const res = await getMenusType({
      platformType: switchFc == 'admin' ? 0 : 1,
      channelId:datachannel?.channelId
    })
    const menuList = cityDispose(res?.data, 'children')
    setMenu(menuList)
    let adminActList = []
    let tobeActList = []
    roleList.forEach(element => {
      console.log(isInclude(menuList,element),'isInclude(menuList,element)')
      if(isInclude(menuList,element)){
        if(switchFc=='admin'){
          adminActList.push(element)
        }else{
          tobeActList.push(element)
        }
      }else{
        if(switchFc!='admin'){
          adminActList.push(element)
        }else{
          tobeActList.push(element)
        }
      }
    });
    setAdminActList(adminActList)
    setTobeActList(tobeActList)
    console.log(tobeActList,'tobeActList')
    console.log(adminActList,'adminActList')
    
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
    onChange: (selectedRowKeys, selectedRows,e) => {      
      if(switchFc =='admin'){
        getFucValue(tobeActList.concat(Array.from(selectedRowKeys)))
        setSelectedRowKeys(tobeActList.concat(Array.from(selectedRowKeys)))
      }else{roleList
        getFucValue(adminActList.concat(Array.from(selectedRowKeys)))
        setSelectedRowKeys(adminActList.concat(Array.from(selectedRowKeys)))
      }
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    },
    // onSelect: (record, selected, selectedRows) => {
    //   // console.log(record, selected, selectedRows)
    // },
    // onSelectAll: (selected, selectedRows, changeRows) => {
    //   // console.log(selected, selectedRows, changeRows)
    // },
    selectedRowKeys: roleList,
  }
  const save = () => {
    console.log('---')
  }
  const setBType = (e) => {
    _setBType(e)
    console.log(e)
  }
  const setAdminType = (e) => {
    _setAdminType(e)
    console.log(e)
  }
  return (
    <>
  
      <Menu onClick={(e) => setSwitchFunc(e.key)} className="mb20" selectedKeys={[switchFc]} mode="horizontal">
        <Menu.Item key="admin">管理后台权限</Menu.Item>
        <Menu.Item key="toB">B端权限</Menu.Item>
      </Menu>
      <div style={{marginTop:'20px'}}></div>
      {/* {switchFc == 'admin' ? (
        <Space align="center" style={{ marginBottom: 16 }}>
          是否开启: <Switch className="Ad" checked={!!bType} onChange={setBType} />
        </Space>
      ) : (
        <Space align="center" style={{ marginBottom: 16 }}>
          是否开启: <Switch className="Bc" checked={!!adminType} onChange={setAdminType} />
        </Space>
      )} */}

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

export default TableMenu
