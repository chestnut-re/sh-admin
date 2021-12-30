/*
 * @Description: 左侧tree
 * @LastEditTime: 2021-12-30 15:20:15
 */
import { Tree } from 'antd'
import React from 'react'
import { CaretDownOutlined } from '@ant-design/icons'
interface Props {
  structure: Array<any>
  onSelectStructure: (e: any) => void
  defaultSelectedKeys?: string
}
const ChannelListTree: React.FC<Props> = ({ structure, onSelectStructure, defaultSelectedKeys }) => {
  const onSelect = (selectedKeys) => {
    onSelectStructure(selectedKeys[selectedKeys.length - 1])
  }
  return (
    <>
      {/* {defaultSelectedKeys} */}
      <Tree
        showLine={{ showLeafIcon: false }}
        defaultExpandAll
        defaultSelectedKeys={[defaultSelectedKeys]}
        switcherIcon={<CaretDownOutlined />}
        fieldNames={{ title: 'name', key: 'id', children: 'children' }}
        onSelect={onSelect}
        treeData={structure}
      />
    </>
  )
}

export default ChannelListTree
