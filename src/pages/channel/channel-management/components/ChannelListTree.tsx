/*
 * @Description: 左侧tree
 * @LastEditTime: 2021-12-27 17:48:43
 */
import { Tree } from 'antd'
import React from 'react'
import { CaretDownOutlined } from '@ant-design/icons'
interface Props {
  structure: Array<any>
  onSelectStructure: (e: any) => void
}
const ChannelListTree: React.FC<Props> = ({ structure, onSelectStructure }) => {
  const onSelect = (selectedKeys) => {
    onSelectStructure(selectedKeys[selectedKeys.length - 1])
  }
  return (
    <Tree
      showLine={{showLeafIcon:false}}
      defaultExpandAll
      switcherIcon={<CaretDownOutlined />}
      fieldNames={{ title: 'name', key: 'id', children: 'children' }}
      onSelect={onSelect}
      treeData={structure}
    />
  )
}

export default ChannelListTree
