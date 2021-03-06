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

  const [goodsLimit, setGoodsLimit] = useState(true)
  const [goodsLimitUp, setGoodsLimitUp] = useState(false)

  const [refundAndChangePolicyContent, setRefundAndChangePolicyContent] = useState('')

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
      goodsType: productionStore.data.goodsType,
      goodsNickName: productionStore.data.goodsNickName,
      refundAndChangePolicy: productionStore.data.refundAndChangePolicy,
      promotionalImageUrl: productionStore.data.promotionalImageUrl,
      purchaseConfig: {
        purchaseDay: productionStore.data.purchaseConfig?.purchaseDay || 180,
        purchaseNum: productionStore.data.purchaseConfig?.purchaseNum,
        addType: productionStore.data.purchaseConfig?.addType,
        addNum: productionStore.data.purchaseConfig?.addNum,
        finishNum: productionStore.data.purchaseConfig?.finishNum,
      },
    })
    setRefundAndChangePolicyContent(productionStore.data.refundAndChangePolicyContent)

    setGoodsLimit(productionStore.data.isPurchase !== 0)

    if (productionStore.data.isPurchaseAdd === 1) {
      setGoodsLimitUp(true)
    }
  }, [productionStore.data])

  const validate = () => {
    return form.validateFields()
  }

  const next = () => {
    console.log('BaseInfo next')
    const value = form.getFieldsValue()
    if (!value.purchaseConfig) {
      value.purchaseConfig = {}
    }
    if (!goodsLimit) {
      value.purchaseConfig.purchaseDay = 0
      value.purchaseConfig.purchaseNum = 0
    }
    if (!goodsLimitUp) {
      value.purchaseConfig.addType = null
      value.purchaseConfig.addNum = 0
    }
    value.isPurchase = goodsLimit ? 1 : 0
    value.isPurchaseAdd = goodsLimitUp ? 1 : 0
    console.log(value)
    value.refundAndChangePolicyContent = refundAndChangePolicyContent
    productionStore.addBaseInfo(value)
  }

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  }

  const onChangePolicyContent = (content) => {
    setRefundAndChangePolicyContent(content)
  }

  return (
    <Form {...layout} form={form} colon={false} size="large" name="product-release" className="BaseInfo_root">
      <Row>
        <Col span={20}>
          <Form.Item name="goodsTypeTag" label="商品分类">
            <ProductionTag />
          </Form.Item>
          <Form.Item
            name="goodsName"
            label="商品主标题"
            rules={[
              {
                required: true,
                message: '请输入商品主标题',
                validator: async (_, names) => {
                  if (!names.trim()) {
                    return Promise.reject(new Error('请输入商品主标题！'))
                  }
                },
              },
            ]}
          >
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
          <Form.Item label="商品限购">
            <Row>
              <Col span={2} className="switch">
                <Switch
                  checked={goodsLimit}
                  checkedChildren="开启"
                  unCheckedChildren="关闭"
                  onChange={(checked) => {
                    setGoodsLimit(checked)
                  }}
                />
              </Col>
              {goodsLimit && (
                <>
                  <Col span={3}>
                    <Form.Item name={['purchaseConfig', 'purchaseDay']} label="">
                      <InputNumber
                        className="input-number"
                        addonAfter="天"
                        min={0}
                        step={1}
                        defaultValue={180}
                        formatter={(value: any) => {
                          if (value) {
                            return Math.floor(value)
                          }
                          return value
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={19}>
                    <Form.Item name={['purchaseConfig', 'purchaseNum']} label="">
                      <InputNumber
                        className="input-number"
                        addonBefore="限购"
                        addonAfter="份"
                        min={0}
                        step={1}
                        formatter={(value: any) => {
                          if (value) {
                            return Math.floor(value)
                          }
                          return value
                        }}
                      />
                    </Form.Item>
                  </Col>
                </>
              )}
            </Row>
            <div className="buy-tips">用户首次下单成功日起算，儿童票不占限额</div>
          </Form.Item>

          {goodsLimit && (
            <Form.Item label="限购提升">
              <Row>
                <Col span={2} className="switch">
                  <Switch
                    checked={goodsLimitUp}
                    checkedChildren="开启"
                    unCheckedChildren="关闭"
                    onChange={(checked) => {
                      setGoodsLimitUp(checked)
                    }}
                  />
                </Col>

                {goodsLimitUp && (
                  <>
                    <Col span={4}>
                      <Form.Item name={['purchaseConfig', 'addType']} label="用户分享商品且">
                        <Select>
                          {/* 限购上限增加任务类型1下单付款，2订单核销*/}
                          <Select.Option value={1}>下单付款</Select.Option>
                          <Select.Option value={2}>订单核销</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item name={['purchaseConfig', 'finishNum']} label="">
                        <InputNumber
                          className="input-number"
                          addonAfter="笔订单"
                          min={0}
                          step={1}
                          formatter={(value: any) => {
                            if (value) {
                              return Math.floor(value)
                            }
                            return value
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={14}>
                      <Form.Item name={['purchaseConfig', 'addNum']} label="">
                        <InputNumber
                          className="input-number"
                          addonBefore="限购加"
                          addonAfter="份"
                          min={0}
                          formatter={(value: any) => {
                            if (value) {
                              return Math.floor(value)
                            }
                            return value
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </>
                )}
              </Row>
            </Form.Item>
          )}

          <Form.Item name="refundAndChangePolicy" label="退改政策">
            <Policy onChangeContent={onChangePolicyContent} />
          </Form.Item>
        </Col>
        {/* <Col span={8}>
          <Form.Item name="promotionalImageUrl" label="">
            <UploadImage />
          </Form.Item>
        </Col> */}
      </Row>
    </Form>
  )
}

export default observer(BaseInfo, { forwardRef: true })
