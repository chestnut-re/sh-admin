/*
 * @Description:
 * @LastEditTime: 2021-12-23 11:30:01
 */
import { Tree } from 'antd'
import React, { useEffect, useState } from 'react'
interface Props {
  structure: Array<any>
  onSelectStructure: () => void
}

const ChannelListTree: React.FC<Props> = ({ structure, onSelectStructure }) => {
  useEffect(() => {
    console.log(structure, 'xxxzzzzzzzz')
  })

  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info)
    onSelectStructure()
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
