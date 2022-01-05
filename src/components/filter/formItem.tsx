import { CommonService } from '@/service/CommonService'
import { Form, Input, Select, DatePicker, TimePicker } from 'antd'
import React, { useEffect, useState } from 'react'
import { FC } from 'react'

/**
 * 选择框, 模版
 */
export const SelectTemp: FC<any> = ({ name, ...props }) => {
  return (
    <Form.Item name={name}>
      <Select allowClear {...props}>
        <Select.Option value="male">male</Select.Option>
        <Select.Option value="female">female</Select.Option>
        <Select.Option value="other">other</Select.Option>
      </Select>
    </Form.Item>
  )
}

/**
 * 商品状态：产品状态（0:禁用，1:待发布，2:已发布，3:已下架, 4:失效）
 */
export const ProductionState: FC<any> = ({ name, ...props }) => {
  return (
    <Form.Item name={name}>
      <Select allowClear {...props}>
        <Select.Option value={0}>禁用</Select.Option>
        <Select.Option value={1}>待发布</Select.Option>
        <Select.Option value={2}>已发布</Select.Option>
        <Select.Option value={3}>已下架</Select.Option>
        <Select.Option value={4}>失效</Select.Option>
      </Select>
    </Form.Item>
  )
}

/**
 * 分中心商品状态：
 */
 export const SubCenterProductionState: FC<any> = ({ name, ...props }) => {
  return (
    <Form.Item name={name}>
      <Select allowClear {...props}>
        <Select.Option value={2}>已上架</Select.Option>
        <Select.Option value={1}>已下架</Select.Option>
      </Select>
    </Form.Item>
  )
}

/**
 * 商品出行类型 0是固定时间出行，1是约定时间出行
 */
export const TravelMode: FC<any> = ({ name, ...props }) => {
  return (
    <Form.Item name={name}>
      <Select allowClear {...props}>
        <Select.Option value={'0'}>固定时间出行</Select.Option>
        <Select.Option value={'1'}>约定时间出行</Select.Option>
      </Select>
    </Form.Item>
  )
}

/**
 * 用户类型选择框, 模版
 */
export const SelectEmployeeStatusTemp: FC<any> = ({ name, ...props }) => {
  return (
    <Form.Item name={name}>
      <Select allowClear {...props}>
        <Select.Option value={99}>全部</Select.Option>
        <Select.Option value={0}>用户</Select.Option>
        <Select.Option value={1}>客户</Select.Option>
      </Select>
    </Form.Item>
  )
}
/**
 * 注册途径, 模版
 */
export const SelectRegisterChannel: FC<any> = ({ name, ...props }) => {
  return (
    <Form.Item name={name}>
      <Select allowClear {...props}>
        <Select.Option value={99}>全部</Select.Option>
        <Select.Option value={1}>扫码</Select.Option>
        <Select.Option value={2}>任务分享</Select.Option>
        <Select.Option value={3}>商品分享</Select.Option>
        <Select.Option value={4}>app自然流量</Select.Option>
        <Select.Option value={5}>小程序自然流量</Select.Option>
      </Select>
    </Form.Item>
  )
}

/**
 * 选择状态 模版
 */
export const SelectState: FC<any> = ({ name, ...props }) => {
  return (
    <Form.Item name={name}>
      <Select allowClear {...props}>
        <Select.Option value={''}>全部</Select.Option>
        <Select.Option value={1}>正常</Select.Option>
        <Select.Option value={2}>禁用</Select.Option>
      </Select>
    </Form.Item>
  )
}

/**
 * 人员管理列表 状态
 */
export const PersonalState: FC<any> = ({ name, ...props }) => {
  return (
    <Form.Item name={name}>
      <Select allowClear {...props}>
        <Select.Option value={''}>全部</Select.Option>
        <Select.Option value={1}>正常</Select.Option>
        <Select.Option value={0}>禁用</Select.Option>
      </Select>
    </Form.Item>
  )
}

/**
 * 订单状态 模版
 */
export const OrderState: FC<any> = ({ name, ...props }) => {
  return (
    <Form.Item name={name}>
      <Select allowClear {...props}>
        <Select.Option value={''}>全部</Select.Option>
        <Select.Option value={1}>待付款</Select.Option>
        <Select.Option value={3}>待确认</Select.Option>
        <Select.Option value={4}>已完成</Select.Option>
        <Select.Option value={2}>已失效</Select.Option>
        <Select.Option value={5}>退款中</Select.Option>
        <Select.Option value={6}>退款成功</Select.Option>
        <Select.Option value={7}>退款失败</Select.Option>
      </Select>
    </Form.Item>
  )
}

/**
 * 订单类型 模版
 */
export const OrderType: FC<any> = ({ name, ...props }) => {
  return (
    <Form.Item name={name}>
      <Select allowClear {...props}>
        <Select.Option value={''}>全部</Select.Option>
        <Select.Option value={0}>直销</Select.Option>
        <Select.Option value={1}>分销</Select.Option>
      </Select>
    </Form.Item>
  )
}

/**
 * 下单途径 模版
 */
export const OrderRoute: FC<any> = ({ name, ...props }) => {
  return (
    <Form.Item name={name}>
      <Select allowClear {...props}>
        <Select.Option value={''}>全部</Select.Option>
        <Select.Option value={1}>自然获客</Select.Option>
        <Select.Option value={2}>分享链接</Select.Option>
        <Select.Option value={3}>分享任务</Select.Option>
        <Select.Option value={4}>线下扫码</Select.Option>
      </Select>
    </Form.Item>
  )
}

/**
 * 下单途径 模版
 */
export const SubCenterSelect: FC<any> = ({ name, ...props }) => {
  const [subCenters, setSubCenters] = useState<any[]>([])

  useEffect(() => {
    CommonService.getStructure().then((res) => {
      console.log(res)
      setSubCenters(res.data.children)
    })
  }, [])

  return (
    <Form.Item name={name}>
      <Select {...props}>
        {subCenters.map((item) => {
          return (
            <Select.Option key={`${item.id}`} value={`${item.id}`}>
              {item.name}
            </Select.Option>
          )
        })}
      </Select>
    </Form.Item>
  )
}

/**
 * 使用中/未使用
 */
export const StatusRoute: FC<any> = ({ name, ...props }) => {
  return (
    <Form.Item name={name}>
      <Select allowClear {...props}>
        <Select.Option value={''}>全部</Select.Option>
        <Select.Option value={1}>使用中</Select.Option>
        <Select.Option value={0}>未使用</Select.Option>
      </Select>
    </Form.Item>
  )
}

/**
 * 人员累心
 * 人员类型 0 渠道账户 1 内部渠道 2 外部渠道
 */
export const AccountType: FC<any> = ({ name, ...props }) => {
  return (
    <Form.Item name={name}>
      <Select allowClear {...props}>
        <Select.Option value={''}>全部</Select.Option>
        {/* <Select.Option value={0}>渠道账户</Select.Option> */}
        <Select.Option value={1}>内部渠道</Select.Option>
        <Select.Option value={2}>外部渠道</Select.Option>
      </Select>
    </Form.Item>
  )
}

/**
 * 输入框，模版
 */
export const InputTemp: FC<any> = ({ name, ...props }) => {
  return (
    <Form.Item name={name}>
      <Input {...props} />
    </Form.Item>
  )
}

/**
 * 选择时间，模版
 */
export const TimePickerTemp: FC<any> = ({ name, ...props }) => {
  return (
    <Form.Item name={name}>
      <TimePicker {...props} />
    </Form.Item>
  )
}

/**
 * 选择日期，模版
 */
export const DatePickerTemp: FC<any> = ({ name, ...props }) => {
  return (
    <Form.Item name={name}>
      <DatePicker {...props} />
    </Form.Item>
  )
}

/**
 * 选择日期区域，模版
 */
export const RangePickerTemp: FC<any> = ({ name, ...props }) => {
  const { RangePicker } = DatePicker
  return (
    <Form.Item name={name}>
      <RangePicker {...props} />
    </Form.Item>
  )
}

/**
 * 高低量筛选，模版
 */
export const LowAndHighTemp: FC<any> = ({ name, ...props }) => {
  return (
    <Form.Item name={name}>
      <span>
        <Input style={{ width: '45%' }} placeholder="最低量" {...props} /> -{' '}
        <Input style={{ width: '45%' }} placeholder="最高量" {...props} />
      </span>
    </Form.Item>
  )
}
