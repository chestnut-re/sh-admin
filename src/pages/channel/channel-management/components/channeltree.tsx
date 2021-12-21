/*
 * @Description:
 * @LastEditTime: 2021-12-21 13:46:36
 */
import { Tree } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'

const ChannelTree: React.FC = () => {
  const [treeData, setData] = useState([
    {
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          children: [
            {
              title: 'leaf',
              key: '0-0-0-0',
            },
            {
              title: 'leaf',
              key: '0-0-0-1',
            },
            {
              title: 'leaf',
              key: '0-0-0-2',
            },
          ],
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
          children: [
            {
              title: 'leaf',
              key: '0-0-1-0',
            },
          ],
        },
        {
          title: 'parent 1-2',
          key: '0-0-2',
          children: [
            {
              title: 'leaf',
              key: '0-0-2-0',
            },
            {
              title: 'leaf',
              key: '0-0-2-1',
            },
          ],
        },
      ],
    },
  ])
  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info)
  }
  return (
    <Tree
      showLine
      defaultExpandedKeys={['0-0-0']}
      switcherIcon={<DownOutlined />}
      onSelect={onSelect}
      treeData={treeData}
    />
  )
}

export default ChannelTree
