import React, { useState, useEffect, useRef } from 'react'
import { Button, Tree, Modal, Input, Row, Col, Select } from 'antd'
import './index.less'
import { AllocationService } from '@/service/AllocationService'
import TreePage from './tree'
import { HttpCode } from '@/constants/HttpCode'

/**
 * 分类管理
 */
const ClassManagement: React.FC = () => {
  const _ref = useRef()
  const { Option } = Select
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [addClassName, setAddClassName] = useState('')
  const [parentList, setParentList] = useState([])
  const [parent, setParent] = useState('0')

  const handleOk = () => {
    AllocationService.edit([{ operationType: 1, sortName: addClassName, parentId: parent }]).then((res) => {
      if (res.code === HttpCode.success) {
        setIsModalVisible(false)
        _ref.current?.getTreeList()
      }
    })
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const getParentList = () => {
    AllocationService.list({ sortName: '', parentId: 0 }).then((res: any) => {
      const parentData = { id: 0, sortName: '无' }
      setParentList([...res.data, parentData])
    })
  }

  const _addClass = () => {
    setIsModalVisible(true)
    getParentList()
  }
  return (
    <div className="class__root">
      <div className="class-btn">
        <Button onClick={_addClass}>添加商品分类</Button>
      </div>
      <div className="class-list">
        <div className="list-title">
          <span>产品分类名称</span>
          <span>操作</span>
        </div>
        <div className="list-tree">
          <TreePage cRef={_ref} />
        </div>
      </div>
      <div className="class-bottom">
        <Button type="primary">保存</Button>
        <Button>取消</Button>
      </div>
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
                value={addClassName}
                onChange={(e) => {
                  setAddClassName(e.target.value)
                }}
              />
            </Col>
          </Row>
          <Row gutter={[0, 8]}>
            <Col span={8} className="table-from-label">
              <span>选择上级分类&nbsp;&nbsp;</span>
            </Col>
            <Col span={16}>
              <Select placeholder="请选择" style={{ width: 120 }} onChange={(value: any) => setParent(value)}>
                {parentList?.map((item) => {
                  return (
                    <>
                      <Option value={item.id} key={item.id}>
                        {item.sortName}
                      </Option>
                    </>
                  )
                })}
              </Select>
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  )
}
export default ClassManagement
