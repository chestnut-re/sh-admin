import React, { useState, useEffect } from 'react'
import { Form, Button, Input, Row, Col, Select, Space, Table, DatePicker, Radio } from 'antd'
import './survey.less'
import { InfoCircleOutlined } from '@ant-design/icons'
import ChannelService from '@/service/ChannelService'
import { HttpCode } from '@/constants/HttpCode'
import * as echarts from 'echarts/core'

import {
  TitleComponent,
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  LegendComponent,
  LegendComponentOption,
} from 'echarts/components'
import { PieChart, PieSeriesOption } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([TitleComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer, LabelLayout])

type EChartsOption = echarts.ComposeOption<
  TitleComponentOption | TooltipComponentOption | LegendComponentOption | PieSeriesOption
>

/**财务管理-财务概况 */
const SurveyPage: React.FC = () => {
  const [form] = Form.useForm()
  const { RangePicker } = DatePicker
  const { Option } = Select
  const [data, setData] = useState([])

  // setTimeout(() => {
  //   const chartDom = document.getElementById('main')!
  //   const myChart = echarts.init(chartDom)
  //   const option: EChartsOption = {
  //     tooltip: {
  //       trigger: 'item',
  //       formatter: '{b} : {c} ({d}%)',
  //     },
  //     legend: {
  //       orient: 'horizontal',
  //       left: 'center',
  //       top: 'bottom',
  //       icon: 'circle',
  //     },
  //     series: [
  //       {
  //         name: 'Access From',
  //         type: 'pie',
  //         radius: '50%',
  //         data: [
  //           { value: 1048, name: '销售分佣金额' },
  //           { value: 735, name: '提现金额' },
  //           { value: 580, name: '运营资金' },
  //           { value: 484, name: '退款金额' },
  //           { value: 300, name: '销售总额' },
  //         ],
  //         emphasis: {
  //           itemStyle: {
  //             shadowBlur: 10,
  //             shadowOffsetX: 0,
  //             shadowColor: 'rgba(0, 0, 0, 0.5)',
  //           },
  //         },
  //       },
  //     ],
  //   }
  //   option && myChart.setOption(option)
  // }, 1)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    // AdminService.list({ current: pageIndex, pageSize: pageSize }).then((res) => {
    //   console.log(res)
    //   setData(res.data.records)
    //   setTotal(res.data.total)
    // })
  }

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className="survey__root">
      <div className="list-form">
        <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed} form={form}>
          <Row gutter={[5, 0]}>
            <Col span={6}>
              <Form.Item name="channelId">
                <Radio.Group
                // value={checkState}
                // onChange={(value) => {
                //   setCheckState(value.target.value)
                //   loadData(pageIndex)
                // }}
                >
                  <Radio.Button value="0">今天</Radio.Button>
                  <Radio.Button value="1">近7天</Radio.Button>
                  <Radio.Button value="2">近30天</Radio.Button>
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
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button htmlType="submit">重置</Button>
              </Space>
            </Form.Item>
          </Row>
        </Form>
      </div>
      <div className="survey-content">
        {/* <div className="charts">
          <div id="main" style={{ width: 400, height: 400 }}></div>
        </div> */}
        <div className="des">
          {/* <div>
            <span>销售总额：</span>
            <span>¥100000.00</span>
          </div>
          <div>
            <span>销售分佣金额：</span>
            <span>¥2000.00</span>
          </div>
          <div>
            <span>运营资金：</span>
            <span>¥1000.00</span>
          </div>
          <div>
            <span>退款金额：</span>
            <span>¥1000.00</span>
          </div>
          <div>
            <span>提现金额：</span>
            <span>¥1000.00</span>
          </div>
          <div>
            <span>实际收益：</span>
            <span>¥5000.00</span>
          </div> */}
          <h3>财务指标</h3>
          <Row gutter={[12, 48]}>
            <Col className="gutter-row" span={12}>
              账户当前余额：111&nbsp;&nbsp;
              <InfoCircleOutlined style={{ color: '#999' }} />
            </Col>
            <Col className="gutter-row" span={12}>
              订单收入总额：111&nbsp;&nbsp;
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
              退款总额：111&nbsp;&nbsp;
              <InfoCircleOutlined style={{ color: '#999' }} />
            </Col>
            <Col className="gutter-row" span={12}>
              已释放总额：111&nbsp;&nbsp;
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
              待释放金额：111&nbsp;&nbsp;
              <InfoCircleOutlined style={{ color: '#999' }} />
            </Col>
            <Col className="gutter-row" span={12}>
              实际利润：111 &nbsp;&nbsp;
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
              代币已使用总额：111&nbsp;&nbsp;
              <InfoCircleOutlined style={{ color: '#999' }} />
            </Col>
            <Col className="gutter-row" span={12}>
              已提现总额：111 &nbsp;&nbsp;
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
              提现申请中总额：111&nbsp;&nbsp;
              <InfoCircleOutlined style={{ color: '#999' }} />
            </Col>
            <Col className="gutter-row" span={12}>
              代币流通总额：111 &nbsp;&nbsp;
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
