import { add, getAreas, getPerson, getRoles, getStructure, getSubordinate } from '@/service/PersonService'
import { Button, Form, Input, InputNumber, message, Select, Space, Switch, TreeSelect } from 'antd'
import React, { useEffect, useState } from 'react'
import { personType } from '@/utils/enum'

const FromData: React.FC = () => {
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
  const [state, setstate] = useState('')
  const [accountType, setAccountType] = useState(0)
  /**
   * 添加人员
   */
  // const addPerson = () => {
  //   const data = {
  //     address,
  //     supUserId,
  //     realName,
  //     wechatNum,
  //     phone,
  //     subsidy,
  //     roleId,
  //     state,
  //     accountType,
  //   }
  //   add(data).then((res) => {
  //     if (res.data.code === '10004') {
  //       message.warning('该人员已存在')
  //     } else {
  //       setAddress('')
  //       setSupUserId(1)
  //       setRealName('')
  //       setWechatNum('')
  //       setphone('')
  //       setsubsidy('')
  //       setroleId(1)
  //       setstate('')
  //       setAccountType(0)
  //       setCheckedAreas([])
  //       // setVisible(false)
  //       getPerson().then((res) => setPersonList(res.data))
  //     }
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
    // getStructure().then((res) => {
    // setChannelId(res.data.id)
    // getSubordinate({ channelId: res.data.id }).then((res) => {
    //   setLeader(res.data.username)
    // })
    // })
    getChannel()
    getProvinceCity()
    getSubordinate({ channelId: 1 }).then((res) => {
      // console.log(res)
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
  const validateMessages = {
    required: '请填写${label}!',
    number: { range: '${0} must be between ${0} and ${100}' },
  }
  const onFinish = (values: any) => {
    console.log(values)
  }
  const onChange = (checked) => {
    console.log(`switch to ${checked}`)
    // if ((checked = true)) {
    //   return (state = '1')
    // } else {
    //   return (state = '2')
    // }
  }
  const onInput = (event) => {
    event.target.value
  }
  return (
    <div>
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
            onChange={(checkedAreas) => {
              setCheckedAreas(checkedAreas)
            }}
            showCheckedStrategy={SHOW_PARENT}
          />
        </Form.Item>
        <Form.Item name={['person', 'realName']} label="姓名" rules={[{ required: true }]}>
          <Input
            onChange={(event) => {
              event.target.value
            }}
          />
        </Form.Item>
        <Form.Item name={['person', 'wechatNum']} label="微信号">
          <Input onChange={onInput} />
        </Form.Item>
        <Form.Item name={['person', 'phone']} label="手机号/账号" rules={[{ required: true }]}>
          <Input onChange={onInput} />
        </Form.Item>
        <Form.Item name={['person', 'subsidy']} label="定制补贴">
          <InputNumber onChange={onInput} />
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
          <Button htmlType="submit" type="primary">
            保存
          </Button>
          <Button htmlType="button" style={{ margin: '0 80px' }}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default FromData
