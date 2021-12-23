import { Tree } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
/**
 * 人员管理-组织结构列表
 */
const StructureTree: React.FC = () => {
  const [treeData, setData] = useState([
    {
      title: '分中心一',
      key: '0-0',
      children: [
        {
          title: '区域代理',
          key: '0-0-0',
          children: [
            {
              title: '业务员一',
              key: '0-0-0-0',
            },
            {
              title: '业务员二',
              key: '0-0-0-1',
            },
            {
              title: '业务三',
              key: '0-0-0-2',
              children: [
                {
                  title: '客户一',
                  key: '0-0-0-0-0',
                },
                {
                  title: '客户二',
                  key: '0-0-0-0-1',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: '分中心二',
      key: '0-1',
      children: [
        {
          title: '区域代理一',
          key: '0-0-1',
        },
      ],
    },
    {
      title: '分中心三',
      key: '0-2',
      children: [
        {
          title: '区域代理一',
          key: '0-0-2-0',
        },
        {
          title: '区域代理一',
          key: '0-0-2-1',
        },
      ],
    },
  ])
  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info)
  }
  return (
    <Tree
      showLine={false}
      defaultExpandedKeys={['0-0-0']}
      switcherIcon={<CaretDownOutlined />}
      onSelect={onSelect}
      treeData={treeData}
    />
  )
}
export default StructureTree
