import { Form, Input, Modal, DatePicker, Row, Col, InputNumber, Switch, Select, TreeSelect, Cascader } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { DialogMode, personType } from '@/utils/enum'
import RoleSelect from '@/components/formItem/RoleSelect'
import { PersonService } from '@/service/PersonService'
import { cityDispose,lastOneJoin } from '@/utils/tree'
import { HttpCode } from '@/constants/HttpCode'
import AreaSelect from '@/components/formItem/AreaSelect'

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
const AEDialog: FC<Props> = ({ data, mode, show = false, onSuccess, onClose }) => {
  const [form] = Form.useForm()
  const [structure, setStructure] = useState<any[]>([])
  const [leader, setLeader] = useState<any[]>([])
  const [channelId, setChannelId] = useState<string>('')
  const [level, setLevel] = useState<number>(0)
  useEffect(() => {
    getChannel()
  }, [])

  // const changeStructure = (e, data) => {
  //   setLevel(data[data.length - 1]?.level)
  //   form.setFieldsValue({
  //     id: e[e.length - 1],
  //     level: data[data.length - 1]?.level,
  //   })
  // }

  useEffect(() => {
    getLeaders()
    form.setFieldsValue({
      supUserId: undefined,
      roleId: undefined,
    })
  }, [channelId])

  const getLeaders = async () => {
    if (!channelId) return
    const res = await PersonService.getSubordinate(channelId)
    const resList = res.data.map((item) => {
      return {
        value: item.userId,
        label: item.userName,
      }
    })

    // console.log(,'---')
    setLeader([
      {
        value: undefined,
        label: '无',
      },
      ...resList,
    ])
  }

  /**
   * 请求渠道名称
   */
  const getChannel = () => {
    PersonService.getStructure().then((res) => {
      const data = cityDispose([res?.data], 'children')
      const str = data[0]['level'] == 1 ? data[0]['children'] : data
      console.log(str)
      setStructure(str)
    })
  }

  useEffect(() => {
    form.setFieldsValue({
      planName: data?.planName,
      saleScale: data?.saleScale,
      state: true,
      channelPlanList: data?.channelPlanList.map((item, index) => {
        item.key = `${Date.now()}-${index}`
        return item
      }),
    })
  }, [show])

  /**提交数据 */
  const _handleUpdate = async () => {
    form
      .validateFields()
      .then((formData) => {
        console.log(formData)
        if (mode === 'add') {
          const params = { ...formData }
          params.state = params.state ? 1 : 0
          delete params.channel
          params.address = lastOneJoin(formData.address)
          PersonService.add({ ...params }).then((res) => {
            if (res.code === HttpCode.success) {
              onSuccess()
            }
          })
        } else {
          // ProductionCommission.edit({ ...formData, id: data.id }).then((res) => {
          //   if (res.code === HttpCode.success) {
          //     onSuccess()
          //   }
          // })
        }
      })
      .catch((e) => {
        console.error(e)
      })
  }

  const _formClose = () => {
    form.resetFields()
    onClose()
  }

  /**渠道修改了 */
  const changeStructure = (e, data) => {
    console.log(e, data)
    setLevel(data[data.length - 1]?.level)
    if (e.length > 0) {
      setChannelId(e[e.length - 1])
    }
  }
  const _changeRoleSelect = (e) => {
    console.log(e)
  }
  const _onChangeAddress=(e)=>{
    form.setFieldsValue({
      address:e
    })
  }
  return (
    <Modal title="添加人员" visible={show} onOk={_handleUpdate} onCancel={_formClose}>
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        form={form}
      >
        <Form.Item label="归属渠道" name="channel" rules={[{ required: true, message: '设置渠道' }]}>
          <Cascader
            options={structure}
            changeOnSelect
            fieldNames={{ label: 'name', value: 'id', children: 'children' }}
            onChange={changeStructure}
          />
        </Form.Item>
        {level == 1 ? (
          ``
        ) : (
          <Form.Item name="supUserId" label="上级人员" rules={[{ required: false }]}>
            <Select placeholder="无" options={leader} />
          </Form.Item>
        )}

        <Form.Item label="责任区域" name="address" rules={[{ required: true, message: '请选择' }]}>
          <AreaSelect channelId={channelId} onChange={_onChangeAddress} />
        </Form.Item>

        <Form.Item name="realName" label="姓名" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="wechatNum" label="微信号">
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="手机号/账号" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="subsidy" label="定制补贴">
          <InputNumber placeholder="补贴比例" value={data?.saleSettleDay} addonAfter="%" style={{ width: 160 }} />
        </Form.Item>
        <Form.Item name="accountType" label="人员类型" rules={[{ required: true }]}>
          <Select allowClear>
            {Object.keys(personType).map((item) => {
              return (
                <Select.Option key={item} value={item} disabled={item == '0'}>
                  {personType[item]}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>
        <Form.Item name="roleId" label="角色名称" rules={[{ required: false }]}>
          <RoleSelect channelId={channelId} onChange={_changeRoleSelect} value={form.getFieldValue('roleId')} />
        </Form.Item>
        <Form.Item name="state"  valuePropName="checked" label="是否启用"  rules={[{ required: true }]}>
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AEDialog
