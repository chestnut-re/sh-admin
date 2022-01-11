/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Description:查看
 * @LastEditTime: 2022-01-11 11:56:55
 */
import React, { useState, FC, useEffect } from 'react'
import { Drawer, Button, Input, Radio, Form } from 'antd'
import { taskService } from '@/service/marketService'
import './index.less'
interface Props {
  data: any
}
const AuditProcessing: FC<Props> = ({ data }) => {
  const [form] = Form.useForm()
  const [dataList, setData] = useState([])
  const [dataSourceValue, setDataSource] = useState([])
  useEffect(() => {
    if (!!data) {
      // taskService.get(JSON.parse(data)?.id).then((res) => {
      //   setData(res?.data)
      //   setDataSource(res?.data?.taskInventoryGood)
      // })
    }
  }, [data])
  const goShowRecord = () => {
    console.log('---')
  }
  const onFinish = () => {
    form.validateFields().then((query) => {
      console.log(query, '---')
    })
  }
  return (
    <div className="AuditProcessing__root">
      {/* <Row>
        <Col span={17} className="basic-l">
          <Descriptions>
            <Descriptions.Item span={24} label="审核结果">
              {data?.name}
            </Descriptions.Item>
            <Descriptions.Item span={24} label="驳回原因">
              {data?.mathFlag == 1 ? '随机匹配' : '关联地域'}
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={6} className="basic-r">
          <Descriptions>
            <Descriptions.Item span={24} label="审核渠道"></Descriptions.Item>
            <Descriptions.Item span={24} label="审核人">
              {data?.updateUserName}
            </Descriptions.Item>
            <Descriptions.Item span={24} label="审核时间">
              {data?.createTime}
            </Descriptions.Item>

            <Button onClick={goShowRecord}>查看上线审核记录</Button>
          </Descriptions>
        </Col>
      </Row> */}

      {/* className="basic-l" */}
      <Form name="basic" onFinish={onFinish} form={form}>
        <Form.Item
          label="auditResult"
          name="审核结果"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Radio.Group>
            <Radio.Button value="a">通过</Radio.Button>
            <Radio.Button value="b">驳回</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item name='驳回原因' label="refuseReason">
        <Input.TextArea />
      </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            提交上线
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default AuditProcessing
