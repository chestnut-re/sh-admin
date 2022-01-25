import React, { useState, useEffect } from 'react'
import { Form, Button, Input, Row, Col, Select, Space, Table, DatePicker, Radio } from 'antd'
import './survey.less'
import { InfoCircleOutlined } from '@ant-design/icons'
import { FinancialManagementService } from '@/service/FinanceAccountService'
import { HttpCode } from '@/constants/HttpCode'
import dayjs from 'dayjs'

/**财务管理-财务概况 */
const SurveyPage: React.FC = () => {
  const [form] = Form.useForm()
  const { RangePicker } = DatePicker
  const [data, setData] = useState<any>([])
  const [checkTime, setCheckTime] = useState('0')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    form.validateFields().then((query) => {
      const payBeginTime = query.time ? dayjs(query.time[0]).format('YYYY-MM-DD HH:mm:ss') : ''
      const payEndTime = query.time ? dayjs(query.time[1]).format('YYYY-MM-DD HH:mm:ss') : ''
      let params = {}
      if (payEndTime !== '' && payBeginTime !== '') {
        params = {
          startDate: payBeginTime,
          endDate: payEndTime,
        }
      } else {
        params = {
          days: checkTime,
        }
      }
      FinancialManagementService.fianceOverview({
        ...params,
      }).then((res) => {
        setData(res?.data ?? {})
      })
    })
  }

  useEffect(() => {
    loadData()
  }, [checkTime])

  const onFinish = (values: any) => {
    console.log('Success:', values)
    loadData()
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const _reset = () => {
    form.resetFields()
    setCheckTime('')
    loadData()
  }
  return (
    <div className="survey__root">
      <div className="list-form">
        <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed} form={form}>
          <Row gutter={[5, 0]}>
            <Col span={6}>
              <Form.Item name="channelId">
                <Radio.Group
                  value={checkTime}
                  onChange={(value) => {
                    setCheckTime(value.target.value)
                  }}
                >
                  <Radio.Button value="0">今天</Radio.Button>
                  <Radio.Button value="7">近7天</Radio.Button>
                  <Radio.Button value="30">近30天</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={2} className="table-from-label">
              选择时间
            </Col>
            <Col span={4}>
              <Form.Item name="time">
                <RangePicker showTime />
              </Form.Item>
            </Col>
            <Form.Item wrapperCol={{ offset: 1, span: 12 }}>
              <Space>
                <Button htmlType="submit">查询</Button>
                <Button htmlType="submit" onClick={_reset}>
                  重置
                </Button>
              </Space>
            </Form.Item>
          </Row>
        </Form>
      </div>
      <div className="survey-content">
        <div className="des">
          <h3>财务指标</h3>
          <Row gutter={[12, 48]}>
            <Col className="gutter-row" span={12}>
              账户当前余额：{parseInt(data?.balance).toFixed(2)}&nbsp;&nbsp;
              <InfoCircleOutlined style={{ color: '#999' }} />
            </Col>
            <Col className="gutter-row" span={12}>
              订单收入总额：{parseInt(data?.orderTotal).toFixed(2)}&nbsp;&nbsp;
              <InfoCircleOutlined style={{ color: '#999' }} />
            </Col>
          </Row>
          <Row gutter={[12, 24]}>
            <Col className="gutter-row colors" span={12}>
              账户当前余额=账户初始资金+订单收入总额-退款总额-已释放总额
            </Col>
            <Col className="gutter-row colors" span={12}>
              订单收入总额(不含退款)=现金收入总额+代币抵扣收入总额
            </Col>
          </Row>
          <Row gutter={[12, 24]}>
            <Col className="gutter-row" span={12}>
              退款总额：{parseInt(data?.refundTotal).toFixed(2)}&nbsp;&nbsp;
              <InfoCircleOutlined style={{ color: '#999' }} />
            </Col>
            <Col className="gutter-row" span={12}>
              已释放总额：{parseInt(data?.releasedTotal).toFixed(2)}&nbsp;&nbsp;
              <InfoCircleOutlined style={{ color: '#999' }} />
            </Col>
          </Row>
          <Row gutter={[12, 24]}>
            <Col className="gutter-row colors" span={12}>
              退款总额=现金退款总额+代币退款总额
            </Col>
            <Col className="gutter-row colors" span={12}>
              已释放总额(扣除退款)=返佣释放总额+返利释放总额+运营资金释放总额
            </Col>
          </Row>
          <Row gutter={[12, 24]}>
            <Col className="gutter-row" span={12}>
              待释放金额：{parseInt(data?.toBeReleasedTotal).toFixed(2)}&nbsp;&nbsp;
              <InfoCircleOutlined style={{ color: '#999' }} />
            </Col>
            <Col className="gutter-row" span={12}>
              实际利润：{parseInt(data?.profit).toFixed(2)} &nbsp;&nbsp;
              <InfoCircleOutlined style={{ color: '#999' }} />
            </Col>
          </Row>
          <Row gutter={[12, 24]}>
            <Col className="gutter-row colors" span={12}>
              待释放总额(扣除退款)=返佣待释放总额+返利待释放总额+运营资金待释放总额
            </Col>
            <Col className="gutter-row colors" span={12}>
              利润=订单收入总额-退款总额-已释放总额-待释放总额
            </Col>
          </Row>
          <h3 style={{ paddingTop: 20 }}>其他指标</h3>
          <Row gutter={[12, 24]}>
            <Col className="gutter-row" span={12}>
              代币已使用总额：{parseInt(data?.tokenUsed).toFixed(2)} &nbsp;&nbsp;
              <InfoCircleOutlined style={{ color: '#999' }} />
            </Col>
            <Col className="gutter-row" span={12}>
              已提现总额：{parseInt(data?.cashed).toFixed(2)} &nbsp;&nbsp;
              <InfoCircleOutlined style={{ color: '#999' }} />
            </Col>
          </Row>
          <Row gutter={[12, 24]}>
            <Col className="gutter-row colors" span={12}>
              代币使用总额=已提现总额+代币抵扣收入总额
            </Col>
            <Col className="gutter-row colors" span={12}>
              提现状态为提现成功总额
            </Col>
          </Row>
          <Row gutter={[12, 24]}>
            <Col className="gutter-row" span={12}>
              提现申请中总额：{parseInt(data?.cashing).toFixed(2)} &nbsp;&nbsp;
              <InfoCircleOutlined style={{ color: '#999' }} />
            </Col>
            <Col className="gutter-row" span={12}>
              代币流通总额：{parseInt(data?.tokenAvTotal).toFixed(2)} &nbsp;&nbsp;
              <InfoCircleOutlined style={{ color: '#999' }} />
            </Col>
          </Row>
          <Row gutter={[12, 24]}>
            <Col className="gutter-row colors" span={12}>
              提现状态为申请中的体现总额
            </Col>
            <Col className="gutter-row colors" span={12}>
              代币流通总额=已释放总额-代币已使用总额
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}
export default SurveyPage
