import { add, edit, getAreas, getPerson, getRoles, getStructure, getSubordinate } from '@/service/PersonService'
import { Button, Cascader, Form, Input, InputNumber, Select, Space, Switch } from 'antd'
import React, { useEffect, useState } from 'react'
// import { cityDispose } from '@/utils/city'
import Prefecture from './Prefecture'
import { personType } from '@/utils/enum'

export type DialogMode = 'add' | 'edit'

interface Props {
  data: any
  mode: DialogMode
  structure: Array<any>
  show: boolean
  onSuccess: () => void
  onClose: () => void
}
const FromData: React.FC<Props> = ({ data, mode, structure, show = false, onSuccess, onClose }) => {
  const [leader, setLeader] = useState([])
  // const [channelId, setChannelId] = useState('1')
  const [state, setState] = useState([])
  const [form] = Form.useForm()
  const [roleName, setRoleName] = useState([])
  const [area, setArea] = useState<Array<any>>([])
  useEffect(() => {
    // getStructure().then((res) => {
    // setChannelId(res.data.id)
    // getSubordinate({ channelId: res.data.id }).then((res) => {
    //   setLeader(res.data.username)
    // })
    // })
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
      console.log(res.data.data)
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
      <Form {...layout} name="nest-messages" size="large" onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item name={['person', 'channel']} label="归属渠道">
          <Input placeholder="渠道名称" onChange={onInput} />
        </Form.Item>
        <Form.Item name={['person', 'leader']} label="上级人员" rules={[{ required: true }]}>
          <Select placeholder="无" options={leader} />
        </Form.Item>
        <Form.Item name={['person', 'prefecture']} label="责任区域" rules={[{ required: true }]}>
          {/* <Prefecture props={undefined} /> */}
        </Form.Item>
        <Form.Item name={['person', 'userName']} label="姓名" rules={[{ required: true }]}>
          <Input
            onChange={(event) => {
              event.target.value
            }}
          />
        </Form.Item>
        <Form.Item name={['person', 'weChat']} label="微信号">
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
        <Space>权限配置</Space>
        <Form.Item name={['person', 'roleName']} label="角色名称" rules={[{ required: true }]}>
          <Select options={roleName} />
        </Form.Item>
        <Form.Item name={['person', 'switch']} label="是否启用" rules={[{ required: true }]}>
          <Switch onChange={onChange} defaultChecked={false} />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button htmlType="submit" type="primary">
            保存
          </Button>
          <Button htmlType="button" style={{ margin: '50px 80px' }}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default FromData
