/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Description:
 * @LastEditTime: 2022-01-26 19:30:32
 */

import React, { useState, useEffect } from 'react'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { Menu, Col, Row, Checkbox, Radio, Input, Button, Tooltip, Form, Select, InputNumber, message } from 'antd'
import ChannelService from '@/service/ChannelService'
import { cityDispose, getMaxFloor } from '@/utils/tree'

interface Props {
  chanId: any
  structure: any
  ranked: any
  channelDetail: any
}
const CommissionAuthority: React.FC<Props> = ({ chanId, structure, ranked, channelDetail }) => {
  const [isGroupServiceFee, setIsGroupServiceFee] = useState(0)
  const [form] = Form.useForm()

  useEffect(() => {
    if (channelDetail == '') {
      form.setFieldsValue({
        saleSettleDay: 0,
        presetBonus: 0,
        groupSettleDay: 0,
      })
    } else {
      const Data = JSON.parse(channelDetail)
      let listDit: any
      const mapList = Data.channelDistAuth ?? []
      listDit = mapList.map((res) => {
        let list = []
        res?.saleAuth == 1 ? list.push(0) : ''
        res?.directAuth == 1 ? list.push(1) : ''
        return list
      })
      form.setFieldsValue({
        channelDistAuth: listDit,
        isGroupServiceFee: Data?.isGroupServiceFee == 1 ? ['1'] : [],
        groupSettleDay: Data?.groupSettleDay??0,
        groupSettleType: Data?.groupSettleType,
        id: Data?.id,
        presetBonus: Data?.presetBonus,
        saleSettleType: Data?.saleSettleType,
        saleSettleDay: Data?.saleSettleDay??0,
      })
      setIsGroupServiceFee(Data?.isGroupServiceFee)
    }
  }, [channelDetail])
  const onChangeRadio = (e) => {
    // setValue(e.target.value)
  }

  const onFinish = (values: any) => {
    const PostData = { ...values }
    PostData['isGroupServiceFee'] = values['isGroupServiceFee'].length > 0 ? 1 : 0
    PostData['channelDistAuth'] = values['channelDistAuth'].map((res, index) => {
      return {
        directAuth: (res ?? '').indexOf(1) == -1 ? 0 : 1,
        saleAuth: (res ?? '').indexOf(0) == -1 ? 0 : 1,
        level: ranked[index].level,
      }
    })
    if (!chanId) {
      message.error('???????????????!')
    } else {
      const query = {
        id: chanId,
        ...PostData,
      }
      query.saleSettleDay = Number(PostData.saleSettleDay)
      query.groupSettleDay = Number(PostData.groupSettleDay)
      ChannelService.edit(query).then((res) => {
        message.success('?????????!')
      })
    }
  }
  const changeCheckout = (e) => {
    setIsGroupServiceFee(e.length)
  }
  return (
    <>
      {!!chanId ? (
        <Form
          name="normal_login"
          onFinish={onFinish}
          form={form}
          initialValues={{ groupSettleDay: 0, saleSettleDay: 0 }}
        >
          <Form.Item>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              ??????????????????&nbsp; &nbsp;
              <Form.Item
                name="presetBonus"
                rules={[
                  {
                    pattern: /^([1-9]\d|\d)$/,
                    message: '?????????0-99?????????!',
                  },
                ]}
                style={{ marginBottom: '0' }}
              >
                <InputNumber min={0} max={100} addonAfter="%" style={{ width: '100px' }} />
              </Form.Item>
              &nbsp; &nbsp;
              <Tooltip
                placement="right"
                title={
                  '?????????????????????????????????????????????????????????10000???????????????10%????????????????????????1%??????????????????????????????10000*10%*1%'
                }
              >
                <QuestionCircleOutlined />
              </Tooltip>
            </div>
          </Form.Item>
          <Form.Item name="isGroupServiceFee">
            <Checkbox.Group onChange={changeCheckout}>
              <Checkbox value="1"></Checkbox>{' '}
              <div style={{ display: 'inline', alignItems: 'center' }}>
                ???????????????&nbsp; &nbsp;
                <Tooltip placement="right" title={'???????????????????????????'}>
                  <QuestionCircleOutlined />
                </Tooltip>
              </div>
            </Checkbox.Group>
          </Form.Item>
          {isGroupServiceFee == 1 ? (
            <Form.Item
              label="????????????????????????"
              name="groupSettleType"
              rules={[{ required: true, message: '?????????????????????????????????!' }]}
            >
              <Radio.Group onChange={onChangeRadio} value={''}>
                <Radio value={1}>??????</Radio>
                <Radio value={2}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    ???????????? &nbsp; &nbsp;?????????&nbsp; &nbsp;
                    <Form.Item
                      name="groupSettleDay"
                      rules={[
                        {
                          pattern: /^([1-9]\d|\d)$/,
                          message: '?????????0-99?????????!',
                        },
                      ]}
                      style={{ marginBottom: '0' }}
                    >
                      <InputNumber addonAfter="???" />
                    </Form.Item>
                  </div>{' '}
                  &nbsp; &nbsp;
                </Radio>
              </Radio.Group>
            </Form.Item>
          ) : (
            ''
          )}
          <span style={{ marginBottom: '10px', display: 'block' }}>
            ????????????????????????????????????????????????????????????????????????
          </span>
          {ranked.map((res, index) => {
            return (
              <div key={index}>
                <Form.Item
                  name={['channelDistAuth', index]}
                  label={`${index + 2}????????????${res.name}${index == 0 ? '' : '???'}??? :???????????? :   `}
                >
                  <Checkbox.Group>
                    <Checkbox value={0}>????????????</Checkbox>
                    <Checkbox value={1}>????????????</Checkbox>
                  </Checkbox.Group>
                </Form.Item>
              </div>
            )
          })}

          <Form.Item
            label="??????/??????????????????"
            name="saleSettleType"
            rules={[{ required: true, message: '????????????????????? !' }]}
          >
            <Radio.Group>
              <Radio value={1}>??????</Radio>
              <Radio value={2}>??????</Radio>
              <Radio value={3}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  ???????????? &nbsp; &nbsp;?????????&nbsp; &nbsp;
                  <Form.Item
                    name="saleSettleDay"
                    rules={[
                      {
                        pattern: /^([1-9]\d|\d)$/,
                        message: '?????????0-99?????????!',
                      },
                    ]}
                    style={{ marginBottom: '0' }}
                  >
                    <InputNumber min={0} addonAfter="???" />
                  </Form.Item>
                </div>{' '}
                &nbsp; &nbsp;
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            {...{
              wrapperCol: { offset: 8, span: 16 },
            }}
          >
            <Button htmlType="submit" size="large" type="primary">
              ??????
            </Button>
            {/* <Button htmlType="button" onClick={onClose} style={{ margin: '0 8px' }}>
            ??????
          </Button> */}
          </Form.Item>
        </Form>
      ) : (
        <div>??????????????????</div>
      )}
    </>
  )
}

export default CommissionAuthority
