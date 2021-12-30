/*
 * @Description: 添加分佣方案
 * @LastEditTime: 2021-12-30 16:35:17
 */

import { Form, Input, Modal, Cascader, message, Row, Col, InputNumber, Button, Tooltip } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { analysisNameDuo } from '@/utils/tree'
import ChannelService from '@/service/ChannelService'
import { formateTime } from '@/utils/timeUtils'
// export type DialogMode = 'add' | 'edit'
interface Props {
  data: any
  mode: any
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
  const [level, setLevel] = useState(1)
  const [nameDefault, setNameDefault] = useState('')
  const [channelDistAuth, setChannelDistAuth] = useState([])
  const [dataId, setDataId] = useState(null)
  /**
   * @description: 合计算
   */
  const getTotal = (mapData, teamBonus, isGroupServiceFee) => {
    console.log(mapData, 'mapData')
    const reduceList = mapData.saleScalePlan ?? [0]
    let sum = reduceList.reduce((pre, item) => {
      return (pre += item?.saleScale ?? 0)
    }, 0)
    const totalDirectScale = mapData.directScale ?? 0
    const totalTeamBonus = teamBonus ?? 0
    const totalTeamPrice = mapData.teamPrice ?? 0
    return totalTeamBonus + totalDirectScale + totalTeamPrice + sum
  }
  const getInit = (mapData, presetBonus, isGroupServiceFee) => {
    const dataList = mapData.map((res) => {
      res.total = getTotal(res, presetBonus, isGroupServiceFee)
      return res
    })
    console.log(dataList, 'dataList')
    form.setFieldsValue({
      channelPlanList: dataList,
    })
    setChannelDistAuth(dataList)
    // return dataList
  }

  useEffect(() => {
    if (show) {
      if (mode == 'add') {
        ChannelService.get(form.getFieldValue('id')).then((res) => {
          const resData = res?.data
          const mapData = res.data?.channelDistAuth ?? []
          const dataList = mapData
            .map((res, index, array) => {
              const mapList = array.slice(0, index) ?? []
              res.saleScalePlan = mapList.filter((mRes, Ci) => {
                if (mRes.saleAuth == 1) {
                  return res
                }
              })

              res.isGroupServiceFee = resData?.isGroupServiceFee
              return res
            })
            .filter((res) => res?.directAuth == 1)
          //
          const isList = getInit(dataList, resData?.presetBonus, resData?.isGroupServiceFee)
          form.setFieldsValue({
            teamBonus: resData?.presetBonus,
          })
          // console.log(dataList,'dataListdataListdataListdataListdataList')
          // setChannelDistAuth(isList)
        })
      } else {
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataId])
  useEffect(() => {
    form.resetFields()
    setChannelDistAuth([])
    if (show) {
      getDetail()
      if (mode == 'add') {
        setLevel(structure[0].level)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])
  /**
   * @description: 回显数据
   */
  const getDetail = () => {
    const dataId = data?.id
    if (!dataId === false) {
      ChannelService.ChannelPlan.get(dataId).then((result) => {
        const resultData = result?.data
        setChannelDistAuth(resultData?.channelPlanList)
        setNameDefault(analysisNameDuo(structure, resultData?.channelId, 'children', 'id', 'pid'))
        form.setFieldsValue({
          structureId: [resultData?.id],
          channelPlanList: resultData?.channelPlanList,
          level: structure[0].level,
          planName: resultData?.planName,
          teamBonus: resultData?.teamBonus,
          state: resultData?.state,
          createTime: formateTime(resultData?.createTime),
          createUserName: resultData?.createUserName,
        })
        getInit(resultData?.channelPlanList, resultData?.teamBonus, resultData?.isGroupServiceFee)
      })
    } else {
      form.setFieldsValue({
        // structureId: undefined,
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
        const maoList = formData.channelPlanList ?? []
        postData.channelPlanList = maoList.map((res, index) => {
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
    const levelData = data[data.length - 1]?.level
    const dataId = e[e.length - 1]
    setDataId(dataId)
    setLevel(levelData)
    form.setFieldsValue({
      id: dataId,
      level: levelData,
    })
    //
  }
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }
  const changeInput = () => {
    getInit(
      form.getFieldValue('channelPlanList'),
      form.getFieldValue('teamBonus'),
      form.getFieldValue('isGroupServiceFee')
    )
  }
  const type = { add: '创建分佣方案', edit: '编辑分佣方案', see: '查看分佣方案' }
  return (
    <Modal
      title={type[mode]}
      visible={show}
      width={700}
      // onOk={_handleUpdate}
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
        onFinish={onFinish}
        onFinishFailed={onFinish}
        autoComplete="off"
        form={form}
      >
        {level == 1 || mode == 'add' ? (
          <Form.Item label="所属渠道" name="structureId" rules={[{ required: true, message: '请输入' }]}>
            {mode == 'add' ? (
              <Cascader
                options={structure}
                disabled={mode == 'see'}
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
          <Input disabled={mode == 'see'} />
        </Form.Item>
        <Form.Item label="团建奖金" name="teamBonus">
          <InputNumber disabled max={100} min={0} addonAfter="%" />
        </Form.Item>
        {(channelDistAuth ?? []).map((res: any, index, array) => {
          return (
            <div key={index}>
              <>
                <Form.Item label="直销渠道">{res?.level}级渠道</Form.Item>
                <Row key={index} gutter={23}>
                  <Col span={12} style={{ textAlign: 'right' }}>
                    <Form.Item
                      labelCol={{ offset: 4 }}
                      label="直销分佣比例"
                      rules={[
                        {
                          pattern: /^([1-9]\d|\d)$/,
                          message: '请输入0-99的正整数!',
                        },
                      ]}
                      name={['channelPlanList', index, 'directScale']}
                    >
                      <InputNumber onChange={changeInput} disabled={mode == 'see'} max={100} min={0} addonAfter="%" />
                    </Form.Item>
                  </Col>
                  {res.isGroupServiceFee == 1 ? (
                    <Col span={12} style={{ textAlign: 'right' }}>
                      <Form.Item
                        labelCol={{ offset: 4 }}
                        label="发团服务费"
                        rules={[
                          {
                            pattern: /^([1-9]\d|\d)$/,
                            message: '请输入0-99的正整数!',
                          },
                        ]}
                        name={['channelPlanList', index, 'teamPrice']}
                      >
                        <InputNumber onChange={changeInput} disabled={mode == 'see'} max={100} min={0} addonAfter="%" />
                      </Form.Item>
                    </Col>
                  ) : (
                    ''
                  )}

                  {(res.saleScalePlan ?? []).map((mRes, Ci) => {
                    return (
                      <Col span={12} style={{ textAlign: 'right' }} key={Ci}>
                        <Form.Item
                          labelCol={{ offset: 4 }}
                          label={mRes.level + '级渠道分销分佣比例'}
                          rules={[
                            {
                              pattern: /^([1-9]\d|\d)$/,
                              message: '请输入0-99的正整数!',
                            },
                          ]}
                          name={['channelPlanList', index, 'saleScalePlan', Ci, 'saleScale']}
                        >
                          <InputNumber
                            onChange={changeInput}
                            disabled={mode == 'see'}
                            max={100}
                            min={0}
                            addonAfter="%"
                          />
                        </Form.Item>
                      </Col>
                    )
                  })}
                  <Col span={12} style={{ textAlign: 'right' }}>
                    `{' '}
                    <Form.Item
                      labelCol={{ offset: 4 }}
                      label={'合计'}
                      rules={[
                        {
                          pattern: /^100$|^(\d|[1-9]\d)$/,
                          message: '团建奖金，分销服务费和发团服务费合计不可超过100',
                        },
                      ]}
                      name={['channelPlanList', index, 'total']}
                    >
                      <InputNumber disabled max={100} min={0} addonAfter="%" />
                    </Form.Item>
                    <Tooltip
                      placement="right"
                      title={
                        '团建奖金以商品分佣所得额为基数，如订单10000，商品分佣10%，团建奖金配置了1%，最终所得团建奖金为10000*10%*1%'
                      }
                    ></Tooltip>
                    `
                  </Col>
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
export default AddCommissionSchemeDialog
