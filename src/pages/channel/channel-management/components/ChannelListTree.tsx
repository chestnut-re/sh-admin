/*
 * @Description: 左侧tree
<<<<<<< HEAD
 * @LastEditTime: 2021-12-23 17:25:41
 */
import { Tree } from 'antd'
import React from 'react'
import {
  DownOutlined
} from '@ant-design/icons';
=======
 * @LastEditTime: 2021-12-23 15:54:53
 */
import { Tree } from 'antd'
import React from 'react'

>>>>>>> f387a9e87dd3c258f7a1bb61587874396fbef687
interface Props {
  structure: Array<any>
  onSelectStructure: (e: any) => void
}
const ChannelListTree: React.FC<Props> = ({ structure, onSelectStructure }) => {
  const onSelect = (selectedKeys) => {
    onSelectStructure(selectedKeys[selectedKeys.length - 1])
  }
  return (
<<<<<<< HEAD
    <div style={{ height: '100%', background: '#FFFFFF' }}>
      <Tree
        showLine
        defaultExpandAll={true}
        fieldNames={{ title: 'name', key: 'id', children: 'children' }}
        onSelect={onSelect}
        treeData={structure}
      />
    </div>
=======
    <Tree
      showLine
      defaultExpandAll
      fieldNames={{ title: 'name', key: 'id', children: 'children' }}
      onSelect={onSelect}
      treeData={structure}
    />
>>>>>>> f387a9e87dd3c258f7a1bb61587874396fbef687
  )
}

export default ChannelListTree
