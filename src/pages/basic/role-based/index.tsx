/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Description: 渠道列表
 * @LastEditTime: 2021-12-29 09:53:23
 */
import React, { useState, useEffect } from 'react'
import { Form, Col, Row, Button, Table, Space, Select } from 'antd'
import { InputTemp } from '@/components/filter/formItem'
import AddUserDialog, { DialogMode } from './components/AddUserDialog'
import { analysisName } from '@/utils/tree'
import ChannelListTree from '@/components/components/ChannelListTree'
import ChannelService from '@/service/ChannelService'
import RoleService from '@/service/RoleService'
import { cityDispose } from '@/utils/tree'
import { enumRoleState } from '@/utils/enum'
import './index.less'
const RolePage: React.FC = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize] = useState(10)
  const [total, setTotal] = useState()
  const [showDialog, setShowDialog] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const [channelId, setChannelId] = useState(null)
  const [dialogMode, setDialogMode] = useState<DialogMode>('add')
  const [structure, setStructure] = useState([])

  useEffect(() => {
    loadData()
    getStructure()
    form.setFieldsValue({
      state: '',
    })
  }, [])
  useEffect(() => {
    loadData()
  }, [pageIndex])

  const getStructure = () => {
    ChannelService.getStructure().then((res) => {
      setStructure(cityDispose([res?.data], 'children'))
    })
  }
  const loadData = () => {
    form.validateFields().then((query) => {
      const postForm = { current: pageIndex, size: pageSize, ...query, channelId: channelId }
      RoleService.list(postForm).then((res) => {
        setData(res.data?.records ?? [])
        setTotal(res.data?.total)
      })
    })
  }
  const columns = [
    {
      title: 'id',
      render: (_text, _record, index) => `${index + 1}`,
    },
    {
      title: '角色ID',
      dataIndex: 'id',
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '角色描述',
      dataIndex: 'remark',
    },
    {
      title: '所属渠道',
      dataIndex: 'channelName',
    },
    {
      title: '权限平台',
      dataIndex: 'authorityPlatform',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    // {
    //   title: '状态',
    //   dataIndex: 'stateVal',
    // },
    {
      title: '操作',
      render: (_text: any, record: any) => (
        <Space size="middle">
          {/* <Button >查看</Button> */}
          <Button onClick={() => showAddDialog(record, false)}>编辑</Button>
          {/* <Button>删除</Button> */}
        </Space>
      ),
    },
  ]

  const onFinish = (values: any) => {
    console.log('Success:', values)
    loadData()
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const onReset = () => {
    form.resetFields()
  }

  const showAddDialog = (record, add = true) => {
    setDialogMode(add ? 'add' : 'edit')
    setShowDialog(true)
    setSelectedData(record)
  }

  const _onDialogSuccess = () => {
    setSelectedData(null)
    setShowDialog(false)
    loadData()
  }

  const _onDialogClose = () => {
    setSelectedData(null)
    setShowDialog(false)
  }
  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId])
  const _onSelectStructure = (id) => {
    setChannelId(id)
  }
  return (
    <div className="role-list">
      <Row gutter={[10, 0]}>
        <Col xxl={3} xl={5} lg={7} md={8}>
          {structure.length > 0 ? <ChannelListTree structure={structure} onSelectStructure={_onSelectStructure} /> : ''}
        </Col>
        <Col xxl={21} xl={19} lg={17} md={16}>
          <div>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              form={form}
            >
              <Row gutter={[10, 0]}>
                <Col  className="table-from-label">
                  搜索条件
                </Col>
                <Col >
                  <InputTemp name="roleNameLike" placeholder="角色名称" />
                </Col>
                {/* <Col span={1} className="table-from-label">
                  状态
                </Col>
                <Col span={3}>
                  <Form.Item name="state">
                    <Select allowClear>
                      {Object.keys(enumRoleState).sort().map((item) => {
                        return (
                          <Select.Option key={item} value={item}>
                            {enumRoleState[item]}
                          </Select.Option>
                        )
                      })}
                    </Select>
                  </Form.Item>
                </Col> */}
                <Col span={5}>
                  <Form.Item wrapperCol={{ offset: 2, span: 0 }}>
                    <Space>
                      <Button type="primary" htmlType="submit">
                        查询
                      </Button>
                      <Button htmlType="button" onClick={onReset}>
                        清除
                      </Button>
                      <Button type="primary" onClick={showAddDialog}>
                        添加角色
                      </Button>
                    </Space>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
          <Table
            rowKey="id"
            childrenColumnName="childrenArray"
            columns={columns}
            scroll={{ x: 'max-content' }}
            dataSource={[...data]}
            pagination={{
              onChange: setPageIndex,
              showSizeChanger: false,
              showQuickJumper: true,
              current: pageIndex,
              pageSize: pageSize,
              total: total,
            }}
          />
        </Col>
      </Row>
      <AddUserDialog
        data={selectedData}
        mode={dialogMode}
        structure={structure}
        onSuccess={_onDialogSuccess}
        show={showDialog}
        onClose={_onDialogClose}
      />
    </div>
  )
}

export default RolePage
