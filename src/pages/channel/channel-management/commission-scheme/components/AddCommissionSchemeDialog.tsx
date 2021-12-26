/*
 * @Description: 添加分佣方案
 * @LastEditTime: 2021-12-26 17:21:54
 */

import { Form, Input, Modal, Cascader, message, Row, Col ,InputNumber} from 'antd'
import React, { FC, useEffect, useState } from 'react'
import {  analysisName,  } from '@/utils/tree'
import ChannelService from '@/service/ChannelService'
export type DialogMode = 'add' | 'edit'
interface Props {
  data: any
  mode: DialogMode
  structure: Array<any>
  show: boolean
  ranked: any
  onSuccess: () => void
  onClose: () => void
}
/**
 * 添加&编辑
 */
const AddCommissionSchemeDialog: FC<Props> = ({ data, mode, structure, show = false, onSuccess, onClose }) => {
  const [form] = Form.useForm()
  // const [area, setArea] = useState<Array<any>>([])
  const [level, setLevel] = useState(1)
  const [nameDefault, setNameDefault] = useState('')
  const [channelDistAuth, setChannelDistAuth] = useState([])
  useEffect(() => {
    if (show) {
      if (mode == 'add') {
        setLevel(structure[0].level)
        ChannelService.get(form.getFieldValue('id')).then((res) => {
          const dataList = (res.data?.channelDistAuth ?? []).map((res, index, array) => {
            res.saleScalePlan =
              array.slice(0, index) ??
              [].map((mRes, Ci) => {
                if (mRes.saleAuth == 1) {
                  return res
                }
              })
            if (res.directAuth == 1) {
              return res
            }
          })
          setChannelDistAuth(dataList)
        })
      } else {
        console.log(data, '====')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level])
  useEffect(() => {
    if (show) {
      console.log(data, '------')
      getDetail()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])
  /**
   * @description: 回显数据
   */
  const getDetail = () => {
    const dataId = data?.id
    if (!dataId === false) {
      // setNameDefault(analysisName(structure, data?.pid, 'children', 'id', 'pid'))
      console.log(analysisName(structure, data?.channelId, 'children', 'id', 'pid'))
      console.log('structure', 'structure', structure)
      setChannelDistAuth(data?.channelPlanList)
      form.setFieldsValue({
        structureId: data?.id,
        channelPlanList: data?.channelPlanList,
        level: structure[0].level,
        planName: data?.planName,
        teamBonus: data?.teamBonus,
        state: data?.state,
      })
      // })
    } else {
      form.setFieldsValue({
        state: true,
        isOpenAccount: true,
        level: structure[0]?.level,
      })
    }
  }

  /**提交数据 */
  const _handleUpdate = async () => {
    form
      .validateFields()
      .then((formData) => {
        const postData = { ...formData }
        postData.channelPlanList =
          formData.channelPlanList ??
          [].map((res, index) => {
            const Data = JSON.parse(JSON.stringify(res))
            Data['level'] = channelDistAuth[index]['level']
            Data['saleScalePlan'] = (res.saleScalePlan ?? []).map((mRes, Ci) => {
              const levelData = channelDistAuth[index]['saleScalePlan'][Ci]['level']
              return {
                level: levelData,
                saleScale: mRes['saleScale'],
              }
            })
            return Data
          })
        postData.state = formData.state ? 1 : 0
        postData.isOpenAccount = formData.isOpenAccount ? 1 : 0
        if (mode === 'add') {
          postData.id = formData.structureId[formData.structureId.length - 1]
          delete postData.structureId
          ChannelService.ChannelPlan.saveChannelPlan(postData).then((res) => {
            if (res.code == 200) {
              message.success('分佣方案创建成功')
              setTimeout(() => {
                onSuccess()
              }, 500)
            } else {
              message.error('分佣方案创建失败，请重试')
            }
          })
        } else {
          const putData = {
            ...postData,
            id: data?.id,
          }
          delete putData.structureId
          ChannelService.ChannelPlan.edit(putData).then((res) => {
            if (res.code == 200) {
              message.success('分佣方案编辑成功')
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
    setLevel(data[data.length - 1]?.level)
    form.setFieldsValue({
      id: e[e.length - 1],
      level: data[data.length - 1]?.level,
    })
  }
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }
  return (
    <Modal
      title={mode == 'add' ? '创建分佣方案' : '分佣方案详情'}
      visible={show}
      width={700}
      onOk={_handleUpdate}
      onCancel={_formClose}
    >
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinish}
        autoComplete="off"
        form={form}
      >
        {level == 1 ? (
          <Form.Item label="归属分佣方案" name="structureId" rules={[{ required: true, message: '请输入' }]}>
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
        ) : (
          ''
        )}

        <Form.Item label="方案名称" name="planName" rules={[{ required: true, message: '请输入' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="团建奖金" name="teamBonus" rules={[{ required: true, message: '请输入' }]}>
          <InputNumber max={100} min={0} addonAfter="%" />
        </Form.Item>
        {channelDistAuth.map((res: any, index, array) => {
          return (
            <div key={index}>
              <>
                <Form.Item label="直销渠道">{res?.level}级渠道</Form.Item>
                <Row key={index} gutter={23}>
                  <Col span={12} style={{ textAlign: 'right' }}>
                    <Form.Item
                      labelCol={{ offset: 4 }}
                      label="直销分佣比例"
                      name={['channelPlanList', index, 'directScale']}
                    >
                       <InputNumber max={100} min={0} addonAfter="%" />
                    </Form.Item>
                  </Col>
                  <Col span={12} style={{ textAlign: 'right' }}>
                    <Form.Item
                      labelCol={{ offset: 4 }}
                      label="发团服务费"
                      name={['channelPlanList', index, 'teamPrice']}
                    >
                      <InputNumber max={100} min={0} addonAfter="%" />
                    </Form.Item>
                  </Col>
                  {array.slice(0, index).map((mRes, Ci) => {
                    return (
                      <Col span={12} style={{ textAlign: 'right' }} key={Ci}>
                        <Form.Item
                         labelCol={{ offset: 4 }}
                          label={mRes.level + '级渠道分销分佣比例'}
                          name={['channelPlanList', index, 'saleScalePlan', Ci, 'saleScale']}
                        >
                          <InputNumber max={100} min={0} addonAfter="%" />
                        </Form.Item>
                      </Col>
                    )
                  })}
                </Row>
              </>
            </div>
          )
        })}

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
export default AddCommissionSchemeDialog
