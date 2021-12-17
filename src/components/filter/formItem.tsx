import { Form, Input, Select, DatePicker, TimePicker } from 'antd'
import React from 'react'
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
 * 用户类型选择框, 模版
 */
export const SelectEmployeeStatusTemp: FC<any> = ({ name, ...props }) => {
  return (
    <Form.Item name={name}>
      <Select allowClear {...props}>
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
        {/* <Select.Option value={0}>全部</Select.Option> */}
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
