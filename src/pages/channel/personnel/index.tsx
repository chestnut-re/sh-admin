import React, { useState, useEffect } from 'react'
import {
  Form,
  Col,
  Row,
  Button,
  Table,
  Space,
  Select,
  Modal,
  Switch,
  Input,
  TreeSelect,
  message,
  Popconfirm,
} from 'antd'
import { InputTemp } from '@/components/filter/formItem'
import './component/StructureTree'
import './index.less'
import StructureTree from './component/StructureTree'
import { add, del, edit, getAreas, getPerson, getRoles, getStructure, getSubordinate } from '@/service/PersonService'
import { personType, personState } from '@/utils/enum'
import { cityDispose } from '@/utils/tree'
// import FromData from './component/FromData'

/*
 * 人员管理
 */
const PersonnelManagement: React.FC = () => {
  const [form] = Form.useForm()
  const [personList, setPersonList] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize, setPagesize] = useState(10)
  // 控制添加人员的对话框效果的实现
  const [visible, setVisible] = useState(false)
  // const [channelId, setChannelId] = useState([])
  const [structure, setStructure] = useState([])
  const [total, setTotal] = useState()
  const [leader, setLeader] = useState([])
  // const [channelId, setChannelId] = useState('1')
  const [channel, setChannels] = useState([])
  const [checkedChannel, setCheckedChannel] = useState([])
  const [checkedAreas, setCheckedAreas] = useState([])
  const { SHOW_PARENT } = TreeSelect
  const [roleName, setRoleName] = useState([])
  const [areas, setAreas] = useState<Array<any>>([])
  const [address, setAddress] = useState('')
  // 上级用户Id
  const [supUserId, setSupUserId] = useState(1)
  const [realName, setRealName] = useState('')
  const [wechatNum, setWechatNum] = useState('')
  const [phone, setphone] = useState('')
  const [subsidy, setsubsidy] = useState('')
  const [roleId, setroleId] = useState(1)
  const [state, setState] = useState('')
  const [accountType, setAccountType] = useState(0)
  // 控制编辑管理员信息的窗口的显示和隐藏
  const [isModalVisible, setIsModalVisible] = useState(false)
  /**
   * 添加人员
   */
  const addPerson = () => {
    const data = { address, supUserId, realName, wechatNum, phone, subsidy, roleId, state, accountType }
    data.address = checkedAreas.toString()
    // const datas = [].slice.call(data)
    // console.log(`object`, data)
    // return
    add(data).then((res) => {
      // 13400000000
      if (res.code === '010052') {
        message.warning('该人员已存在')
      } else {
        setAddress('')
        setSupUserId(1)
        setRealName('')
        setWechatNum('')
        setphone('')
        setsubsidy('')
        setroleId(1)
        setState('1')
        setAccountType(0)
        setCheckedAreas([])
        setVisible(false)
        getPerson({ pageSize, current, total }).then((res) => {
          console.log('ttttttt', res.data)
          setPersonList(res.data.records)
        })
      }
    })
  }
  /**
   * 编辑人员
   */
  const updatePerson = () => {
    // 获取编辑表单信息
    const data = {
      address,
      supUserId,
      realName,
      wechatNum,
      phone,
      subsidy,
      roleId,
      state,
      accountType,
    }
    data.address = checkedAreas.toString()
    edit(data).then(() => {
      resetForm()
      getPerson({ pageSize, current, total }).then((res) => {
        // console.log('ttttttt', res.data)
        setPersonList(res.data.records)
      })
    })
  }
  // 消除编辑表单信息
  const resetForm = () => {
    // 消除表单信息获取的列表数据
    setAddress('')
    setSupUserId(1)
    setRealName('')
    setWechatNum('')
    setphone('')
    setsubsidy('')
    setroleId(1)
    setState('1')
    setAccountType(0)
    setCheckedAreas([])
    setIsModalVisible(false)
  }
  // 删除人员
  // const remove = () => {
  //   del({ userId: columns.userId }).then(() => {
  //     getPerson({ pageSize, total, current }).then((res) => setPersonList(res.data.data))
  //   })
  // }
  /**
   * 请求责任区域
   */
  const getProvinceCity = async () => {
    getAreas().then((res) => {
      setAreas(
        res.data.map((item) => {
          return {
            label: item.name,
            key: item.adcode,
            children: item.areas.map((item) => {
              return {
                label: item.name,
                key: item.adcode,
              }
            }),
          }
        })
      )
    })
  }
  /**
   * 请求渠道名称
   */
  const getChannel = async () => {
    getStructure().then((res) => {
      console.log(res.data.children)
      // setChannelId(res.data.id)
      setStructure(cityDispose([res?.data], 'children'))
      setChannels(
        res.data.children.map((item) => {
          return {
            label: item.name,
            key: item.id,
            children: item.children?.map((item) => {
              return {
                label: item.name,
                key: item.id,
              }
            }),
          }
        })
      )
    })
  }
  useEffect(() => {
    getPerson({ pageSize, current, total }).then((res) => {
      console.log('1111' + res.code)
      setPersonList(res.data?.records)
      setTotal(res.data?.total)
    })
  }, [pageSize])
  useEffect(() => {
    // getStructure().then((res) => {
    // setChannelId(res.data.id)
    // getSubordinate({ channelId: res.data.id }).then((res) => {
    //   setLeader(res.data.username)
    // })
    // })
    getChannel()
    getProvinceCity()
    getSubordinate({ channelId: 1 }).then((res) => {
      console.log('111', res.data)
      setLeader(
        res.data.map((item) => {
          return {
            value: item.userId,
            label: item.userName,
          }
        })
      )
    })
    getRoles().then((res) => {
      setRoleName(
        res.data.map((item) => {
          return {
            value: item.id,
            label: item.roleName,
          }
        })
      )
    })
    return () => {
      setLeader([])
    }
  }, [])

  // 表单规则
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  }
  // 表单提示
  const validateMessages = {
    required: '请填写${label}!',
    number: { range: '${0} must be between ${0} and ${100}' },
  }
  const onFinish = (values: any) => {
    console.log(values)
  }
  const onChange = (checked) => {
    if ((checked = true)) {
      checked = '1'
      // setState(checked)
    } else {
      checked = '2'
    }
    setState(checked)
  }
  const _onSelectStructure = (id) => {
    setChannels(id)
  }
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
      render: (text: any, record: any) => {
        if (record.state == 0) {
          return `管理后台`
        } else if (record.state == 1) {
          return `biz山海`
        }
      },
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
          <Button
            type="primary"
            onClick={() => {
              setIsModalVisible(true)
              setAddress(record.address)
              setSupUserId(record.supUserId)
              setRealName(record.realName)
              setWechatNum(record.wechatNum)
              setphone(record.phone)
              setsubsidy(record.subsidy)
              setroleId(record.roleId)
              setState(record.state)
              setAccountType(record.accountType)
              setCheckedAreas(record.checkedAreas)
            }}
          >
            编辑
          </Button>
          <Button type="default">查看</Button>
          <Popconfirm
            title="确定删除吗"
            onConfirm={() => {
              del({ userId: record.userId }).then(() => {
                getPerson({ pageSize, total, current }).then((res) => setPersonList(res.data.records))
              })
            }}
            // onCancel={() => {}}
            okText="确定"
            cancelText="取消"
          >
            <Button danger>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  //重置
  const onReset = () => {
    form.resetFields()
  }
  return (
    <div className="channel-list">
      <div className="person-top">
        <h1>人员管理</h1>
      </div>
      <div>
        {/* 顶部 */}
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
      <Button
        type="primary"
        onClick={() => {
          setVisible(true)
        }}
        style={{ marginBottom: '10px' }}
      >
        添加人员
      </Button>
      {/* 添加人员的表单 */}
      <Modal
        width={700}
        title="添加人员"
        onCancel={() => {
          setVisible(false)
        }}
        visible={visible}
      >
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
          <Form.Item name={['person', 'channel']} label="归属渠道">
            <TreeSelect
              treeData={channel}
              value={checkedChannel}
              treeCheckable={true}
              // treeDefaultExpandAll={true}
              style={{ width: '285px' }}
              onChange={(checkedChannel) => {
                setCheckedChannel(checkedChannel)
              }}
              showCheckedStrategy={SHOW_PARENT}
            />
          </Form.Item>
          <Form.Item name={['person', 'leader']} label="上级人员" rules={[{ required: true }]}>
            <Select placeholder="无" options={leader} />
          </Form.Item>
          <Form.Item name={['person', 'address']} label="责任区域" rules={[{ required: true }]}>
            <TreeSelect
              treeData={areas}
              value={checkedAreas}
              treeCheckable={true}
              // treeDefaultExpandAll={true}
              style={{ width: '285px' }}
              onChange={(_, checkedAreas) => {
                setCheckedAreas([...checkedAreas])
              }}
              showCheckedStrategy={SHOW_PARENT}
            />
          </Form.Item>
          <Form.Item name={['person', 'realName']} label="姓名" rules={[{ required: true }]}>
            <Input onChange={(event) => setRealName(event.target.value)} />
          </Form.Item>
          <Form.Item name={['person', 'wechatNum']} label="微信号">
            <Input onChange={(event) => setWechatNum(event.target.value)} />
          </Form.Item>
          <Form.Item name={['person', 'phone']} label="手机号/账号" rules={[{ required: true }]}>
            <Input onChange={(event) => setphone(event.target.value)} />
          </Form.Item>
          <Form.Item name={['person', 'subsidy']} label="定制补贴">
            <Input onChange={(event) => setsubsidy(event.target.value)} placeholder="补贴比例" />
            &nbsp;&nbsp;&nbsp;&nbsp;%
          </Form.Item>
          <Form.Item name={['person', 'accountType']} label="人员类型" rules={[{ required: true }]}>
            <Select allowClear>
              {Object.keys(personType).map((item) => {
                return (
                  <Select.Option key={item} value={item}>
                    {personType[item]}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>
          {/* <Space>权限配置</Space> */}
          <Form.Item name={['person', 'roleId']} label="角色名称" rules={[{ required: true }]}>
            <Select options={roleName} />
          </Form.Item>
          <Form.Item name={['person', 'state']} label="是否启用" rules={[{ required: true }]}>
            <Switch onChange={onChange} defaultChecked={false} />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button htmlType="submit" type="primary" onClick={addPerson}>
              保存
            </Button>
            <Button htmlType="button" onClick={addPerson} style={{ margin: '0 80px' }}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Row gutter={[24, 0]}>
        <Col span={4}>
          <StructureTree structure={structure} onSelectStructure={_onSelectStructure} />
        </Col>
        <Col span={20}>
          <Table
            rowKey="userId"
            columns={columns}
            scroll={{ x: 'max-content' }}
            dataSource={personList}
            pagination={{ onChange: setCurrent, current: current, pageSize: pageSize, total: total }}
          />
        </Col>
      </Row>
      <Modal title="编辑人员信息" visible={isModalVisible} onOk={updatePerson} onCancel={resetForm}>
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
          <Form.Item name={['person', 'channel']} label="归属渠道">
            <TreeSelect
              disabled
              value={channel}
              style={{ width: '285px' }}
              onChange={(checkedChannel) => {
                setCheckedChannel(checkedChannel)
              }}
              showCheckedStrategy={SHOW_PARENT}
            />
          </Form.Item>
          <Form.Item name={['person', 'leader']} label="上级人员" rules={[{ required: true }]}>
            <Select placeholder="无" options={leader} value={supUserId} onChange={(value) => setSupUserId(value)} />
          </Form.Item>
          <Form.Item name={['person', 'address']} label="责任区域" rules={[{ required: true }]}>
            <TreeSelect
              treeData={areas}
              disabled
              value={address}
              treeCheckable={true}
              // treeDefaultExpandAll={true}
              style={{ width: '285px' }}
              onChange={(_, checkedAreas) => {
                setCheckedAreas([...checkedAreas])
              }}
              showCheckedStrategy={SHOW_PARENT}
            />
          </Form.Item>
          <Form.Item name={['person', 'realName']} label="姓名" rules={[{ required: true }]}>
            <Input readOnly disabled value={realName} onChange={(event) => setRealName(event.target.value)} />
          </Form.Item>
          <Form.Item name={['person', 'wechatNum']} label="微信号">
            <Input readOnly disabled value={wechatNum} onChange={(event) => setWechatNum(event.target.value)} />
          </Form.Item>
          <Form.Item name={['person', 'phone']} label="手机号/账号" rules={[{ required: true }]}>
            <Input readOnly disabled value={phone} onChange={(event) => setphone(event.target.value)} />
          </Form.Item>
          <Form.Item name={['person', 'subsidy']} label="定制补贴">
            <Input
              readOnly
              disabled
              value={subsidy}
              onChange={(event) => setsubsidy(event.target.value)}
              placeholder="补贴比例"
            />
            &nbsp;&nbsp;&nbsp;&nbsp;%
          </Form.Item>
          <Form.Item name={['person', 'accountType']} label="人员类型" rules={[{ required: true }]}>
            <Select allowClear value={accountType}>
              {Object.keys(personType).map((item) => {
                return (
                  <Select.Option key={item} value={item}>
                    {personType[item]}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>
          {/* <Space>权限配置</Space> */}
          <Form.Item name={['person', 'roleId']} label="角色名称" rules={[{ required: true }]}>
            <Select options={roleName} value={roleId} />
          </Form.Item>
          <Form.Item name={['person', 'state']} label="是否启用" rules={[{ required: true }]}>
            <Switch onChange={onChange} defaultChecked={false} />
          </Form.Item>
          {/* <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button htmlType="submit" type="primary" onClick={addPerson}>
              保存
            </Button>
            <Button htmlType="button" onClick={addPerson} style={{ margin: '0 80px' }}>
              提交
            </Button>
          </Form.Item> */}
        </Form>
      </Modal>
    </div>
  )
}

export default PersonnelManagement
