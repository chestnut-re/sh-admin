import { Tree } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import React from 'react'
/**
 * 人员管理-组织结构列表
 */
interface Props {
  structure: Array<any>
  onSelectStructure: () => void
}
const StructureTree: React.FC<Props> = ({ structure, onSelectStructure }) => {
  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info)
    onSelectStructure
  }
  return (
    <Tree
      showLine={false}
      fieldNames={{ title: 'name', key: 'id', children: 'children' }}
      switcherIcon={<CaretDownOutlined />}
      onSelect={onSelect}
      treeData={structure}
    />
  )
}
export default StructureTree
