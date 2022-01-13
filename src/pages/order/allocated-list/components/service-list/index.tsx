import React, { useState, useEffect } from 'react'
import { Form, Table, Input, Select, Row, Col, Space, Button } from 'antd'
import { AllocatedOrderService } from '@/service/OrderService'
import AreaSelect, { Mode } from '@/components/formItem/AreaSelect'
import ChannelService from '@/service/ChannelService'
import { HttpCode } from '@/constants/HttpCode'

/**
 * 选择服务方列表
 */
interface Props {
  id: any
  setSelectData: any
}

const ServiceList: React.FC<Props> = ({ id, setSelectData }) => {
  const [form] = Form.useForm()
  const { Option } = Select
  const [data, setData] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState()
  const [channelId, setChannelId] = useState<string>('')
  const [channelData, setChannelData] = useState([])
  const [mode, setMode] = useState<Mode>('order')

  useEffect(() => {
    loadData(pageIndex)
    getChannel()
  }, [pageIndex])

  const loadData = (pageIndex) => {
    form.validateFields().then((query) => {
      AllocatedOrderService.service({
        current: pageIndex,
        size: pageSize,
        orderId: id,
        ...query,
      }).then((res) => {
        setData(res.data.records)
        setTotal(res.data.total)
      })
    })
  }

  const getChannel = () => {
    ChannelService.list({ pages: 1, size: 10 }).then((res) => {
      if (res.code === HttpCode.success) {
        setChannelData(res.data?.records ?? [])
      }
    })
  }

  const columns = [
    {
      title: '姓名',
      dataIndex: 'realName',
    },
    {
      title: '订单关联',
      dataIndex: 'nickName',
    },
    {
      title: '所属归属',
      dataIndex: 'belongChannel',
    },
    {
      title: '责任区域',
      dataIndex: 'address',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '团建奖金',
      dataIndex: 'havePresetBonus',
    },
    {
      title: '当前返利',
      dataIndex: 'haveRebate',
    },
  ]

  const onFinish = (values: any) => {
    loadData(pageIndex)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectData(selectedRows[0])
    },
  }

  const _onChangeAddress = (e) => {
    form.setFieldsValue({
      areaCode: e[1],
    })
  }

  return (
    <div className="service__root">
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
      >
        <Row gutter={[5, 0]} style={{ paddingLeft: '40px' }}>
          <Col span={8}>
            <Form.Item name="keyword">
              <Input placeholder="姓名/手机号" />
            </Form.Item>
          </Col>
          <Col span={2} className="table-from-label">
            关系归属
          </Col>
          <Col span={4}>
            <Form.Item name="channelId">
              <Select style={{ width: 120 }} placeholder="请选择">
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
            责任区域
          </Col>
          <Col span={4}>
            <Form.Item name="areaCode">
              <AreaSelect channelId={channelId} mode={mode} onChange={_onChangeAddress} />
            </Form.Item>
          </Col>
          <Form.Item wrapperCol={{ offset: 2, span: 0 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button htmlType="button">重置</Button>
            </Space>
          </Form.Item>
        </Row>
      </Form>
      <Table
        rowKey="userId"
        columns={columns}
        scroll={{ x: 'max-content' }}
        rowSelection={{
          type: 'radio',
          ...rowSelection,
        }}
        dataSource={[...data]}
        pagination={{
          onChange: setPageIndex,
          showQuickJumper: true,
          pageSize: pageSize,
          total: total,
        }}
      />
    </div>
  )
}
export default ServiceList
