/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Description:
 * @LastEditTime: 2021-12-27 18:40:45
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
  const [dataObj, setDataObj] = useState({})
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
      const mapList = Data.channelDistAuth ??[]
      listDit =
      mapList.map((res) => {
          let list = []
          res?.saleAuth == 1 ? list.push(0) : ''
          res?.directAuth == 1 ? list.push(1) : ''
          return list
        })
      form.setFieldsValue({
        channelDistAuth: listDit,
        isGroupServiceFee: Data?.isGroupServiceFee == 1 ? ['1'] : [],
        groupSettleDay: Data?.groupSettleDay,
        groupSettleType: Data?.groupSettleType,
        id: Data?.id,
        presetBonus: Data?.presetBonus,
        saleSettleType: Data?.saleSettleType,
        saleSettleDay: Data?.saleSettleDay,
      })
      setIsGroupServiceFee(Data?.isGroupServiceFee)
    }
  }, [channelDetail])
  const onChangeRadio = (e) => {
    // setValue(e.target.value)
  }

  const onClose = (e) => {
    console.log(form.getFieldsValue(), 'form.getFieldsValue')
    // setValue(e.target.value)
  }
  const onFinish = (values: any) => {
    console.log('Success:', values)
    const PostData = { ...values }
    PostData['isGroupServiceFee'] = values['isGroupServiceFee'].length > 0 ? 1 : 0
    PostData['channelDistAuth'] = values['channelDistAuth'].map((res, index) => {
      return {
        directAuth: res.indexOf(1) == -1 ? 0 : 1,
        saleAuth: res.indexOf(0) == -1 ? 0 : 1,
        level: ranked[index].level,
      }
    })
    if (!chanId) {
      message.error('请选择渠道!')
    } else {
      const query = {
        id: chanId,
        ...PostData,
      }
      ChannelService.edit(query).then((res) => {
        console.log(res, '----')
        message.success('成功了!')
      })
    }
  }
  const changeCheckout = (e) => {
    console.log(e)
    setIsGroupServiceFee(e.length)
  }
  return (
    <>
      <Form name="normal_login" onFinish={onFinish} form={form} initialValues={{ remember: true }}>
        <Form.Item>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            预设团建奖金&nbsp; &nbsp;
            <Form.Item name="presetBonus" style={{ marginBottom: '0' }}>
              <InputNumber min={0} max={100} addonAfter="%" style={{ width: '100px' }} />
            </Form.Item>
            &nbsp; &nbsp;
            <Tooltip
              placement="right"
              title={
                '团建奖金以商品分佣所得额为基数，如订单10000，商品分佣10%，团建奖金配置了1%，最终所得团建奖金为10000*10%*1%'
              }
            >
              <QuestionCircleOutlined />
            </Tooltip>
          </div>
        </Form.Item>
        <Form.Item name="isGroupServiceFee">
            <Checkbox.Group onChange={changeCheckout}>
              <Checkbox value="1">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  发团服务费&nbsp; &nbsp;
                  <Tooltip placement="right" title={'发团后是否获取佣金'}>
                    <QuestionCircleOutlined />
                  </Tooltip>
                </div>
              </Checkbox>
            </Checkbox.Group>
          </Form.Item>
        {isGroupServiceFee == 1 ? (
      <Form.Item
      label="发团服务结算要求"
      name="groupSettleType"
      rules={[{ required: true, message: '请选择佣金权限 !' }]}
    >
      <Radio.Group onChange={onChangeRadio} value={''}>
        <Radio value={1}>核销</Radio>
        {/* <Radio value={3}>行程结束</Radio> */}
        <Radio value={2}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            行程结束 &nbsp; &nbsp;且需满&nbsp; &nbsp;
            <Form.Item name="groupSettleDay" style={{ marginBottom: '0' }}>
              <InputNumber addonAfter="天" defaultValue={0} />
            </Form.Item>
          </div>{' '}
          &nbsp; &nbsp;
        </Radio>
      </Radio.Group>
    </Form.Item>
        ) : (
          ''
        )}
        <span style={{ marginBottom: '10px', display: 'block' }}>分销分佣：所属所有下级卖出去商品后，是否获得佣金</span>
        {ranked.map((res, index) => {
          return (
            <div key={index}>
              <Form.Item
                name={['channelDistAuth', index]}
                label={`${index + 2}级渠道（${res.name}）:佣金权限 :   `}
                rules={[{ required: true, message: '请选择佣金权限 !' }]}
              >
                <Checkbox.Group>
                  <Checkbox value={0}>分销分佣</Checkbox>
                  <Checkbox value={1}>直销分佣</Checkbox>
                </Checkbox.Group>
              </Form.Item>
            </div>
          )
        })}

        <Form.Item
          label="直销/分销结算要求"
          name="saleSettleType"
          rules={[{ required: true, message: '请选择佣金权限 !' }]}
        >
          <Radio.Group>
            <Radio value={1}>下单</Radio>
            <Radio value={2}>核销</Radio>
            <Radio value={3}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                行程结束 &nbsp; &nbsp;且需满&nbsp; &nbsp;
                <Form.Item name="saleSettleDay" style={{ marginBottom: '0' }}>
                  <InputNumber addonAfter="天" defaultValue={0} />
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
            保存
          </Button>
          {/* <Button htmlType="button" onClick={onClose} style={{ margin: '0 8px' }}>
            取消
          </Button> */}
        </Form.Item>
      </Form>
    </>
  )
}

export default CommissionAuthority
