/*
 * @Description: 任务清单
 * @LastEditTime: 2022-01-26 11:47:21
 */
import React, { useState, useEffect } from 'react'
import { Form, Col, Row, Button, Table, Space, Modal, message, Select } from 'antd'
import './index.less'
import AEBannerDialog, { DialogMode } from './components/AETaskDialog'
import { taskService } from '@/service/marketService'
import { HttpCode } from '@/constants/HttpCode'
import TaskBasicInfo from './components/TaskBasicInfo/TaskBasicInfo'
import ImageColumn from '@/components/tableColumn/ImageColumn'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { PlusOutlined } from '@ant-design/icons'

import { InputTemp } from '@/components/filter/formItem'
import DEDialog from '@/components/components/Dedialog'
const enumState = {
  '': '全部',
  '0': '启用',
  '1': '禁用',
}
const TaskListPage: React.FC = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [total, setTotal] = useState()
  const [showDialog, setShowDialog] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const [dialogMode, setDialogMode] = useState<DialogMode>('add')
  const [deShowDialog, setDeShowDialog] = useState(false)
  useEffect(() => {
    loadData(pageIndex)
  }, [pageIndex])

  const loadData = (pageIndex) => {
    const params = form.getFieldsValue()
    console.log(params, 'params')
    taskService.list({ current: pageIndex, size: pageSize, ...params }).then((res) => {
      setData(res.data.records)
      setTotal(res.data.total)
    })
  }

  const columns = [
    {
      title: '清单ID',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '清单名称',
      dataIndex: 'name',
    },
    {
      title: '关联商品数量',
      dataIndex: 'activityDetailImg',
      render: (text: any, record: any) => `${record.taskInventoryGood.length}`,
    },
    {
      title: '状态',
      dataIndex: 'activityTitle',
      render: (text: any, record: any) => `${record.state == 0 ? '启用' : '禁用'}`,
    },
    {
      title: '匹配权重',
      render: (text, record) => `${record?.mathFlag == 1 ? '随机匹配' : '关联地域'}`,
    },
    {
      title: '操作',
      fixed: 'right',
      render: (text: any, record: any) => (
        <Space size="middle">
          <span
            className="operation"
            onClick={() => {
              setDeShowDialog(!deShowDialog)
              setSelectedData(record)
            }}
          >
            查看
          </span>
          <span className="operation" onClick={() => _editState(record)}>
            {record.state != 0 ? '启用' : '禁用'}
          </span>
          <span className="operation" onClick={() => _delItem(record)}>
            删除
          </span>
        </Space>
      ),
    },
  ]
  const resetTable = () => {
    form.resetFields()
  }
  const _editState = (record) => {
    if (record.state == '0') {
      Modal.confirm({
        title: `是否禁用${record.name}？`,
        content: '一旦禁用该清单将无效，关联活动将无法启用改清单',
        okText: '确认',
        okType: 'primary',
        cancelText: '返回',
        onOk: () => {
          taskService.editState({ id: record.id, state: record.state == 0 ? 1 : 0 }).then((res) => {
            if (res.code === HttpCode.success) {
              loadData(pageIndex)
            }
          })
        },
      })
    } else {
      taskService.editState({ id: record.id, state: record.state == 0 ? 1 : 0 }).then((res) => {
        if (res.code === HttpCode.success) {
          message.success('该清单启用成功')
          loadData(pageIndex)
        }
      })
    }
  }
  /**删除 */
  const _delItem = (record) => {
    Modal.confirm({
      title: '删除内容页？',
      content: '将删除该内容页及其已填写信息内容',
      okText: '确认',
      okType: 'primary',
      cancelText: '返回',
      onOk: () => {
        taskService.del({ id: record.id }).then((res) => {
          if (res.code === HttpCode.success) {
            message.success('删除成功了')
            loadData(pageIndex)
          }
        })
      },
    })
  }
  /**编辑 */
  const _editDialog = (record) => {
    setDialogMode('edit')
    setSelectedData(record)
    // setShowDialog(true)
  }

  const onFinish = () => {
    setPageIndex(1)
    loadData(pageIndex)
  }
  const addModal = () => {
    setDialogMode('add')
    setSelectedData(null)
    setShowDialog(true)
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const _onDialogSuccess = () => {
    setSelectedData(null)
    setShowDialog(false)
    loadData(pageIndex)
  }

  const _onDialogClose = () => {
    setSelectedData(null)
    setShowDialog(false)
  }

  return (
    <div className="">
      <div>
        <Form
          name="basic"
          initialValues={{ keyword: '', state: '' }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Row gutter={[5, 0]} style={{ paddingLeft: '10px', paddingTop: '20px' }}>
            <Col span={4}>
              <InputTemp name="idOrName" placeholder="清单名称" />
            </Col>
            <Col span={2} className="table-from-label">
              状态
            </Col>
            <Col span={4}>
              <Form.Item name="state">
                <Select allowClear>
                  {Object.keys(enumState)
                    .sort()
                    .map((item) => {
                      return (
                        <Select.Option key={item} value={item}>
                          {enumState[item]}
                        </Select.Option>
                      )
                    })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item>
                <Space>
                  <Button htmlType="submit">查询</Button>
                  <Button onClick={resetTable} htmlType="button">
                    重置
                  </Button>
                </Space>
              </Form.Item>
            </Col>
            <Col span={6} style={{ textAlign: 'right' }}>
              <Form.Item>
                <Space>
                  <Button icon={<PlusOutlined />} type="primary" onClick={addModal}>
                    添加
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        scroll={{ x: 'max-content' }}
        dataSource={[...data]}
        pagination={{
          onChange: setPageIndex,
          showSizeChanger: false,
          showQuickJumper: true,
          pageSize: pageSize,
          total: total,
        }}
      />
      {showDialog == true ? (
        <AEBannerDialog
          data={selectedData}
          mode={dialogMode}
          onSuccess={_onDialogSuccess}
          show={showDialog}
          onClose={_onDialogClose}
        />
      ) : (
        ''
      )}
      {deShowDialog == true ? (
        <DEDialog
          onChange={() => setDeShowDialog(false)}
          show={deShowDialog}
          data={() => <TaskBasicInfo dataValue={selectedData}></TaskBasicInfo>}
        ></DEDialog>
      ) : (
        ''
      )}
    </div>
  )
}

export default TaskListPage
