/*
 * @Description: 添加角色
 * @LastEditTime: 2022-01-12 13:57:33
 */

import { Form, Input, Modal, Cascader, Switch, message } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { cityDispose, analysisName, lastOneJoin, arrayNameJoin, regionsCodeArray } from '@/utils/tree'
import RoleService from '@/service/RoleService'
import TableMenu from './TableMenu'
export type DialogMode = 'add' | 'edit'
interface Props {
  data: any
  mode: DialogMode
  structure: Array<any>
  show: boolean
  onSuccess: () => void
  onClose: () => void
}
/**
 * 添加&编辑
 */
const AddUserDialog: FC<Props> = ({ data, mode, structure, show = false, onSuccess, onClose }) => {
  const [form] = Form.useForm()
  const [datachannel, setChannel] = useState({
    channelId: '',
    channelName: '',
  })
  const [roleList, setRoleList] = useState([])
  const [bType, setBType] = useState(false)
  const [adminType, setAdminType] = useState(false)
  const [stateCheckout,setCheckout] = useState(false)
  useEffect(() => {
    if (show) {
      if (!!data?.id == true) {
        RoleService.get({
          roleId: data?.id,
        }).then((res) => {
          const data = res?.data
          setAdminType(data?.authorityPlatform.indexOf(1) == -1 ? true : false)
          setBType(data?.authorityPlatform.indexOf(0) == -1 ? true : false)
          setRoleList(data?.menuIdList)
          setChannel({
            channelId: data?.channelId,
            channelName: data?.channelName,
          })
          form.setFieldsValue({
            remark: data?.remark,
            structureId: data?.channelId,
            channelName: data?.channelName,
            state: data?.state == 0 ? true : false,
            roleName: data?.roleName,
          })
          setCheckout(data?.state == 0 ? true : false)
        })
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  /**提交数据 */
  const _handleUpdate = async () => {
    form
      .validateFields()
      .then((formData) => {
        const postData = { ...formData, ...datachannel }
        delete postData.structureId
        postData.state = formData.state == true ? 0 : 1
        postData.menuIdList = roleList
        postData.authorityPlatform = []
        bType == true ? postData.authorityPlatform.push(0) : undefined,
          adminType == true ? postData.authorityPlatform.push(1) : undefined
        postData.authorityPlatform = postData.authorityPlatform.join(',')
        if (mode === 'add') {
          RoleService.add(postData).then((res) => {
            if (res.code == 200) {
              message.success('角色创建成功')
              setTimeout(() => {
                onSuccess()
              }, 500)
            } else {
              message.error('角色创建失败，请重试')
            }
          })
        } else {
          const putData = {
            ...postData,
            id: data?.id,
          }
          delete putData.structureId
          RoleService.edit(putData).then((res) => {
            if (res.code == 200) {
              message.success('角色编辑成功')
              setTimeout(() => {
                onSuccess()
              }, 500)
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

  const changeStructure = (e, data) => {
    setChannel({
      channelId: e[e.length - 1],
      channelName: data.map((res) => res.name).join('-'),
    })
  }
  const _getFucValue = (e) => {
    setRoleList(e)
  }
  const _setAdminType = (e) => {
    setAdminType(e)
  }
  const _setBType = (e) => {
    setBType(e)
  }
  return (
    <Modal title={mode == 'add' ? '创建角色' : '角色详情'} width={700} visible={show} onOk={_handleUpdate} onCancel={_formClose}>
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={(values: any) => {
          console.log(values)
        }}
        onFinishFailed={(errorInfo: any) => {
          console.log(errorInfo)
        }}
        autoComplete="off"
        form={form}
      >
        <Form.Item label="所属渠道" name="structureId" rules={[{ required: true, message: '请输入' }]}>
          {mode == 'add' ? (
            <Cascader
              options={structure}
              changeOnSelect
              fieldNames={{ label: 'name', value: 'id', children: 'children' }}
              onChange={changeStructure}
            />
          ) : (
            // <Input defaultValue={data?.channelName} />
            <div>{data?.channelName}</div>
          )}
        </Form.Item>
        <Form.Item label="角色名称" name="roleName" rules={[{ required: true, message: '请输入' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="角色描述" name="remark" rules={[{ required: true, message: '请输入' }]}>
          <Input />
        </Form.Item>

        {/* <Form.Item label="角色状态" name="state">
          <Switch checked={stateCheckout} onChange={setCheckout}  /> 
        </Form.Item> */}

        <TableMenu
          adminType={adminType}
          getFucValue={_getFucValue}
          _setAdminType={_setAdminType}
          _setBType={_setBType}
          bType={bType}
          datachannel={datachannel}
          roleList={roleList}
        ></TableMenu>
      </Form>
    </Modal>
  )
}
export default AddUserDialog
