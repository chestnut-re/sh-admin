import { Tree } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import React from 'react'
/**
 * 人员管理-组织结构列表
 */
interface Props {
  structure: Array<any>
  onSelectStructure: (e: any) => void
}
const StructureTree: React.FC<Props> = ({ structure, onSelectStructure }) => {
  const onSelect = (selectedKeys) => {
    onSelectStructure(selectedKeys[selectedKeys.length - 1])
  }
  return (
    <Tree
      // showLine={false}
      fieldNames={{ title: 'name', key: 'id', children: 'children' }}
      switcherIcon={<CaretDownOutlined />}
      onSelect={onSelect}
      treeData={structure}
      defaultExpandAll={true}
    />
  )
}
export default StructureTree
