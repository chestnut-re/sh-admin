import React, { useState, useEffect } from 'react'
import { Form, Col, Row, Button, Table, Space, Tabs, Select } from 'antd'
import './index.less'
import { InputTemp } from '@/components/filter/formItem'
import { FinanceAccountService } from '@/service/FinanceAccountService'
import ChannelService from '@/service/ChannelService'
import { useHistory } from 'react-router-dom'
import { getNanoId } from '@/utils/nanoid'

/**
 * 财务中心-账户中心
 */
const AccountPage: React.FC = () => {
  const [form] = Form.useForm()
  const { Option } = Select
  const history = useHistory<any>()
  const [data, setData] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState()
  const { TabPane } = Tabs
  const [channel, setChannel] = useState([])

  useEffect(() => {
    loadData(pageIndex)
    channelData()
  }, [pageIndex])

  const loadData = (pageIndex) => {
    const params = form.getFieldsValue()

    FinanceAccountService.list({ current: pageIndex, size: pageSize, ...params }).then((res) => {
      setData(
        res.data?.records?.map((i) => {
          i.key = getNanoId()
          return i
        }) ?? []
      )
      setTotal(res.data?.total)
    })
  }
  const channelData = () => {
    ChannelService.getStructure().then((res) => {
      setChannel(res.data?.children ?? [])
    })
  }

  const columns = [
    {
      title: '序号',
      render: (text, record, index) => `${index + 1}`,
    },

    {
      title: '姓名',
      dataIndex: 'realName',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '账户总额',
      dataIndex: 'total',
    },
    {
      title: '待释放金额',
      dataIndex: 'frozen',
    },
    {
      title: '可提现金额',
      dataIndex: 'available',
    },
    {
      title: '所属渠道',
      dataIndex: 'channelName',
    },
    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          <span className="operation" onClick={() => _editDialog(record)}>
            查看明细
          </span>
        </Space>
      ),
    },
  ]

  /**编辑 */
  const _editDialog = (record) => {
    history.push('/finance/account/details', {
      record: record,
    })
  }

  /**筛选 */
  const onFinish = () => {
    setPageIndex(1)
    loadData(1)
  }

  /**重置 */
  const resetTable = () => {
    form.resetFields()
    setPageIndex(1)
    loadData(1)
  }

  const onPaginationChange = (page: number, pageSize: number) => {
    setPageIndex(page)
    setPageSize(pageSize)
  }

  return (
    <div className="AccountPage__root">
      <div className="sales-header">
        <span>账户中心</span>
      </div>
      <div className="sales-tabs">
        {/* <Tabs defaultActiveKey="1">
          <TabPane tab="账户管理" key="1"> */}
        <div>
          <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} form={form}>
            <Row gutter={[10, 0]}>
              <Col span={1} className="table-from-label"></Col>
              <Col span={1} className="table-from-label">
                渠道
              </Col>
              <Col span={3}>
                <Form.Item name="channelId">
                  <Select style={{ width: 120 }}>
                    {channel?.map((item: any) => {
                      return (
                        <Option value={item?.id} key={item?.id}>
                          {item?.name}
                        </Option>
                      )
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={5}>
                <InputTemp name="name" placeholder="请输入人员名称" />
              </Col>
              <Form.Item wrapperCol={{ offset: 1, span: 12 }}>
                <Space>
                  <Button htmlType="submit">查询</Button>
                  <Button onClick={resetTable}>重置</Button>
                </Space>
              </Form.Item>
            </Row>
          </Form>
        </div>
        <Table
          rowKey="key"
          columns={columns}
          scroll={{ x: 'max-content' }}
          dataSource={[...data]}
          pagination={{
            onChange: onPaginationChange,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: pageSize,
            total: total,
          }}
        />
        {/* </TabPane>
        </Tabs> */}
      </div>
    </div>
  )
}

export default AccountPage
