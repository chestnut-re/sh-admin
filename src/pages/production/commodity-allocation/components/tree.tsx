import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Tree, Modal, Input, Select, Col, Row, message } from 'antd'
import { AllocationService } from '@/service/AllocationService'
import { HttpCode } from '@/constants/HttpCode'
// const treeData = [
//   {
//     value: '1',
//     key: '1',
//     parentKey: '1',
//     children: [
//       {
//         value: '1-1',
//         key: '1-1',
//       },
//       {
//         value: '1-2',
//         key: '1-2',
//       },
//     ],
//   },
//   {
//     value: '2',
//     key: '2',
//     parentKey: '2',
//     children: [
//       {
//         value: '2-1',
//         key: '2-1',
//       },
//       {
//         value: '2-2',
//         key: '2-2',
//       },
//     ],
//   },
// ]

const expandedKeyArr = ['0']
const TreePage: React.FC = ({ cRef }) => {
  const { Option } = Select
  const [treeData, setTreeData] = useState([])
  const [data, setData] = useState(treeData)
  const [expandedKeys, setExpandedKeys] = useState(expandedKeyArr)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalVisible1, setIsModalVisible1] = useState(false)
  const [class1, setClass1] = useState('')
  const [changeData, setChangeData] = useState([])
  const [parentList, setParentList] = useState([])
  const [type, setType] = useState('')

  const { TreeNode } = Tree

  useEffect(() => {
    getList()
  }, [])

  useImperativeHandle(cRef, () => ({
    //aa即为子组件暴露给父组件的方法
    getTreeList: () => {
      return getList()
    },
    data,
  }))

  const getList = () => {
    AllocationService.list({ sortName: '' }).then((res) => {
      setData(res.data)
    })
  }

  const showModal = (item) => {
    setIsModalVisible(true)
    setClass1(item.sortName)
    setChangeData(item)
  }

  //编辑
  const handleOk = () => {
    setIsModalVisible(false)
    AllocationService.edit([
      { id: changeData.id, operationType: 2, parentId: changeData.parentId, sortName: class1 },
    ]).then((res) => {
      if (res.code === HttpCode.success) {
        setIsModalVisible1(false)
        getList()
      }
    })
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  //删除
  const handleOk1 = () => {
    AllocationService.edit([
      { id: changeData.id, operationType: 3, parentId: changeData.parentId, sortName: changeData.sortName },
    ]).then((res) => {
      if (res.code === HttpCode.success) {
        message.success('删除成功')
        setIsModalVisible1(false)
        getList()
      }
    })
  }

  const handleCancel1 = () => {
    setIsModalVisible1(false)
  }

  const onExpand = (expandedKeys) => {
    //记录折叠的key值
    setExpandedKeys(expandedKeys)
  }
  const renderTreeNodes = (data) => {
    const nodeArr = data?.map((item) => {
      //删除
      item.title = (
        <div>
          <span>{item.sortName}</span>
          <span>
            <span style={{ marginLeft: 100 }} onClick={() => showModal(item)}>
              编辑
            </span>
            <span style={{ marginLeft: 10 }} onClick={() => onDelete(item)}>
              删除
            </span>
          </span>
        </div>
      )
      // }

      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.id} dataRef={item}>
            {renderTreeNodes(item.children)}
          </TreeNode>
        )
      }

      return <TreeNode title={item.title} key={item.id} />
    })

    return nodeArr
  }

  const onEdit = (key) => {
    editNode(key, data)
    setData(data.slice())
  }

  const editNode = (key, data) =>
    data.forEach((item) => {
      if (item.children) {
        editNode(key, item.children)
      }
    })

  const onDelete = (item) => {
    setIsModalVisible1(true)
    setChangeData(item)
  }

  const deleteNode = (key, data) =>
    data.forEach((item, index) => {
      if (item.key === key) {
        data.splice(index, 1)
        return
      } else {
        if (item.children) {
          deleteNode(key, item.children)
        }
      }
    })

  return (
    <div>
      <Tree expandedKeys={expandedKeys} onExpand={onExpand}>
        {renderTreeNodes(data)}
      </Tree>
      <Modal
        title="产品分类名称"
        visible={isModalVisible}
        okText="确定"
        cancelText="取消"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <Row gutter={[0, 8]} style={{ marginBottom: 10 }}>
            <Col span={8} className="table-from-label">
              <span>分类名称&nbsp;&nbsp;</span>
            </Col>
            <Col span={16}>
              <Input
                style={{ width: 200 }}
                value={class1}
                onChange={(e) => {
                  setClass1(e.target.value)
                }}
              />
            </Col>
          </Row>
          <Row gutter={[0, 8]}>
            <Col span={8} className="table-from-label">
              <span>选择上级分类&nbsp;&nbsp;</span>
            </Col>
            <Col span={16}>
              <Select placeholder="请选择" style={{ width: 120 }} onChange={(value: any) => setType(value)}>
                {data?.map((item) => {
                  return (
                    <Option value={item.sortName} key={item.id}>
                      {item.sortName}
                    </Option>
                  )
                })}
              </Select>
            </Col>
          </Row>
        </div>
      </Modal>
      <Modal
        title="提示"
        visible={isModalVisible1}
        okText="确认删除"
        cancelText="取消"
        onOk={handleOk1}
        onCancel={handleCancel1}
      >
        <span>是否确认删除?</span>
      </Modal>
    </div>
  )
}
export default TreePage
