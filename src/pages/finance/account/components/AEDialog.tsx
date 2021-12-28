import { Form, Modal, DatePicker, Row, Col, Select, Tabs, Table, Button, Space } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { FinanceAccountService } from '@/service/FinanceAccountService'
import './index.less'

export type DialogMode = 'add' | 'edit'

interface Props {
  data: any
  mode: DialogMode
  show: boolean
  /**内容修改成功回调，页面需要刷新数据 */
  onSuccess: () => void
  onClose: () => void
}

/**
 * 添加&编辑
 */
const AEDialog: FC<Props> = ({ data, show = false, onSuccess, onClose }) => {
  const [form] = Form.useForm()
  const { Option } = Select
  const { TabPane } = Tabs
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState()
  const [channelData, setChannelData] = useState([])
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    loadAllData()
  }, [show])

  useEffect(() => {
    loadTableData(pageIndex)
  }, [pageIndex])

  const loadAllData = () => {
    FinanceAccountService.details({ phone: data?.phone }).then((res) => {
      console.log(res)
    })
  }

  const loadTableData = (pageIndex) => {
    FinanceAccountService.detailsList({ current: pageIndex, pageSize: pageSize }).then((res) => {
      console.log(res)
      // setData(res.data.records)
      // setTotal(res.data.total)
    })
  }

  const columns = [
    {
      title: '序号',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '订单编号',
      dataIndex: 'nickName',
    },
    {
      title: '分佣类型',
      dataIndex: 'mobile',
    },
    {
      title: '账户变化',
      dataIndex: 'roleName',
    },
    {
      title: '时间',
      dataIndex: 'state',
    },
  ]

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  /**提交数据 */
  const _handleUpdate = async () => {
    form
      .validateFields()
      .then((formData) => {
        /////
      })
      .catch((e) => {
        console.error(e)
      })
  }

  const _formClose = () => {
    form.resetFields()
    onClose()
  }

  return (
    <Modal title="商品分佣方案" visible={show} onOk={_handleUpdate} onCancel={_formClose} width="90%">
      <div className="sales__root">
        <div className="sales-header">
          <span>账户中心/账户明细</span>
        </div>
        <div className="sales-content">
          <div className="con1">
            <span>归属渠道：</span>
            <span>{data?.channelName}</span>
            <span>姓名：</span>
            <span>{data?.realName}</span>
            <span>账号：</span>
            <span>{data?.phone}</span>
          </div>
          <div className="con2">
            <span>账户总额：</span>
            <span>{data?.total}</span>
          </div>
          <div className="con3">
            <span>可用金额：</span>
            <span></span>
            <span>运营资金：</span>
            <span></span>
            <span>待释放：</span>
            <span></span>
            <span>提现中：</span>
            <span></span>
          </div>
        </div>
        <div className="sales-tabs">
          <Tabs defaultActiveKey="1">
            <TabPane tab="佣金" key="1">
              <div className="list__root">
                <div className="list-form">
                  <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    form={form}
                  >
                    <Row gutter={[5, 0]}>
                      <Col span={2} className="table-from-label">
                        收支状态
                      </Col>
                      <Col span={4}>
                        <Form.Item name="channelId">
                          <Select style={{ width: 120 }}>
                            {channelData?.map((item: any) => {
                              return (
                                <Option value={item.id} key={item.id}>
                                  {item.name}
                                </Option>
                              )
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={2} className="table-from-label">
                        时间筛选
                      </Col>
                      <Col span={4}>
                        <Form.Item name="channelId"></Form.Item>
                      </Col>
                      <Form.Item wrapperCol={{ offset: 2, span: 0 }}>
                        <Space>
                          <Button type="primary" htmlType="submit">
                            查询
                          </Button>
                          <Button htmlType="submit">重置</Button>
                        </Space>
                      </Form.Item>
                    </Row>
                  </Form>
                </div>
                <div className="sales">
                  <span>待释放：</span>
                  <span></span>
                  <span>支出：</span>
                  <span></span>
                  <span>收入：</span>
                  <span></span>
                </div>
                <Table
                  rowKey="id"
                  columns={columns}
                  scroll={{ x: 'max-content' }}
                  dataSource={[...tableData]}
                  pagination={{
                    onChange: setPageIndex,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    pageSize: pageSize,
                    total: total,
                  }}
                />
              </div>
            </TabPane>
            <TabPane tab="提现" key="2"></TabPane>
            <TabPane tab="运营资金" key="3"></TabPane>
          </Tabs>
        </div>
      </div>
    </Modal>
  )
}

export default AEDialog
