import { Form, Modal, Switch, Select, Cascader } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { DialogMode, personType } from '@/utils/enum'
import { CommonService } from '@/service/CommonService'
import { ContactsCenterApi } from '@/service/ContactsCenter'
import { HttpCode } from '@/constants/HttpCode'

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
  const [structure, setStructure] = useState<any>(null)
  const [leader, setLeader] = useState<any[]>([])
  const [userLists, setUserLists] = useState<any[]>([])
  useEffect(() => {
    getLeaders()
  }, [])

  useEffect(() => {
    console.log('datadatadatadatadata :>> ', data)

    if (mode != 'add' && show) {
      getContactsDateil(data.id)
    } else {
      form.resetFields()
    }
  }, [show])

  // useEffect(()=>{
  //   form.resetFields(["userId"])
  // },[structure])

  const getContactsDateil = (id) => {
    ContactsCenterApi.detail({ id })
      .then((res) => {
        const { code, data } = res
        console.log('res 详情数据:>> ', res)

        if (code === '200' && data) {
          const { userId, channelId, state, channelName } = data
          getUserList(channelId)
          form.setFieldsValue({
            userId: userId,
            channel: findParentNodeArray(leader, channelId).map((item) => item.id),
            state: state ? true : false,
          })
          setStructure({
            name: channelName,
            id: channelId,
          })
        }
      })
      .catch((err) => {
        console.log('err :>> ', err)
      })
  }

  //根据子节点查找所有父节点数据
  const findParentNodeArray = (array, parentSubjectCode) => {
    console.log('array, parentSubjectCode :>> ', array, parentSubjectCode)
    const parentSubjectStock = [] // 存储父节点
    let going = true // 是否已找到要查到的节点
    const findParentNode = function (array, code) {
      console.log('array, code :>> ', array, code)
      array.forEach((item) => {
        if (!going) {
          return
        }
        parentSubjectStock.push(item as never)
        if (item.id === code) {
          going = false
        } else if (item.children) {
          findParentNode(item.children, code)
        } else {
          parentSubjectStock.pop()
        }
      })
      if (going) parentSubjectStock.pop()
    }
    findParentNode(array, parentSubjectCode)
    return parentSubjectStock
  }

  //获取渠道数据
  const getLeaders = async () => {
    const { code, data } = await CommonService.getStructure()
    if (code === '200' && data) {
      setLeader([data])
    }
  }
  //根据渠道id获取 渠道下的人员
  const getUserList = async (channelId) => {
    const { code, data } = await ContactsCenterApi.userList({ channelId: channelId })
    console.log('res :>> ', data)
    if (code === '200' && data) {
      const resList = data.map((item) => {
        return {
          value: item.id,
          label: item.name ? item.name : '未知',
        }
      })
      setUserLists(resList)
    }
  }

  /**提交数据 */
  const _handleUpdate = async () => {
    form
      .validateFields()
      .then((formData) => {
        console.log(formData)
        const { userId, state } = formData
        const { name, id } = structure
        console.log('structure :>> ', structure)

        const params = {
          userId: userId,
          channelId: id,
          channelName: name,
          state: state ? 1 : 0,
        }

        if (mode === 'add') {
          ContactsCenterApi.add(params).then((res) => {
            if (res.code === HttpCode.success) {
              onSuccess()
            }
          })
        } else {
          ContactsCenterApi.edit({ ...params, id: data.id }).then((res) => {
            if (res.code === HttpCode.success) {
              onSuccess()
            }
          })
        }
      })
      .catch((e) => {
        console.error(e)
      })
  }

  //关闭弹窗，清空表单数据
  const _formClose = () => {
    form.resetFields()
    onClose()
  }

  //渠道改变回调
  const onSelectHandel = (val) => {
    if (!val && structure) {
      const { id } = structure
      getUserList(id)
    }
  }

  return (
    <Modal
      title={mode === 'add' ? '添加客服' : '修改客服'}
      forceRender
      maskClosable={false}
      visible={show}
      onOk={_handleUpdate}
      onCancel={_formClose}
    >
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        form={form}
      >
        <Form.Item label="所属渠道" name="channel" rules={[{ required: true, message: '设置渠道' }]}>
          <Cascader
            options={leader}
            fieldNames={{ label: 'name', value: 'id', children: 'children' }}
            onChange={(_, selectedOptions) => {
              console.log('_,selectedOptions :>> ', _, selectedOptions)
              setStructure(selectedOptions[selectedOptions.length - 1])
              form.resetFields(['userId'])
            }}
            placeholder="请选择所属渠道"
            onDropdownVisibleChange={onSelectHandel}
            changeOnSelect
          />
        </Form.Item>
        <Form.Item label="选择客服" name="userId" rules={[{ required: true, message: '请选择客服人员' }]}>
          <Select style={{ width: '100%' }} placeholder="请选择客服人员" options={userLists} />
        </Form.Item>
        <Form.Item name="state" valuePropName="checked" label="是否启用">
          <Switch checkedChildren="启用" unCheckedChildren="禁用" checked={false} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AEDialog
