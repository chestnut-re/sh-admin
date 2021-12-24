/*
 * @Description:
 * @LastEditTime: 2021-12-24 17:58:14
 */
import { Table, Switch, Space, Form } from 'antd'
import React, { useState, useEffect } from 'react'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { Menu, Col, Row, Checkbox, Radio, Input, Button, Tooltip } from 'antd'
import ChannelService from '@/service/ChannelService'
import { cityDispose, getMaxFloor } from '@/utils/tree'
interface Props {
  chanId: any
  structure: any
  ranked: any
}
const CommissionAuthority: React.FC<Props> = ({ chanId, structure, ranked }) => {
  const [dataObj, setDataObj] = useState({})
  useEffect(() => {
    // setArrayNum()
  }, [ranked])
  const onChangeRadio = (e) => {
    // setValue(e.target.value)
  }
  const onChange = (e) => {
    // setValue(e.target.value)
  }

  return (
    <>
      <Form name="normal_login" className="login-form" initialValues={{ remember: false }}>
        <Form.Item name="username">
          <Checkbox value="D">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              预设团建奖金&nbsp; &nbsp;
              <Form.Item name="username" validateStatus="error" style={{ marginBottom: '0' }}>
                <Input suffix="%" style={{ width: '100px' }} />
                &nbsp; &nbsp;
              </Form.Item>
              <Tooltip
                placement="right"
                title={
                  '团建奖金以商品分佣所得额为基数，如订单10000，商品分佣10%，团建奖金配置了1%，最终所得团建奖金为10000*10%*1%'
                }
              >
                <QuestionCircleOutlined />
              </Tooltip>
            </div>
          </Checkbox>
        </Form.Item>
        <Form.Item name="password">
          <Checkbox value="D">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              发团服务费&nbsp; &nbsp;
              <Tooltip placement="right" title={'发团后是否获取佣金'}>
                <QuestionCircleOutlined />
              </Tooltip>
            </div>
          </Checkbox>
        </Form.Item>
        <Form.Item
          label="发团服务结算要求"
          name="remember"
          rules={[{ required: true, message: 'Please input your 发团服务结算要求!' }]}
        >
          <Radio.Group onChange={onChangeRadio} value={''}>
            <Radio value={2}>核销</Radio>
            {/* <Radio value={3}>行程结束</Radio> */}
            <Radio value={4}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                行程结束 &nbsp; &nbsp;且需满&nbsp; &nbsp;
                <Form.Item name="username" validateStatus="error" style={{ marginBottom: '0' }}>
                  <Input suffix="天" style={{ width: '100px' }} />
                  &nbsp; &nbsp;
                </Form.Item>
              </div>
            </Radio>
          </Radio.Group>
        </Form.Item>
        <span>分销分佣：所属所有下级卖出去商品后，是否获得佣金</span>
        {ranked.map((res, index) => {
          return (
            <div key={index}>
              <Form.Item
                label={`${index + 2}级渠道（${res.name}）`}
                name={`${index}`}
                rules={[{ required: true, message: 'Please input your 发团服务结算要求!' }]}
              >
                佣金权限 : &nbsp; &nbsp;{' '}
                <Radio.Group>
                  <Radio value={2}>销售分佣</Radio>
                  <Radio value={3}>销售分佣</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
          )
        })}

        <Form.Item
          label="直销/分销结算要求"
          name="remember"
          rules={[{ required: true, message: 'Please input your 发团服务结算要求!' }]}
        >
          <Radio.Group onChange={onChangeRadio} value={''}>
            <Radio value={2}>下单</Radio>
            <Radio value={3}>核销</Radio>
            <Radio value={4}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                行程结束 &nbsp; &nbsp;且需满&nbsp; &nbsp;
                <Input suffix="天" style={{ width: '100px' }} />
              </div>
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          {...{
            wrapperCol: { offset: 8, span: 16 },
          }}
        >
          <Button htmlType="submit" type="primary">
            保存
          </Button>
          <Button htmlType="button" style={{ margin: '0 8px' }}>
            取消
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default CommissionAuthority
