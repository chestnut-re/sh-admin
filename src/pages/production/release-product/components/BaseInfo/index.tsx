import React, { useImperativeHandle, useState, useEffect } from 'react'
import { Form, Input, Row, Col, Select, Radio, Switch, InputNumber } from 'antd'
import './index.less'
import ProductionTag from '../ProductionTag'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react-lite'
import UploadImage from '@/components/formItem/UploadImage'
import Policy from './Policy'

interface Props {}

/**
 * 基础信息
 */
const BaseInfo: React.FC<Props> = (props, ref) => {
  const { productionStore } = useStore()
  const [form] = Form.useForm()

  const [goodsLimit, setGoodsLimit] = useState(false)
  const [goodsLimitUp, setGoodsLimitUp] = useState(false)

  useEffect(() => {
    if (!goodsLimit) {
      setGoodsLimitUp(false)
    }
  }, [goodsLimit])

  useImperativeHandle(ref, () => ({
    next,
    validate,
  }))

  useEffect(() => {
    console.log('BaseInfo useEffect')
    form.setFieldsValue({
      goodsTypeTag: productionStore.data.goodsTypeTag,
      goodsName: productionStore.data.goodsName,
      goodsNickName: productionStore.data.goodsNickName,
      refundAndChangePolicy: productionStore.data.refundAndChangePolicy,
      promotionalImageUrl: productionStore.data.promotionalImageUrl,
      purchaseConfig: {
        purchaseDay: productionStore.data.purchaseConfig?.purchaseDay,
        purchaseNum: productionStore.data.purchaseConfig?.purchaseNum,
        addType: productionStore.data.purchaseConfig?.addType,
        addNum: productionStore.data.purchaseConfig?.addNum,
      },
    })

    if (productionStore.data.purchaseConfig?.purchaseDay) {
      setGoodsLimit(true)
    }

    if (productionStore.data.purchaseConfig?.addNum) {
      setGoodsLimitUp(true)
    }
  }, [productionStore.data])

  const validate = () => {
    return form.validateFields()
  }

  const next = () => {
    console.log('BaseInfo next')
    const value = form.getFieldsValue()
    if (!goodsLimit && productionStore.data.purchaseConfig) {
      productionStore.data.purchaseConfig.purchaseDay = null
      productionStore.data.purchaseConfig.purchaseNum = null
    }
    if (!goodsLimitUp && productionStore.data.purchaseConfig) {
      productionStore.data.purchaseConfig.addType = null
      productionStore.data.purchaseConfig.addNum = null
    }
    console.log(value)
    productionStore.addBaseInfo(value)
  }

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  }

  return (
    <Form {...layout} form={form} colon={false} size="large" name="product-release" className="BaseInfo_root">
      <Row>
        <Col span={16}>
          <Form.Item name="goodsTypeTag" label="商品分类">
            <ProductionTag />
          </Form.Item>
          <Form.Item name="goodsName" label="商品主标题" rules={[{ required: true, message: '请输入商品主标题' }]}>
            <Input maxLength={20} />
          </Form.Item>
          <Form.Item name="goodsNickName" label="商品副标题">
            <Input maxLength={40} />
          </Form.Item>
          <Form.Item name="goodsType" label="商品类型">
            <Radio.Group>
              <Radio value={1}>长线</Radio>
              <Radio value={2}>短线</Radio>
            </Radio.Group>
          </Form.Item>

          <Row>
            <Col span={10}>
              <Form.Item label="商品限购">
                <Switch
                  checked={goodsLimit}
                  checkedChildren="开启"
                  unCheckedChildren="关闭"
                  onChange={(checked) => {
                    setGoodsLimit(checked)
                  }}
                />
              </Form.Item>
            </Col>
            {goodsLimit && (
              <>
                <Col span={6}>
                  <Form.Item name={['purchaseConfig', 'purchaseDay']} label="">
                    <InputNumber addonAfter="天" min={0} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name={['purchaseConfig', 'purchaseNum']} label="">
                    <InputNumber addonBefore="限购" addonAfter="份" min={0} defaultValue={180} />
                  </Form.Item>
                </Col>
              </>
            )}
          </Row>

          {goodsLimit && (
            <Row>
              <Col span={10}>
                <Form.Item label="限购提升">
                  <Switch
                    checked={goodsLimitUp}
                    checkedChildren="开启"
                    unCheckedChildren="关闭"
                    onChange={(checked) => {
                      setGoodsLimitUp(checked)
                    }}
                  />
                </Form.Item>
              </Col>
              {goodsLimitUp && (
                <>
                  <Col span={6}>
                    用户分享商品且
                    <Form.Item name={['purchaseConfig', 'addType']} label="">
                      <Select>
                        {/* 限购上限增加任务类型1下单付款，2订单核销*/}
                        <Select.Option value={1}>下单付款</Select.Option>
                        <Select.Option value={2}>订单核销</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item name={['purchaseConfig', 'addNum']} label="">
                      <InputNumber addonBefore="限购加" addonAfter="份" min={0} />
                    </Form.Item>
                  </Col>
                </>
              )}
            </Row>
          )}

          <Form.Item name="refundAndChangePolicy" label="退改政策">
            <Policy />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="promotionalImageUrl" label="">
            <UploadImage />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default observer(BaseInfo, { forwardRef: true })
