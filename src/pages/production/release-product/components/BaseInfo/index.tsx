
import React, { useImperativeHandle, useRef, forwardRef, useState } from 'react'
import { Form, Input, Row, Col, Upload, Select, Image, Spin, message } from 'antd'
import debounce from 'lodash/debounce';
import { observer } from 'mobx-react-lite'

import { sortList } from '@/service/ProductionService'
import { FileService } from '@/service/FileService'

import './index.less'
const { Option } = Select;

const BaseInfo = (props, ref) => {
  const [form] = Form.useForm();

  const [productType, setProductType] = useState([])
  const [goodsImg, setGoodsImg] = useState('')


  /**
   * 商品类型标签文本框值变化时回调	
   */
  const fetchRef = useRef(0);
  const [fetching, setFetching] = useState(false);

  useImperativeHandle(ref, () => ({
    formFields: form,
    typeFields: {
      goodsImg
    },
  }));

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  }

  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      setFetching(true);
      setProductType([])
      sortList({ sortName: value }).then(res => {
        setFetching(false);
        setProductType(res.data)
      })
    };

    return debounce(loadOptions, 2000);
  }, [])

  const goodsTypeHandleChange = value => {
    console.log('goodsTypeHandleChangegoodsTypeHandleChange', value)
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return false
  }

  const handleChange = (info) => {
    FileService.uploadImg(info.file).then((res) => {
      const { ossServerUrl, fileUrl } = res.data
      setGoodsImg(`${ossServerUrl}${fileUrl}`)
    })
  }
  return (
    <Form {...layout} form={form} colon={false} size="large" name="product-release">
      <Row>
        <Col span={12}>
          <Form.Item name='goodsTypeTag' label="商品类型标签">
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="请选择商品类型标签"
              onChange={goodsTypeHandleChange}
              onSearch={debounceFetcher}
              notFoundContent={fetching ? <Spin /> : '暂无数据'}
            // onDropdownVisibleChange={() => goodsTypeHandleSearch()}
            >
              {productType && productType.map(item => (
                <Option name={item['sortName']} value={item['id']} key={item['id']}>{item['sortName']}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name='goodsName' label="商品主标题">
            <Input />
          </Form.Item>
          <Form.Item name='goodsNickName' label="商品副标题">
            <Input />
          </Form.Item>
          <Form.Item name={'goodsDetail'} label="商品详情页">

            <div className='productItem'>
              <Input />
              <div className='QRimg'></div>
            </div>

          </Form.Item>
          <Form.Item name={'insuranceAgreement'} label="保险协议">
            <div className='productItem'>
              <Input />
              <div className='QRimg'></div>
            </div>
          </Form.Item>
          <Form.Item name={'refundAndChangePolicy'} label="退改政策">
            <Input />
          </Form.Item>
        </Col>
        <Col span={10}>

          <Upload
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            onChange={handleChange}
            beforeUpload={beforeUpload}
          >
            <div className="upload-item">
              <p className="icon">+</p>
              <div className="addImgTxt">上传商品预览图</div>
              <div className="require">尺寸 336px X 416px</div>
              <div className="require">不大于1M</div>
            </div>
          </Upload>
          {goodsImg && (
            <Image
              width={200}
              src={goodsImg}
              preview={{
                src: goodsImg
              }}
            />
          )}
        </Col>
      </Row>
    </Form>
  )
}


const WrappedForm = forwardRef(BaseInfo);
export default WrappedForm;

