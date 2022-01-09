import { Form, Input, Modal, DatePicker, Row, Col, InputNumber, Switch, Select, TreeSelect, Cascader } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { DialogMode, personType } from '@/utils/enum'
import RoleSelect from '@/components/formItem/RoleSelect'
import ChannelService from '@/service/ChannelService'
import { CommonService } from '@/service/CommonService'
import { ContactsCenterApi } from '@/service/ContactsCenter'
import { PersonService } from '@/service/PersonService'
import { cityDispose, lastOneJoin } from '@/utils/tree'
import { HttpCode } from '@/constants/HttpCode'
import Item from 'antd/lib/list/Item'

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
    console.log('datadatadatadatadata :>> ', data);

    if (mode!='add') {
      form.setFieldsValue({
          userId: data?.userId,
          channel: findParentNodeArray(leader,"1475343300440576000").map((item)=>item.id),
          state: true,
        })
    }else{
      form.resetFields()
    }
  
  }, [show])


  //根据子节点查找所有父节点数据
  const findParentNodeArray = (array, parentSubjectCode)=> {

    console.log('array, parentSubjectCode :>> ', array, parentSubjectCode);
      const parentSubjectStock = [] // 存储父节点
      let going = true // 是否已找到要查到的节点
      const findParentNode = function(array, code) {
        console.log('array, code :>> ', array, code);
         array.forEach(item => {
              if(!going) { return }
              parentSubjectStock.push(item)
              if(item.id === code) {
                  going = false
              } else if(item.children) {
                  findParentNode(item.children, code)
              } else {
                 parentSubjectStock.pop() 
              }
             })
          if(going) parentSubjectStock.pop() 
      }
      findParentNode(array, parentSubjectCode)
      return parentSubjectStock
  }


  //获取渠道数据
  const getLeaders = async () => {
    const { code, data } = await CommonService.getStructure()
        if (code==="200"&&data) {
          setLeader([data])
        }
     }
  //根据渠道id获取 渠道下的人员
  const getUserList = async (channelId) => {
    const { code, data } = await ContactsCenterApi.userList({ channelId: channelId })
    console.log('res :>> ', data)
    if (code === '200' && data) {
      let resList = data.map((item) => {
        return {
          value: item.id,
          label: item.name,
        }
      })
      resList = [{ value: '1478239342974685200', label: '邢浩' }]
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
          ContactsCenterApi.edit({ ...formData, id: data.id }).then((res) => {
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
    <Modal title="添加客服" forceRender maskClosable={false} visible={show} onOk={_handleUpdate} onCancel={_formClose}>
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
            }}
            placeholder="请选择所属渠道"
            onDropdownVisibleChange={onSelectHandel}
            changeOnSelect
          />
        </Form.Item>
        <Form.Item label="选择客服" name="userId" rules={[{ required: true, message: '请选择' }]}>
          <Select style={{ width: '100%' }} placeholder="请选择客服人员" options={userLists} />
        </Form.Item>
        <Form.Item name="state" valuePropName="checked" label="是否启用">
          <Switch checked={false} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AEDialog
