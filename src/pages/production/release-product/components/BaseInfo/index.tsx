import React, { useImperativeHandle, useRef, forwardRef, useState, useEffect } from 'react'
import { Form, Input, Row, Col, Upload, Select, Image, Spin, message } from 'antd'
import './index.less'
import ProductionTag from '../ProductionTag'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react-lite'
import UploadImage from '@/components/formItem/UploadImage'

/**
 * 基础信息
 */
const BaseInfo = (props, ref) => {
  const { productionStore } = useStore()
  const [form] = Form.useForm()

  useImperativeHandle(ref, () => ({
    next,
  }))

  useEffect(() => {
    console.log('BaseInfo useEffect')
    form.setFieldsValue({
      goodsTypeTag: productionStore.data.goodsTypeTag,
      goodsName: productionStore.data.goodsName,
      goodsNickName: productionStore.data.goodsNickName,
      refundAndChangePolicy: productionStore.data.refundAndChangePolicy,
      promotionalImageUrl: productionStore.data.promotionalImageUrl,
    })
  }, [])

  const next = () => {
    console.log('BaseInfo next')
    const value = form.getFieldsValue()
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
        <Col span={12}>
          <Form.Item name="goodsTypeTag" label="商品类型标签">
            <ProductionTag />
          </Form.Item>
          <Form.Item name="goodsName" label="商品主标题">
            <Input />
          </Form.Item>
          <Form.Item name="goodsNickName" label="商品副标题">
            <Input />
          </Form.Item>
          <Form.Item name="refundAndChangePolicy" label="退改政策">
            <Input />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item name="promotionalImageUrl" label="">
            <UploadImage />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default observer(BaseInfo, { forwardRef: true })
