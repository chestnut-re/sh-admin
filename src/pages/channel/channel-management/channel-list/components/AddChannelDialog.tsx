/*
 * @Description: 添加渠道
 * @LastEditTime: 2022-02-08 15:12:30
 */

import { Form, Input, Modal, Cascader, Switch, message, Button } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import {
  cityDispose,
  analysisName,
  analysisNameDuo,
  analysisIdDuo,
  lastOneJoin,
  arrayNameJoin,
  regionsCodeArray,
} from '@/utils/tree'
import { formateTime } from '@/utils/timeUtils'
import ChannelService from '@/service/ChannelService'
interface Props {
  data: any
  mode: any
  channelId: any
  structure: Array<any>
  show: boolean
  onSuccess: () => void
  onClose: () => void
}
/**
 * 添加&编辑 暂时堆积 后期
 */
const AddUserDialog: FC<Props> = ({ data, mode, channelId, structure, show = false, onSuccess, onClose }) => {
  const [form] = Form.useForm()
  const [area, setArea] = useState<Array<any>>([])
  const [level, setLevel] = useState(1)
  const [nameDefault, setNameDefault] = useState('')
  const [value, setValue] = useState<Array<any>>([])
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
          structureId: [data?.id],
          name: data?.name,
          person: data?.person,
          regions: data?.regions ? regionsCodeArray(data?.regions, propArea) : null,
          regionsName: data?.regionsName,
          phoneNumber: data?.phoneNumber,
          hotLine: data?.hotLine,
          // state: data?.state == 1 ? true : false,
          isOpenAccount: data?.isOpenAccount == 1 ? true : false,
          createTime: formateTime(data?.createTime),
          createUserName: data?.createUserName,
        })
      })
    } else {
      form.resetFields()

      // console.log(regionsCodeArray(structure, channelId, 'children', 'id', 'pid'))

      form.setFieldsValue({
        // state: true,
        isOpenAccount: false,
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

  const tagRender = (labels, selectedOptions) => {
    console.log()
    const dataAreas = area.find((res) => res.adcode == labels.value)
    if (!dataAreas) {
      return <>{labels.label + ','}</>
    } else {
      const valueData = dataAreas.areas.map((resC) => {
        console.log(resC, 'resC')
        return resC.name
      })
      return <>{valueData.join(',')+' ,'}</>
    }
  }

  /**提交数据 */
  const _handleUpdate = async () => {
    form
      .validateFields()
      .then((formData) => {
        const postData = { ...formData }
        postData.regions = lastOneJoin(formData.regions)
        postData.regionsName = arrayNameJoin(formData.regions, area)
        // postData.state = formData.state ? 1 : 0
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
          delete putData.createTime
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
    for (let index = 0; index < data.length; index++) {
      const element = data[index]
      if (data[index].length < 2) {
        const child = area.find((res) => res.adcode == element[0])['areas']
        const newList = child.map((res) => {
          return [element, res.adcode]
        })
        data.splice(index, 1, ...newList)
      }
    }
  }
  const changeStructure = (e, data) => {
    setLevel(data[data.length - 1]?.level)
    form.setFieldsValue({
      id: e[e.length - 1],
      level: data[data.length - 1]?.level,
    })
    // 暂时堆积 后期
    ChannelService.getCurrentChannelRegions(e[e.length - 1]).then((res) => {
      ChannelService.getProvinceCity({'adcodes':res?.data}).then((res) => {
        setArea(cityDispose(res?.data, 'areas'))
        setValue([])
      })
    })
  }

  const type = { add: '创建渠道', edit: '编辑渠道', see: '查看渠道' }
  return (
    <Modal
      title={type[mode]}
      visible={show}
      onCancel={_formClose}
      footer={
        mode == 'see'
          ? [
              <Button key="submit" type="primary" onClick={_formClose}>
                确定
              </Button>,
            ]
          : [
              <Button key="back" onClick={_formClose}>
                取消
              </Button>,
              <Button key="submit" type="primary" onClick={_handleUpdate}>
                确定
              </Button>,
            ]
      }
    >
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
              disabled={mode == 'see'}
              options={structure}
              changeOnSelect
              fieldNames={{ label: 'name', value: 'id', children: 'children' }}
              onChange={changeStructure}
            />
          ) : (
            <div>{nameDefault}</div>
          )}
        </Form.Item>
        <Form.Item
          label="渠道名称"
          name="name"
          rules={[
            { required: true, message: '请输入' },
            { max: 20, message: '最大不可超过20个字符' },
          ]}
        >
          <Input disabled={mode == 'see'} />
        </Form.Item>
        <Form.Item label="责任区域" name="regions" rules={[{ required: true, message: '请输入' }]}>
          <Cascader
            options={area}
            onChange={casOnChange}
            multiple
            tagRender={tagRender}
            disabled={mode == 'see'}
            fieldNames={{ label: 'name', value: 'adcode', children: 'areas' }}
          />
        </Form.Item>
        <Form.Item
          label="责任人姓名"
          name="person"
          rules={[
            { required: true, message: '请输入' },
            { max: 10, message: '最大不可超过20个字符' },
          ]}
        >
          <Input disabled={mode == 'see' || mode=='edit'} />
        </Form.Item>
        <Form.Item
          label="手机号"
          name="phoneNumber"
          rules={[
            { required: true, message: '请输入' },
            { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' },
          ]}
        >
          <Input disabled={mode == 'see' || mode=='edit'} />
        </Form.Item>
        <Form.Item
          label="渠道账户"
          style={{ display: (level == 2 && mode != 'add') || (level == 1 && mode == 'add') ? 'flex' : 'none' }}
        >
          渠道账户为手机号
          {/* <Switch disabled={mode == 'see'} defaultChecked={!!data?.isOpenAccount} /> */}
        </Form.Item>
        <Form.Item
          label="客服热线"
          name="hotLine"
          rules={[{ required: (level == 2 && mode != 'add') || (level == 1 && mode == 'add'), message: '请输入' }]}
          style={{ display: (level == 2 && mode != 'add') || (level == 1 && mode == 'add') ? 'flex' : 'none' }}
        >
          <Input disabled={mode == 'see'} />
        </Form.Item>

        {/* <Form.Item label="是否开启" name="state">
          <Switch defaultChecked={!!data?.state} />
        </Form.Item> */}

        <Form.Item
          label="level"
          name="level"
          rules={[{ required: true, message: '请输入' }]}
          style={{ visibility: 'hidden', height: 0 }}
        >
          <Input disabled={mode == 'see'} />
        </Form.Item>
        {mode == 'add' ? (
          <></>
        ) : (
          <>
            <Form.Item label="创建人" name="createUserName">
              <Input disabled />
            </Form.Item>
            <Form.Item label="创建时间" name="createTime">
              <Input disabled />
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  )
}
export default AddUserDialog
