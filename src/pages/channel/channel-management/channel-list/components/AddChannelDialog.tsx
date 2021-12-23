/*
 * @Description: 添加渠道
 * @LastEditTime: 2021-12-22 18:17:13
 */

import { createUser, editUser } from '@/service/user'
import { Form, Input, Modal, Select, Cascader } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { cityDispose, analysisName, lastOneJoin,arrayNameJoin } from '@/utils/city'
import ChannelService from '@/service/ChannelService'
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
  const [selectedRoles, setSelectedRoles] = useState<Array<any>>([])
  const [area, setArea] = useState<Array<any>>([])

  useEffect(() => {
    if (show) {
      getProvinceCity()
      console.log(structure, 'structure')
    }
  }, [show])

  useEffect(() => {
    form.setFieldsValue({
      id: data?.id,
      name: data?.name,
      person: data?.person,
      regions: data?.regions,
      regionsName: data?.regionsName,
      phoneNumber: data?.phoneNumber,
      platform: data?.platform,
      hotLine: data?.hotLine,
      // password: data?.pwd,
      // roles: data?.roles,
    })
  }, [show])
  /**
   * @description: 负责区域
   */
  const getProvinceCity = () => {
    ChannelService.getProvinceCity().then((res) => {
      setArea(cityDispose(res?.data, 'areas'))
    })
  }

  /**提交数据 */
  const _handleUpdate = async () => {
 
    form
      .validateFields()
      .then((formData) => {
        if (mode === 'add') {
          // create
          const postData = { ...formData }
  
          postData.region = lastOneJoin(formData.region)
          postData.regionsName = arrayNameJoin(formData.region,area)
  
          
          ChannelService.add(postData).then((res) => {
            if (res.code === 200) {
              onSuccess()
            }
          })
        } else {
          const postData = {
            ...formData,
            id: data?.id,
          }
          // editUser(postData).then((res) => {
          //   if (res.code === 200) {
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
  const casOnChange = (data) => {
    data.map((items, index, arr) => {
      if (items.length < 2) {
        arr[index].push(area.find((res) => res.adcode == items[0]).areas[0].adcode)
      }
    })
  }
  const changeStructure = (e) => {
    console.log(e[e.length - 1], 'xxx')
    form.setFieldsValue({
      id: e[e.length - 1],
    })
  }

  return (
    <Modal title={mode == 'add' ? '创建渠道' : '渠道详情'} visible={show} onOk={_handleUpdate} onCancel={_formClose}>
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
        <Form.Item label="分中心名称" name="name" rules={[{ required: true, message: '请输入' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="责任区域" name="region" rules={[{ required: true, message: '请输入' }]}>
          <Cascader
            options={area}
            onChange={casOnChange}
            multiple
            fieldNames={{ label: 'name', value: 'adcode', children: 'areas' }}
          />
        </Form.Item>
        <Form.Item label="责任人姓名" name="person" rules={[{ required: true, message: '请输入' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="手机号" name="phoneNumber" rules={[{ required: true, message: '请输入' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="归属渠道" name="id" rules={[{ required: true, message: '请输入' }]}>
          <Cascader
            options={structure}
            changeOnSelect
            fieldNames={{ label: 'name', value: 'id', children: 'children' }}
            onChange={changeStructure}
          />
          ,
        </Form.Item>
        <Form.Item label="客服热线" name="password" rules={[{ required: true, message: '请输入' }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddUserDialog
