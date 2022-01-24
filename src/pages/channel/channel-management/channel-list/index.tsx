/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Description: 渠道列表
 * @LastEditTime: 2022-01-24 16:13:47
 */
import React, { useState, useEffect } from 'react'
import { Form, Col, Row, Button, Table, Space, Modal, message } from 'antd'
import { InputTemp } from '@/components/filter/formItem'
import AddChannelDialog, { DialogMode } from './components/AddChannelDialog'
import { analysisName } from '@/utils/newTree'
import ChannelListTree from '../components/ChannelListTree'
import ChannelService from '@/service/ChannelService'
import { cityDispose } from '@/utils/tree'
// import { enumState } from '@/utils/enum'
import { AuthEle } from '@/components/Common/AuthEle'
import './index.less'
const ChannelPage: React.FC = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize] = useState(20)
  const [total, setTotal] = useState()
  const [showDialog, setShowDialog] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const [channelId, setChannelId] = useState('')
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
      const postForm = { current: pageIndex, size: pageSize, ...query, id: channelId }
      ChannelService.list(postForm).then((res) => {
        setData(res.data?.records ?? [])
        setTotal(res.data?.total)
      })
    })
  }
  const columns = [
    {
      title: '序号',
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
      render: (_text, record, index) => `${(record?.regionsName ?? '').substring(0, 40)}`,
    },
    {
      title: '归属',
      dataIndex: 'title',
      render: (text, recode) => {
        const nameJoin = analysisName(structure, recode?.id, 'children', 'id', 'pid')
        console.log(nameJoin, 'nameJoinnameJoinnameJoin')
        return `${!nameJoin ? recode?.name : nameJoin ?? ''}`
      },
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
          <AuthEle id={61}>
            <Button onClick={() => showAddDialog(record, 'see')}>查看</Button>
          </AuthEle>
          <AuthEle id={63}>
            <Button onClick={() => showAddDialog(record, 'edit')}>编辑</Button>
          </AuthEle>
          <AuthEle id={64}>
            <Button onClick={() => _delItem(record)} danger>
              删除
            </Button>
          </AuthEle>
        </Space>
      ),
    },
  ]

  /**删除 */
  const _delItem = (record) => {
    Modal.confirm({
      title: '删除内容页？',
      content: '将删除该内容页及其已填写信息内容',
      okText: '确认',
      okType: 'primary',
      cancelText: '返回填写',
      onOk: () => {
        ChannelService.del({ id: record.id }).then((res) => {
          if (res.code == 200) {
            loadData()
            message.success('删除成功')
          }
        })
      },
    })
  }
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
    setSelectedData(add == 'add' ? { state: true, isOpenAccount: false } : record)
  }

  const _onDialogSuccess = () => {
    setSelectedData(null)
    setShowDialog(false)
    setPageIndex(1)
    setChannelId('')
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
          {structure.length > 0 ? (
            <ChannelListTree
              structure={structure}
              defaultSelectedKeys={structure[0]?.id ?? ''}
              onSelectStructure={_onSelectStructure}
            />
          ) : (
            ''
          )}
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
                  <Form.Item wrapperCol={{ offset: 1, span: 12 }}>
                    <Space>
                      <Button type="primary" htmlType="submit">
                        查询
                      </Button>
                      <Button htmlType="button" onClick={onReset}>
                        清除
                      </Button>
                      <AuthEle id={62}>
                        <Button type="primary" onClick={showAddDialog}>
                          创建渠道
                        </Button>
                      </AuthEle>
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
