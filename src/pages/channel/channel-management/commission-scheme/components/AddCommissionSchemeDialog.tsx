/*
 * @Description: 添加分佣方案
 * @LastEditTime: 2022-01-26 16:39:29
 */

import { Form, Input, Modal, Cascader, message, Row, Col, InputNumber, Button, Tooltip } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { analysisNameDuo } from '@/utils/tree'
import ChannelService from '@/service/ChannelService'
import { formateTime } from '@/utils/timeUtils'
import './index.less'
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
        const id = form.getFieldValue('id')
        if (!!id) {
          ChannelService.get(form.getFieldValue('id')).then((res) => {
            const resData = res?.data
            const mapData = res.data?.channelDistAuth ?? []
            const dataList = mapData.map((res, index, array) => {
              // let mapList
              // if (res['level'] == '2') {
              //   mapList = array.slice(0, index + 1) ?? []
              // } else {
              res.teamBonus = resData?.teamBonus
              const mapList = array.slice(0, index) ?? []
              // }
              res.saleScalePlan = mapList.filter((mRes, Ci) => {
                if (mRes.saleAuth == 1) {
                  return res
                }
              })

              res.isGroupServiceFee = resData?.isGroupServiceFee
              return res
            })
            // .filter((res) => res?.directAuth == 1)
            //
            const isList = getInit(dataList, resData?.presetBonus, resData?.isGroupServiceFee)
            form.setFieldsValue({
              teamBonus: resData?.presetBonus ?? 0,
            })
            // console.log(dataList,'dataListdataListdataListdataListdataList')
            // setChannelDistAuth(isList)
          })
        }
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
        setDataId(null)
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
      width={1000}
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
        className="AddCommissionSchemeDialog__root"
        onFinish={onFinish}
        onFinishFailed={onFinish}
        autoComplete="off"
        form={form}
      >
        {level == 1 || mode == 'add' ? (
          <Form.Item label="所属渠道"        labelCol={{ span: 2 }} name="structureId" rules={[{ required: true, message: '请输入' }]}>
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

        <Form.Item label="方案名称"       labelCol={{ span: 2 }} name="planName" rules={[{ required: true, message: '请输入' }]}>
          <Input disabled={mode == 'see'} />
        </Form.Item>
        <Form.Item label="团建奖金" name="teamBonus">
          <InputNumber disabled max={100} min={0} addonAfter="%" />
        </Form.Item>

        <div className="rowList">
          <div className="row-l1"></div>
          <div className="row-l2">直销渠道</div>
          <div className="row-l3" style={{justifyContent:'center',background:'#FFFFFF'}}>提成分佣</div>
          <div className="row-l4">发团服务费</div>
          <div className="row-l5">合计分佣</div>
        </div>

        {(channelDistAuth ?? []).map((res: any, index, array) => {
          return (
            <div key={index}>
              <>
                <div>
                  <div style={{ display: 'flex' }} className="rowList">
                    <div className="row-l1">{res?.level}级渠道</div>
                    <div className="row-l2">
                      {res.directAuth == 1 || res.directScale ? (
                        <Form.Item
                          rules={[
                            {
                              pattern: /^([1-9]\d|\d)$/,
                              message: '请输入0-99的整数!',
                            },
                          ]}
                          name={['channelPlanList', index, 'directScale']}
                        >
                          <InputNumber
                            onChange={changeInput}
                            disabled={mode == 'see' || mode == 'edit'}
                            max={100}
                            min={0}
                            addonAfter="%"
                          />
                        </Form.Item>
                      ) : (
                        ''
                      )}
                    </div>
                    <div className="row-l3">
                      {(res.saleScalePlan ?? []).map((mRes, Ci) => {
                        return (
                          <div className="row-l3-li" key={Ci}>
                            <Form.Item
                              label={mRes.level + '级提成'}
                              rules={[
                                {
                                  pattern: /^([1-9]\d|\d)$/,
                                  message: '请输入0-99的整数!',
                                },
                              ]}
                              name={['channelPlanList', index, 'saleScalePlan', Ci, 'saleScale']}
                            >
                              <InputNumber
                                onChange={changeInput}
                                disabled={mode == 'see' || mode == 'edit'}
                                max={100}
                                min={0}
                                addonAfter="%"
                              />
                            </Form.Item>
                          </div>
                        )
                      })}
                    </div>
                    <div className="row-l4">
                      {res.isGroupServiceFee == 1 || res.teamPrice ? (
                        <Form.Item
                          rules={[
                            {
                              pattern: /^([1-9]\d|\d)$/,
                              message: '请输入0-99的整数!',
                            },
                          ]}
                          name={['channelPlanList', index, 'teamPrice']}
                        >
                          <InputNumber
                            onChange={changeInput}
                            disabled={mode == 'see' || mode == 'edit'}
                            max={100}
                            min={0}
                            addonAfter="%"
                          />
                        </Form.Item>
                      ) : (
                        ''
                      )}
                    </div>
                    <div className="row-l5">
                      <Form.Item
                        rules={[
                          {
                            pattern: /^100$|^(\d|[1-9]\d)$/,
                            message: '每级直销渠道的团建奖金，分佣比例和发团服务费不可超过100%',
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
                    </div>
                  </div>
                </div>
              </>
            </div>
          )
        })}

        <Form.Item
          label="level"
          name="level"       labelCol={{ span: 2 }}
          rules={[{ required: true, message: '请输入' }]}
          style={{ visibility: 'hidden', height: 0 }}
        >
          <Input disabled={mode == 'see' || mode == 'edit'} />
        </Form.Item>
        {mode == 'add' ? (
          <></>
        ) : (
          <>
            <Form.Item label="创建人"       labelCol={{ span: 2 }} name="createUserName">
              <Input disabled />
            </Form.Item>
            <Form.Item label="创建时间"       labelCol={{ span: 2 }} name="createTime">
              <Input disabled />
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  )
}
export default AddCommissionSchemeDialog
