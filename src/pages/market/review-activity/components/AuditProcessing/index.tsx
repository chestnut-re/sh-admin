/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Description:查看
 * @LastEditTime: 2022-01-26 10:56:11
 */
import React, { useState, FC, useEffect } from 'react'
import { Drawer, Button, Input, Radio, Descriptions, Row, Col, Form, message } from 'antd'
import { rebateService } from '@/service/marketService'
import ModalDialog from '@/components/components/ModalDialog'
import ShowAuditRecord from './ShowAuditRecord'
import './index.less'
interface Props {
  data: any
  showType: any
  onSuccess?: () => void
}
const statusEnum = {
  0: '待审核',
  1: '审核通过',
  2: '审核拒绝',
}
const AuditProcessing: FC<Props> = ({ data, showType, onSuccess }) => {
  const [form] = Form.useForm()
  const [dataList, setData] = useState([])
  const [dataSourceValue, setDataSource] = useState([])
  const [AuditResult, setAuditResult] = useState('0')
  const [ShowModal, setShowModal] = useState(false)
  useEffect(() => {
    if (!!data) {
      setData(JSON.parse(data))
    }
  }, [data])
  const onChangeRadio = (e) => {
    setAuditResult(e.target.value)
  }
  const onFinish = () => {
    const dataObj = JSON.parse(data)
    form.validateFields().then((query) => {
      rebateService
        .rebateAudit({
          id: dataObj?.id,
          type: dataObj?.type,
          ...query,
        })
        .then((res) => {
          message.success('提交成功了')
          setTimeout(() => {
            onSuccess()
          }, 1000)
        })
    })
  }
  const goShowRecord = () => {
    console.log('---')

    setShowModal(true)
  }

  return (
    <div className="AuditProcessing__root">
      {showType == 'show' ? (
        <Row>
          <Col span={16} className="basic-l">
            <Descriptions>
              <Descriptions.Item span={24} label="审核结果">
                {statusEnum[dataList?.auditResult]}
              </Descriptions.Item>
              <Descriptions.Item span={24} label="驳回原因">
                {dataList?.refuseReason}
              </Descriptions.Item>
            </Descriptions>
          </Col>

          <Col span={8} className="basic-r">
            <Descriptions>
              <Descriptions.Item span={24} label="审核渠道">
                {dataList?.auditChannelName}
              </Descriptions.Item>
              <Descriptions.Item span={24} label="审核人">
                {dataList?.auditUserName}
              </Descriptions.Item>
              <Descriptions.Item span={24} label="审核时间">
                {dataList?.auditTime}
              </Descriptions.Item>
            </Descriptions>
            <Button onClick={goShowRecord}>查看上线审核记录</Button>
          </Col>

          <ModalDialog
            width={950}
            show={ShowModal}
            title={'审核记录'}
            data={() => <ShowAuditRecord data={data}></ShowAuditRecord>}
            onChange={() => setShowModal(false)}
          ></ModalDialog>
        </Row>
      ) : (
        <Form name="basic" onFinish={onFinish} form={form} style={{ padding: '40px' }}>
          <Form.Item
            label="审核结果"
            name="auditResult"
            rules={[{ required: true, message: '请选择审核结果!' }]}
          >
            <Radio.Group onChange={onChangeRadio}>
              {/* <Radio.Button value="0">待审核</Radio.Button> */}
              <Radio.Button value="1">审核通过</Radio.Button>
              <Radio.Button value="2">驳回</Radio.Button>
            </Radio.Group>
          </Form.Item>

          {AuditResult == '2' ? (
            <Form.Item name="refuseReason" label=" 驳回原因">
              <Input.TextArea />
            </Form.Item>
          ) : (
            ''
          )}

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              提交上线
            </Button>
          </Form.Item>
        </Form>
      )}

      {/* className="basic-l" */}
    </div>
  )
}
export default AuditProcessing
