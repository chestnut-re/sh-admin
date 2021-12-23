/*
 * @Description: 左侧tree
 * @LastEditTime: 2021-12-23 15:22:18
 */
import { Tree } from 'antd'
import React from 'react'
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
      showLine
      fieldNames={{ title: 'name', key: 'id', children: 'children' }}
      onSelect={onSelect}
      treeData={structure}
    />
  )
}

export default ChannelListTree
