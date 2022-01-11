import React, { useState, useEffect } from 'react'
import { Form, Button, Input, Row, Col, Select, Space, Table, DatePicker } from 'antd'
import './survey.less'
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

  setTimeout(() => {
    const chartDom = document.getElementById('main')!
    const myChart = echarts.init(chartDom)
    const option: EChartsOption = {
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)',
      },
      legend: {
        orient: 'horizontal',
        left: 'center',
        top: 'bottom',
        icon: 'circle',
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: '销售分佣金额' },
            { value: 735, name: '提现金额' },
            { value: 580, name: '运营资金' },
            { value: 484, name: '退款金额' },
            { value: 300, name: '销售总额' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    }
    option && myChart.setOption(option)
  }, 1)

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
    <div className="list__root">
      <div className="list-form">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Row gutter={[5, 0]}>
            <Col span={4}>
              <Form.Item name="channelId">
                <Select style={{ width: 120 }}>
                  <Option value={1}>今天</Option>
                  <Option value={2}>近7天</Option>
                  <Option value={3}>近30天</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={2} className="table-from-label">
              时间筛选
            </Col>
            <Col span={4}>
              <Form.Item name="time">
                <RangePicker showTime />
              </Form.Item>
            </Col>
            <Form.Item wrapperCol={{ offset: 2, span: 0 }}>
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
        <div className="charts">
          <div id="main" style={{ width: 400, height: 400 }}></div>
        </div>
        <div className="des">
          <div>
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
          </div>
        </div>
      </div>
    </div>
  )
}
export default SurveyPage
