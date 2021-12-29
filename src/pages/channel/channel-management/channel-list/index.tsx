/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Description: 渠道列表
 * @LastEditTime: 2021-12-29 14:48:39
 */
import React, { useState, useEffect } from 'react'
import { Form, Col, Row, Button, Table, Space, Select } from 'antd'
import { InputTemp } from '@/components/filter/formItem'
import AddChannelDialog, { DialogMode } from './components/AddChannelDialog'
import { analysisName } from '@/utils/tree'
import ChannelListTree from '../components/ChannelListTree'
import ChannelService from '@/service/ChannelService'
import { cityDispose } from '@/utils/tree'
import { enumState } from '@/utils/enum'
import './index.less'
const ChannelPage: React.FC = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize] = useState(10)
  const [total, setTotal] = useState()
  const [showDialog, setShowDialog] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const [channelId, setChannelId] = useState(null)
  const [dialogMode, setDialogMode] = useState('add')
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
      render: (_text, _record, index) => `${index + 1}`,
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
      dataIndex: 'phoneNumber',
    },
    {
      title: '责任区域',
      dataIndex: 'regionsName',
    },
    {
      title: '归属',
      dataIndex: 'title',
      render: (text, recode) =>
        `${
          !analysisName(structure, recode?.id, 'children', 'id', 'pid')
            ? recode?.name
            : analysisName(structure, recode?.id, 'children', 'id', 'pid')
        }`,
    },
    // {
    //   title: '状态',
    //   dataIndex: 'state',
    //   render: (_text, record) => `${enumState[record.state]} `,
    // },

    {
      title: '操作',
      render: (_text: any, record: any) => (
        <Space size="middle">
          <Button onClick={() => showAddDialog(record, 'see')}>查看</Button>
          <Button onClick={() => showAddDialog(record, 'edit')}>编辑</Button>
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

  const showAddDialog = (record, add = 'add') => {
    setDialogMode(add)
    setShowDialog(true)
    setSelectedData(add=='add' ? { state: true, isOpenAccount: false } : record)
  }

  const _onDialogSuccess = () => {
    setSelectedData(null)
    setShowDialog(false)
    loadData()
    getStructure()
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
    <div className="channel__root">
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
                <Col span={2} className="table-from-label">
                  渠道名称
                </Col>
                <Col span={3}>
                  <InputTemp name="channel" />
                </Col>
                {/* <Col span={1} className="table-from-label">
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
                </Col> */}
                <Col span={6}>
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
        channelId={channelId}
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
