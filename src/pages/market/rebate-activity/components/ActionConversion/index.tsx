/*
 * @Description:
 * @LastEditTime: 2022-01-15 14:51:41
 */
import { Form, Input, Modal, InputNumber, Radio, Switch, Row, Col, Checkbox } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { HttpCode } from '@/constants/HttpCode'

const ActionConversion: FC = () => {
  const [isPullRebate, setIsPullRebate] = useState(false)
  const [isShareRebate, setIsShareRebate] = useState(false)
  return (
    <>
      <Row>
        <Col span={24}>
          <Form.Item name="isShareRebate" label="分享返利" valuePropName="checked">
            <Switch checkedChildren="开启" onChange={(e) => setIsShareRebate(e)} unCheckedChildren="关闭" />
          </Form.Item>
        </Col>
        {isShareRebate ? (
          <>
            {' '}
            <Col span={7}>
              <Form.Item
                name="shareTotal"
                rules={[
                  {
                    pattern: /^[0-9]\d{0,1}$/,
                    message: '请输入0-100的整数!',
                  },{ required: true, message: '请选择!' }
                ]}
                label="任务目标"
              >
                <InputNumber addonBefore="累计分享" style={{ width: '180px' }} addonAfter="次" type="number" />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                name="shareTime"
                rules={[
                  {
                    pattern: /^[0-9]\d{0,1}$/,
                    message: '请输入0-100的整数!',
                  },{ required: true, message: '请选择!' }
                ]}
              >
                <InputNumber addonBefore="间隔" style={{ width: '180px' }} addonAfter="小时" type="number" />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="isShareSuccess"  label="完成条件">
                <Checkbox.Group>
                  <Checkbox value="1" style={{ lineHeight: '32px' }}>
                    分享成功
                  </Checkbox>
                </Checkbox.Group>
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item name="isSharePoint"  label="">
                <Checkbox.Group>
                  <Checkbox value="1" style={{ lineHeight: '32px' }}>
                    触达独立IP
                  </Checkbox>
                </Checkbox.Group>
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item
                name="sharePointIp"
                rules={[
                  {
                    pattern: /^[0-9]\d{0,1}$/,
                    message: '请输入0-100的整数!',
                  },{ required: true, message: '请选择!' }
                ]}
              >
                <InputNumber addonAfter="个" style={{ width: '100px' }} type="number" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="shareAmount" rules={[{ required: true, message: '请选择!' }]} label="返利金额">
                <Radio.Group>
                  <Radio value="1" style={{ lineHeight: '32px' }}>
                    每次均分
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </>
        ) : (
          ''
        )}
      </Row>

      <Row>
        <Col span={24}>
          <Form.Item
            name="isPullRebate"
            rules={[{ required: true, message: '请选择!' }]}
            label="行动转化"
            valuePropName="checked"
          >
            <Switch checkedChildren="开启" onChange={(e) => setIsPullRebate(e)} unCheckedChildren="关闭" />
          </Form.Item>
        </Col>
        {isPullRebate ? (
          <>
            <Col span={9}>
              <Form.Item
                name="pullTotal"
                label="任务目标"
                rules={[
                  {
                    pattern: /^[0-9]\d{0,1}$/,
                    message: '请输入0-100的整数!',
                  },{ required: true, message: '请选择!' }
                ]}
              >
                <InputNumber addonBefore="转化" addonAfter="个" style={{ width: '170px' }} type="number" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="pullType" rules={[{ required: true, message: '请选择!' }]} label="完成条件">
                <Radio.Group>
                  <Radio value="1" style={{ lineHeight: '32px' }}>
                    新用户注册
                  </Radio>
                  <Radio value="2" style={{ lineHeight: '32px' }}>
                    订单核销
                  </Radio>
                  <Radio value="3" style={{ lineHeight: '32px' }}>
                    行程结束
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="shareAmount" rules={[{ required: true, message: '请选择!' }]} label="返利金额">
                <Radio.Group>
                  <Radio value="1" style={{ lineHeight: '32px' }}>
                    每次均分
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </>
        ) : (
          ''
        )}
      </Row>
    </>
  )
}

export default ActionConversion
