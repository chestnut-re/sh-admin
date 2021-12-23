/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Description: 渠道列表
<<<<<<< HEAD
 * @LastEditTime: 2021-12-23 17:17:28
=======
 * @LastEditTime: 2021-12-23 16:05:26
>>>>>>> f387a9e87dd3c258f7a1bb61587874396fbef687
 */
import React, { useState, useEffect } from 'react'
import { Form, Col, Row, Button, Table, Space, Select } from 'antd'
import { InputTemp } from '@/components/filter/formItem'
import AddChannelDialog, { DialogMode } from './components/AddChannelDialog'
import ChannelListTree from '../components/ChannelListTree'
import ChannelService from '@/service/ChannelService'
import { cityDispose } from '@/utils/city'
import { enumState } from '@/utils/enum'
import './index.less'
const ChannelPage: React.FC = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize] = useState(10)
  const [total] = useState()
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
      const postForm = { pages: pageIndex, size: pageSize, ...query, id: channelId }
      ChannelService.list(postForm).then((res) => {
        setData(res.data?.records ?? [])
        setTotal(res.data?.total)
      })
    })
  }
  const columns = [
    {
      title: 'id',
<<<<<<< HEAD
      render: (_text, _record, index) => `${index + 1}`,
=======
      render: (index: number) => `${index + 1}`,
>>>>>>> f387a9e87dd3c258f7a1bb61587874396fbef687
    },
    {
      title: '渠道编号',
      dataIndex: 'id',
    },
    {
      title: '渠道名称',
      dataIndex: 'name',
    },
    {
      title: '责任人',
      dataIndex: 'person',
    },
    {
      title: '责任人手机号',
      dataIndex: 'name',
    },
    {
      title: '责任区域',
      dataIndex: 'regionsName',
    },
    {
      title: '归属',
      dataIndex: 'title',
    },
    {
      title: '状态',
      dataIndex: 'state',
<<<<<<< HEAD
      render: (_text, record) => `${enumState[record.state]} `,
=======
      render: (text, record) => `${enumState[record.state]} `,
>>>>>>> f387a9e87dd3c258f7a1bb61587874396fbef687
    },

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
    <div className="channel-list">
      <Row gutter={[10, 0]}>
        <Col span={3}>
          {structure.length>0? <ChannelListTree structure={structure} onSelectStructure={_onSelectStructure} />:''}
        </Col>
        <Col span={21}>
          <div>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              form={form}
            >
              <Row gutter={[10, 0]}>
                <Col span={1} className="table-from-label">
                  渠道名称
                </Col>
                <Col span={3}>
                  <InputTemp name="channel" />
                </Col>
                <Col span={1} className="table-from-label">
                  状态
                </Col>
                <Col span={3}>
                  <Form.Item name="state">
                    <Select allowClear>
                      {Object.keys(enumState).map((item) => {
                        return (
                          <Select.Option key={item} value={item}>
                            {enumState[item]}
                          </Select.Option>
                        )
                      })}
                    </Select>
                  </Form.Item>
                </Col>
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
                        创建渠道
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
              showSizeChanger: true,
              showQuickJumper: true,
              current: pageIndex,
              pageSize: pageSize,
              total: total,
            }}
          />
        </Col>
      </Row>
      <AddChannelDialog
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

export default ChannelPage
