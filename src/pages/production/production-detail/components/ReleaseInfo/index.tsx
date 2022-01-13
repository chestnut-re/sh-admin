import useQuery from '@/hooks/useQuery'
import { ProductionAuditService } from '@/service/ProductionAuditService'
import { useStore } from '@/store/context'
import { Button, Form, Input, InputNumber, Radio, RadioChangeEvent, Switch } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Commission from './Commission'
import './index.less'

/**
 * 发布信息 审核
 */
const ReleaseInfo: React.FC = () => {
  const history = useHistory()
  const query = useQuery()
  const { productionDetailStore } = useStore()

  const [form] = Form.useForm()
  const [commission, setCommission] = useState<any>({})
  const [checkState, setCheckState] = useState<boolean>(false)

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
        postData.isDeduction = postData.isDeduction ? 0 : 1
        postData.isHot = postData.isHot ? 0 : 1
        postData.distPlan = postData.distPlanId.channelPlanList.map((item) => {
          return {
            channelId: item.id,
            channelName: item.channelName,
            distScale: item.directScale,
            planName: postData.distPlanId.planName,
          }
        })

        postData.saleScale = postData.distPlanId.saleScale
        postData.saleSettleDay = postData.distPlanId.saleSettleDay
        postData.saleSettleType = postData.distPlanId.saleSettleType

        postData.distPlanId = postData.distPlanId.id
        postData.id = query.get('id')

        console.log(postData)
        ProductionAuditService.publishAudit(postData).then((res) => {
          if (res.code === '200') {
            history.goBack()
          }
        })
      })
      .catch((e) => {
        console.error(e)
      })
  }

  const _onCheckStateChange = (e: RadioChangeEvent) => {
    setCheckState(e.target.value !== 1)
  }

  return (
    <div className="ReleaseInfo__root">
      <h4>4. 发布信息</h4>
      <Form name="basic" initialValues={{ remember: true }} autoComplete="off" form={form} {...layout}>
        <Form.Item label="审核结果" name="checkState" rules={[{ required: true }]}>
          <Radio.Group onChange={_onCheckStateChange}>
            <Radio value={1}>通过</Radio>
            <Radio value={2}>驳回</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="原因" name="checkMag" rules={[{ required: checkState }]}>
          <Input />
        </Form.Item>
        <Form.Item label="添加库存" name="stock" rules={[{ required: true }]}>
          <InputNumber addonAfter="/出发日" min={0} />
        </Form.Item>
        <Form.Item label="代币抵现" name="isDeduction" rules={[{ required: true }]}>
          <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
        </Form.Item>
        <Form.Item label="是否热销" name="isHot" rules={[{ required: true }]}>
          <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked />
        </Form.Item>
        <Form.Item label='最多可抵"现售价"' name="deductionScale" rules={[{ required: true }]}>
          <InputNumber min={0} addonAfter="%" />
        </Form.Item>
        <Form.Item {...layout} label="手工补量" style={{ marginBottom: 0 }}>
          <Form.Item
            label="补销量"
            name="shamSales"
            rules={[{ required: true }]}
            style={{ display: 'inline-block', width: 'calc(20% - 8px)' }}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            label="补点赞量"
            name="shamLikes"
            rules={[{ required: true }]}
            style={{ display: 'inline-block', width: 'calc(20% - 8px)', margin: '0 8px' }}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            label="补分享量"
            name="shamShares"
            rules={[{ required: true }]}
            style={{ display: 'inline-block', width: 'calc(20% - 8px)', margin: '0 8px' }}
          >
            <InputNumber min={0} />
          </Form.Item>
        </Form.Item>

        <div>
          预估计利润：xxx <p>预估利润 = 现售价 - 供应成本价</p>
        </div>

        <Form.Item label="分佣方案" name="distPlanId" rules={[{ required: true }]}>
          <Commission onChange={_onCommissionChange} />
        </Form.Item>
        {/* <div>{JSON.stringify(commission)}</div> */}

        <Button onClick={_submit}>提交发布</Button>
      </Form>
    </div>
  )
}

export default observer(ReleaseInfo)
