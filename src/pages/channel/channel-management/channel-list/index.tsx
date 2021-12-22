/*
 * @Description: 渠道列表
 * @LastEditTime: 2021-12-21 19:03:00
 */
import React, { useState, useEffect } from 'react'
import { Form, Col, Row, Button, Table, Space } from 'antd'
import { InputTemp, SelectTemp, LowAndHighTemp } from '@/components/filter/formItem'
import { shellArray,cityDispose ,analyId} from '@/utils/city'
import AddChannelDialog, { DialogMode } from './components/AddChannelDialog'
import ChannelService from '@/service/ChannelService'
import dataList from './data'
import './index.less'
const ChannelListPage: React.FC = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState([])

  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize] = useState(10)
  const [total, setTotal] = useState()
  const [showDialog, setShowDialog] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const [dialogMode, setDialogMode] = useState<DialogMode>('add')
  const [ProvinceCityData, setProvinceCity] = useState([])
  useEffect(() => {
    loadData()
    getDetail()
  
    // setProvinceCity(cityDispose(dataList,'areas'))

    console.log(analyId(dataList, '330400'), 'llllll')
  }, [])
  const getDetail = () => {
    ChannelService.getProvinceCity().then((res) => {
      console.log(res.data, '-----')
      setProvinceCity(cityDispose(res.data,'areas'))
      // setData(res.data?.list)
    })
  }

  const loadData = (params = {}) => {
    form.validateFields().then((query) => {
      ChannelService.list({ ...params, ...query }).then((res) => {
        setData(res.data?.list)
      })
    })
  }

  const columns = [
    {
      title: 'id',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '渠道编号',
      dataIndex: 'no',
    },
    {
      title: '渠道名称',
      dataIndex: 'name',
    },
    {
      title: '责任人',
      dataIndex: 'name',
    },
    {
      title: '责任人手机号',
      dataIndex: 'name',
    },
    {
      title: '责任区域',
      dataIndex: 'region',
    },
    {
      title: '归属',
      dataIndex: 'parentName',
    },
    {
      title: '状态',
      dataIndex: 'state',
    },

    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button>查看</Button>
          <Button>编辑</Button>
          <Button>删除</Button>
        </Space>
      ),
    },
  ]

  const onFinish = (values: any) => {
    console.log('Success:', values)
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
  return (
    <div className="channel-list">
      <div>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Row justify="end">
            <Form.Item wrapperCol={{ span: 0 }}>
              <Space>
                <Button type="primary">创建渠道</Button>
              </Space>
            </Form.Item>
          </Row>
          <Row gutter={[10, 0]}>
            <Col span={1} className="table-from-label">
              渠道名称
            </Col>
            <Col span={3}>
              <InputTemp name="username" />
            </Col>
            <Col span={1} className="table-from-label">
              归属渠道名称
            </Col>
            <Col span={3}>
              <InputTemp name="username" />
            </Col>
            <Col span={1} className="table-from-label">
              状态
            </Col>
            <Col span={3}>
              <SelectTemp name="gender" />
            </Col>
            <Col span={5}>
              {/* <Form.Item wrapperCol={{ offset: 2, span: 0 }}>
                <Space>
                  <Button type="primary" htmlType="submit">
                    查询
                  </Button>
                  <Button htmlType="button">重置</Button>
                </Space>
              </Form.Item> */}
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
        columns={columns}
        scroll={{ x: 'max-content' }}
        dataSource={[...data]}
        pagination={{
          onChange: setPageIndex,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSize: pageSize,
          total: total,
        }}
      />
      <AddChannelDialog
        data={selectedData}
        mode={dialogMode}
        cityData={ProvinceCityData}
        onSuccess={_onDialogSuccess}
        show={showDialog}
        onClose={_onDialogClose}
      />
    </div>
  )
}

export default ChannelListPage
