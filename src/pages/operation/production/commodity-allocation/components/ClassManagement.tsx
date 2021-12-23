import React, { useState, useEffect } from 'react'
import { Button, Tree } from 'antd'
import './index.less'
/**
 * 分类管理
 */
const ClassManagement: React.FC = () => {
  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info)
  }
  const treeData = [
    {
      title: '跟团游',
      key: '0-0',
      children: [
        { title: '亲自', key: '0-0-0', isLeaf: true },
        { title: '三亚', key: '0-0-1', isLeaf: true },
        { title: '夕阳', key: '0-0-2', isLeaf: true },
      ],
    },
    {
      title: '自由行',
      key: '0-1',
      children: [{ title: '欧美', key: '0-1-0', isLeaf: true }],
    },
  ]
  return (
    <div className="class__root">
      <div className="class-btn">
        <Button>添加商品分类</Button>
      </div>
      <div className="class-list">
        <div className="list-title">
          <span>产品分类名称</span>
          <span>操作</span>
        </div>
        <div className="list-tree">
          <Tree onSelect={onSelect} treeData={treeData} />
        </div>
      </div>
      <div className="class-bottom">
        <Button type="primary">保存</Button>
        <Button>取消</Button>
      </div>
    </div>
  )
}
export default ClassManagement
