import useQuery from '@/hooks/useQuery'
import { ProductionAuditService } from '@/service/ProductionAuditService'
import { ProductionService } from '@/service/ProductionService'
import { useStore } from '@/store/context'
import { Button, Form, Input, InputNumber, message, Radio, Switch } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Commission from './Commission'
import './index.less'

/**
 * 上架申请
 */
const CenterPutOnRequest: React.FC = () => {
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
        const savePlan = postData.distPlanId
        postData.distPlan = savePlan?.distPlan
        postData.distPlanId = savePlan.distPlanId
        postData.goodsId = query.get('id')
        
        console.log(postData)
        ProductionService.centerPutOnRequest(postData).then((res) => {
          if (res.code === '200') {
            message.success('上架申请提交成功')
            history.goBack()
          }
        })
      })
      .catch((e) => {
        console.error(e)
      })
  }

  return (
    <div className="CenterPutOnRequest__root">
      <h4>5. 上架申请</h4>
      <Form name="basic" initialValues={{ remember: true }} autoComplete="off" form={form} {...layout}>
        <Form.Item label="分佣方案" name="distPlanId" rules={[{ required: true }]}>
          <Commission onChange={_onCommissionChange} />
        </Form.Item>
        <div>{JSON.stringify(commission)}</div>

        <Button onClick={_submit}>提交申请</Button>
      </Form>
    </div>
  )
}

export default observer(CenterPutOnRequest)