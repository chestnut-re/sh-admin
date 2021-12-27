/*
 * @Description: 添加渠道
 * @LastEditTime: 2021-12-26 15:47:07
 */

import { Form, Input, Modal, Cascader, Switch, message } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { cityDispose, analysisName, analysisNameDuo,lastOneJoin, arrayNameJoin, regionsCodeArray } from '@/utils/tree'
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
  const [area, setArea] = useState<Array<any>>([])
  const [level, setLevel] = useState(1)
  const [nameDefault, setNameDefault] = useState('')
  useEffect(() => {
    if (show) {
      getProvinceCity()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])
  /**
   * @description: 回显数据
   */
  const getDetail = (propData, propArea) => {
    const dataId = propData?.id
    if (!dataId === false) {
      ChannelService.get(dataId).then((res) => {
        const data = res.data
        setNameDefault(analysisNameDuo(structure, data?.id, 'children', 'id', 'pid'))
        setLevel(data?.level)
        form.setFieldsValue({
          level: data?.level,
          structureId: data?.id,
          name: data?.name,
          person: data?.person,
          regions: data?.regions ? regionsCodeArray(data?.regions, propArea) : null,
          regionsName: data?.regionsName,
          phoneNumber: data?.phoneNumber,
          hotLine: data?.hotLine,
          state: data?.state == 1 ? true : false,
          isOpenAccount: data?.isOpenAccount == 1 ? true : false,
        })
      })
    } else {
      form.setFieldsValue({
        state: true,
        isOpenAccount: true,
      })
    }
  }
  /**
   * @description: 负责区域
   */
  const getProvinceCity = async () => {
    ChannelService.getProvinceCity().then((res) => {
      setArea(cityDispose(res?.data, 'areas'))
      getDetail(data, res?.data)
    })
  }

  /**提交数据 */
  const _handleUpdate = async () => {
    form
      .validateFields()
      .then((formData) => {
        console.log(formData, '999999')
        const postData = { ...formData }
        postData.regions = lastOneJoin(formData.regions)
        postData.regionsName = arrayNameJoin(formData.regions, area)
        postData.state = formData.state ? 1 : 0
        postData.isOpenAccount = formData.isOpenAccount ? 1 : 0
        if (mode === 'add') {
          postData.id = formData.structureId[formData.structureId.length - 1]
          delete postData.structureId
          ChannelService.add(postData).then((res) => {
            if (res.code == 200) {
              message.success('渠道创建成功')
              setTimeout(() => {
                onSuccess()
              }, 500)
            } else {
              message.error('渠道创建失败，请重试')
            }
          })
        } else {
          const putData = {
            ...postData,
            id: data?.id,
          }
          delete putData.structureId
          ChannelService.edit(putData).then((res) => {
            if (res.code == 200) {
              message.success('渠道编辑成功')
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
  const casOnChange = (data: any[]) => {
    data.map((items, index, arr) => {
      if (items.length < 2) {
        arr[index].push(area.find((res) => res.adcode == items[0]).areas[0].adcode)
      }
    })
  }
  const changeStructure = (e, data) => {
    console.log(data, '---')
    setLevel(data[data.length - 1]?.level)
    form.setFieldsValue({
      id: e[e.length - 1],
      level: data[data.length - 1]?.level,
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
        <Form.Item label="归属渠道" name="structureId" rules={[{ required: true, message: '请输入' }]}>
          {mode == 'add' ? (
            <Cascader
              options={structure}
              changeOnSelect
              fieldNames={{ label: 'name', value: 'id', children: 'children' }}
              onChange={changeStructure}
            />
          ) : (
            <div>{nameDefault}</div>
          )}
        </Form.Item>
        <Form.Item label="分中心名称" name="name" rules={[{ required: true, message: '请输入' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="责任区域" name="regions" rules={[{ required: true, message: '请输入' }]}>
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
        <Form.Item label="渠道账户" name="isOpenAccount" style={{ display: level == 1 ? 'flex' : 'none' }}>
          <Switch defaultChecked={!!data?.isOpenAccount} />
        </Form.Item>
        <Form.Item
          label="客服热线"
          name="hotLine"
          rules={[{ required: level == 1, message: '请输入' }]}
          style={{ display: level == 1 ? 'flex' : 'none' }}
        >
          <Input />
        </Form.Item>

        <Form.Item label="是否开启" name="state">
          <Switch defaultChecked={!!data?.state} />
        </Form.Item>

        <Form.Item
          label="level"
          name="level"
          rules={[{ required: true, message: '请输入' }]}
          style={{ visibility: 'hidden', height: 0 }}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default AddUserDialog
