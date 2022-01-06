
import useQuery from '@/hooks/useQuery'
import { ProductionAuditService } from '@/service/ProductionAuditService'
import { useStore } from '@/store/context'
import { Button, Form, Input, InputNumber, Radio, Switch } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Commission from './Commission'
import './index.less'

/**
 * 上架信息 审核
 */
const PutOnInfo: React.FC = () => {
  const history = useHistory()
  const query = useQuery()
  const { productionDetailStore } = useStore()

  const [form] = Form.useForm()
  const [commission, setCommission] = useState<any>({})

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  }

  const _onCommissionChange = (value) => {
    console.log('分佣方案', value)
    setCommission(value)
  }

  /**提交发布 */
  const _submit = () => {
    form
      .validateFields()
      .then((formData) => {
        console.log(formData)
        const postData = { ...formData }
        // postData.isDeduction = postData.isDeduction ? 0 : 1
        // postData.distPlanId = postData.distPlanId.id
        postData.id = query.get('id')
        // postData.distPlan = postData.distPlanId.channelPlanList.map(item=>{
        //   return {
        //     channelId: '',
        //     channelName: '',
        //     distScale: '',
        //     planName: '',
        //   }
        // })
        console.log(postData)
        // ProductionAuditService.putOnAudit(postData).then((res) => {
        //   if (res.code === '200') {
        //     history.goBack()
        //   }
        // })
      })
      .catch((e) => {
        console.error(e)
      })
  }

  return (
    <div className="PutOnInfo__root">
      <h4>5. 上架申请信息</h4>
      {/* <Form name="basic" initialValues={{ remember: true }} autoComplete="off" form={form} {...layout}>
        <Form.Item label="审核结果" name="checkState" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value={1}>通过</Radio>
            <Radio value={2}>驳回</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="原因" name="checkMag" rules={[{ required: false }]}>
          <Input />
        </Form.Item>
        
        {/* <Form.Item label="分佣方案" name="distPlanId" rules={[{ required: true }]}>
          <Commission onChange={_onCommissionChange} />
        </Form.Item>
        <div>{JSON.stringify(commission)}</div> 

        <Button onClick={_submit}>提交发布</Button>
      </Form> */}
      <div className="info">
        <div className="one-info">
          <div>申请渠道 </div>
          <div>责任区域 </div>
        </div>
        <div>申请人 </div>
        <div>申请时间 </div>
        <div>分佣方案 </div>
        <div>表格</div>
      </div>
    </div>
  )
}

export default observer(PutOnInfo)
