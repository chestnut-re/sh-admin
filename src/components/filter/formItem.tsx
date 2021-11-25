import { Form, Input, Select } from 'antd'
import { NamePath } from 'antd/lib/form/interface'
import React, { Props } from 'react'
import { FC } from 'react'

/**
 * 选择框, 模版
 */
export const SelectTemp: FC<any> = ({ name, ...props }) => {
  return (
    <Form.Item name={name}>
      <Select placeholder="选择性别" allowClear {...props}>
        <Select.Option value="male">male</Select.Option>
        <Select.Option value="female">female</Select.Option>
        <Select.Option value="other">other</Select.Option>
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
