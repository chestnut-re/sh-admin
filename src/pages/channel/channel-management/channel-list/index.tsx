/*
 * @Description: 渠道列表
 * @LastEditTime: 2021-12-23 15:25:39
 */
import React, { useState, useEffect } from 'react'
import { Form, Col, Row, Button, Table, Space, Select } from 'antd'
import { InputTemp, SelectTemp, LowAndHighTemp } from '@/components/filter/formItem'
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
      render: (text, record, index) => `${enumState[record.state]} `,
    },

    {
      title: '操作',
      render: (text: any, record: any) => (
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
  // useEffect(()=>{
  //   setDialogMode('edit')
  //   setShowDialog(true)
  //   setSelectedData({"id":"1473893995674558464","code":"QD202112230002","level":2,"platform":null,"name":"测试-分中心名称","regions":null,"regionsName":"安徽省-安庆市,福建省-福州市,广东省-潮州市,北京市-北京城区,甘肃省-白银市","settleType":null,"settleDay":null,"businessAuthority":null,"menuAuthority":null,"createTime":"2021-12-23T05:51:26.877+00:00","createUser":"100","createUserName":null,"updateTime":null,"updateUser":null,"updateUserName":null,"isDeleted":null,"children":null,"belongName":null,"userName":null,"phoneNumber":"13111111111","state":null})

  // },[])
  const showAddDialog = (record, add = true) => {
    // console.log(JSON.stringify(record), '------')
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
          <ChannelListTree structure={structure} onSelectStructure={_onSelectStructure} />
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
            childrenColumnName="childrens"
            columns={columns}
            scroll={{ x: 'max-content' }}
            dataSource={[...data]}
            pagination={{
              onChange: setPageIndex,
              showSizeChanger: true,
              showQuickJumper: true,
              current: pageSize,
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
