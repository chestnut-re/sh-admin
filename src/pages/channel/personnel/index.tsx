import React, { useState, useEffect } from 'react'
import { Form, Col, Row, Button, Table, Space, message, Select } from 'antd'
import { InputTemp, SelectTemp } from '@/components/filter/formItem'
import './component/StructureTree'
import './index.less'
import CreatePerson from './add'
import StructureTree from './component/StructureTree'
import { getPerson, getStructure, getSubordinate } from '@/service/PersonService'
import { cityDispose } from '@/utils/tree'
import { personType, personState } from '@/utils/enum'

/*
 * 人员管理
 */
const PersonnelManagement: React.FC = () => {
  const [form] = Form.useForm()
  const [personList, setPersonList] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize, setPagesize] = useState(10)
  const [channelId, setChannelId] = useState([])
  const [structure, setStructure] = useState([])
  const [total, setTotal] = useState()

  // const loadData = () => {
  //   form.validateFields().then((query) => {
  //     const postForm = { pages: pageSize, size: pageSize }
  //     getPerson(postForm).then((res) => {
  //       setPersonList(res.data?.records ?? [])
  //       setTotal(res.data?.total)
  //     })
  //   })
  // }
  useEffect(() => {
    getStructure().then((res) => {
      // setStructure(cityDispose([res?.data], 'children'))
    })
  }, [])
  useEffect(() => {
    getPerson({ pageSize, current, total }).then((res) => {
      setPersonList(res.data?.records)
      setTotal(res.data?.total)
    })
  }, [pageSize])
  // useEffect(() => {
  //   loadData
  // }, [pageSize])
  const columns = [
    {
      title: '人员ID',
      dataIndex: 'userId',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '人员名称',
      dataIndex: 'userName',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '责任区域',
      dataIndex: 'address',
    },
    {
      title: '人员类型',
      dataIndex: 'accountType',
      render: (text: any, record: any) => {
        if (record.state == 0) {
          return `渠道账户`
        } else if (record.state == 1) {
          return `内部渠道`
        } else {
          return `外部渠道s`
        }
      },
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '归属渠道',
      dataIndex: 'channelName',
    },
    {
      title: '创建平台',
      dataIndex: 'createChannel',
    },
    {
      title: '状态',
      dataIndex: 'state',
      render: (text: any, record: any) => {
        if (record.state == 0) {
          return `禁用`
        } else {
          return `正常`
        }
      },
    },
    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button>编辑</Button>
          <Button>查看</Button>
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

  const onChange = () => {
    console.log(1)
  }

  const onReset = () => {
    form.resetFields()
  }
  return (
    <div className="channel-list">
      <div className="person-top">
        <h1>人员管理</h1>
      </div>
      <div>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Row gutter={[12, 12]}>
            <Col span={5}>
              <InputTemp name="username" placeholder="渠道名称/责任区域" />
            </Col>
            <Col span={1} className="table-from-label">
              状态
            </Col>
            <Col span={2}>
              <Form.Item name="state">
                <Select allowClear placeholder="全部">
                  {Object.keys(personState).map((item) => {
                    return (
                      <Select.Option key={item} value={item}>
                        {personState[item]}
                      </Select.Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={2} className="table-from-label">
              人员类型
            </Col>
            <Col span={2}>
              <Form.Item name="type">
                <Select allowClear placeholder="全部">
                  {Object.keys(personType).map((item) => {
                    return (
                      <Select.Option key={item} value={item}>
                        {personType[item]}
                      </Select.Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Form.Item wrapperCol={{ offset: 12, span: 0 }}>
              <Space size={16}>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  重置
                </Button>
              </Space>
            </Form.Item>
          </Row>
        </Form>
      </div>
      <div className="person-button">
        <CreatePerson
          data={undefined}
          mode={'add'}
          structure={[]}
          show={false}
          onSuccess={function (): void {
            throw new Error('Function not implemented.')
          }}
          onClose={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </div>
      <div></div>
      <Row gutter={[24, 0]}>
        <Col span={4}>
          <StructureTree
            structure={structure}
            onSelectStructure={function (): void {
              throw new Error('Function not implemented.')
            }}
          />
        </Col>
        <Col span={20}>
          <Table
            rowKey="userId"
            columns={columns}
            scroll={{ x: 'max-content' }}
            dataSource={personList}
            pagination={{ onChange: onChange }}
          />
        </Col>
      </Row>
    </div>
  )
}

export default PersonnelManagement
