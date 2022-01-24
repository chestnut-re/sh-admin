/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Description: 渠道分佣列表
 * @LastEditTime: 2022-01-24 16:13:53
 */
import React, { useState, useEffect } from 'react'
import { Form, Col, Row, Button, Table, Space, Select, Modal, message } from 'antd'
import { InputTemp } from '@/components/filter/formItem'
import AddCommissionSchemeDialog, { DialogMode } from './components/AddCommissionSchemeDialog'
import { formateTime } from '@/utils/timeUtils'
import ChannelListTree from '../components/ChannelListTree'
import ChannelService from '@/service/ChannelService'
import { cityDispose, getMaxFloor, getTwoTier, getLastTwoTier } from '@/utils/tree'
import { enumState } from '@/utils/enum'
import { AuthEle } from '@/components/Common/AuthEle'
import './index.less'
const CommissionSchemePage: React.FC = () => {
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
  const [ranked, setRanked] = useState([])
  const [structureTwo, setStructureTwo] = useState([])
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
      console.log([res?.data], '[res?.data]')
      const lastTwoData = JSON.parse(JSON.stringify(getLastTwoTier([res?.data], 'children')))
      const twoData = JSON.parse(JSON.stringify(getTwoTier([res?.data], 'children')))
      console.log(lastTwoData, 'lastTwoData')
      setStructure(lastTwoData)
      setStructureTwo(twoData)
      setRanked(getMaxFloor([res?.data]).slice(1))
    })
  }
  const loadData = () => {
    form.validateFields().then((query) => {
      const postForm = { pages: pageIndex, size: pageSize, ...query, id: channelId }
      ChannelService.ChannelPlan.getChannelDistPlan(postForm).then((res) => {
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
      title: '方案名称',
      dataIndex: 'planName',
    },
    // {
    //   title: '状态',
    //   dataIndex: 'state',
    //   render: (_text, record) => `${enumState[record.state]} `,
    // },
    {
      title: '现关联商品量',
      dataIndex: 'goodsNumber',
    },
    {
      title: '创建日期',
      dataIndex: 'createTime',
      render: (_text, record) => `${formateTime(record.createTime)} `,
    },

    {
      title: '操作',
      render: (_text: any, record: any) => (
        <Space size="middle">
          <AuthEle id={65}>
            <span className="operation" onClick={() => showAddDialog(record, 'see')}>
              查看
            </span>
          </AuthEle>
          <AuthEle id={67}>
            <span className="operation" onClick={() => showAddDialog(record, 'edit')}>
              编辑
            </span>
          </AuthEle>
          {/* <Button>删除</Button> */}
          <AuthEle id={68}>
            <span className="operation" onClick={() => _delItem(record)}>
              删除
            </span>
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
        ChannelService.ChannelPlan.del({ id: record.id }).then((res) => {
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
    setSelectedData(record)
  }

  const _onDialogSuccess = () => {
    setSelectedData(null)
    setShowDialog(false)
    setChannelId('')
    setPageIndex(1)
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
    <div className="scheme__root">
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
                  方案名称
                </Col>
                <Col span={3}>
                  <InputTemp name="planName" />
                </Col>
                {/* <Col span={1} className="table-from-label">
                  状态
                </Col>
                <Col span={3}>
                  <Form.Item name="state">
                    <Select allowClear>
                      {Object.keys(enumState).sort().map((item) => {
                        return (
                          <Select.Option key={item} value={item}>
                            {enumState[item]}
                          </Select.Option>
                        )
                      })}
                    </Select>
                  </Form.Item>
                </Col> */}
                <Col span={5}>
                  <Form.Item wrapperCol={{ offset: 1, span: 12 }}>
                    <Space>
                      <Button htmlType="submit">查询</Button>
                      <Button htmlType="button" onClick={onReset}>
                        清除
                      </Button>
                      <AuthEle id={66}>
                        <Button type="primary" onClick={showAddDialog}>
                          创建分佣方案
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
              showSizeChanger: true,
              showQuickJumper: true,
              current: pageIndex,
              pageSize: pageSize,
              total: total,
            }}
          />
        </Col>
      </Row>

      <AddCommissionSchemeDialog
        data={selectedData}
        mode={dialogMode}
        structure={structureTwo}
        onSuccess={_onDialogSuccess}
        ranked={ranked}
        show={showDialog}
        onClose={_onDialogClose}
      />
    </div>
  )
}

export default CommissionSchemePage
