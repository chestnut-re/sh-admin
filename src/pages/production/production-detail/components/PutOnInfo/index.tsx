import useQuery from '@/hooks/useQuery'
import { ProductionAuditService } from '@/service/ProductionAuditService'
import { useStore } from '@/store/context'
import { Button, Form, Input, InputNumber, message, Radio, RadioChangeEvent, Switch } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Commission from './Commission'
import './index.less'

interface Props {
  presetBonus: number | undefined
}

/**
 * 上架信息 审核
 */
const PutOnInfo: React.FC<Props> = ({ presetBonus }) => {
  const history = useHistory()
  const query = useQuery()
  const { productionDetailStore } = useStore()

  const [form] = Form.useForm()
  const [commission, setCommission] = useState<any>({})
  const [checkState, setCheckState] = useState<boolean>(false)

  useEffect(() => {
    if (presetBonus) {
      form.setFieldsValue({
        presetBonus: presetBonus,
      })
    }
  }, [presetBonus])

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
        postData.id = query.get('channelGoodsId')
        console.log(postData)
        ProductionAuditService.putOnAudit(postData).then((res) => {
          if (res.code === '200') {
            message.success('成功')
            history.goBack()
          } else {
            message.error(res.msg)
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
    <div className="PutOnInfo__root">
      <h4>6. 上架审核处理</h4>
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
        <Form.Item label="团建奖金" name="presetBonus" rules={[{ required: false }]}>
          <InputNumber min={0} defaultValue={presetBonus} readOnly />
        </Form.Item>
        {/* <div>{JSON.stringify(commission)}</div> */}

        <Button onClick={_submit}>提交发布</Button>
      </Form>
    </div>
  )
}

export default observer(PutOnInfo)
