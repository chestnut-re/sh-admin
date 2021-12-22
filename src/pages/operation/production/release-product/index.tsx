import React, { useState } from 'react'
import { Button, message, Form, Input, Row, Col, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { ProductionService  } from '@/service/ProductionService'
// const postData = {
import './index.less'

const steps = [
  {
    title: '1. 基础信息',
    index: 0
  },
  {
    title: '2. 行程信息',
    index: 1
  },
  {
    title: '3. 营销信息',
    index: 2
  },
];
/**
 * 运营中心-商品管理-发布商品
 */

const ReleaseProductPage: React.FC = () => {
  const [current, setCurrent] = React.useState(0);
  const [file, setFile] = useState(null);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const onDraft = () => {
    const postData = {
      goodsName: '正道的光'
    }
    ProductionService.save(postData).then((res) => {
      // console.log('post Data post Data', JSON.stringify(res))

    })
  }

  const beforeUpload = file => {
    console.log(file)
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return false;
  }

  const handleChange = info => {
    console.log('infoinfo', info.file)
    const postData = {
      file: info.file,
      fileType: '1'
    }
    ProductionService.uploadFile(postData).then(res => {
      console.log(res)
    })
  }

  
 

  return (
    <div className="ReleaseProduct__root">
      <div className='stepsView'>
        {steps.map(item => (
          <div className={item.index == current ? 'item item-selected' : 'item'} key={item.index}>
            {item.title}
          </div>
        ))}
        <div className='line'/>
      </div>
      <div className="steps-content">
        <div className="title">基础信息</div>
        {current == 0 && (
          <Form {...layout} colon={false} size='large' name="nest-messages">
            <Row>
              <Col span={8}>
                <Form.Item name={['user', 'name']} label='商品类型标签' rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name={['user', 'email']} label="商品主标题" rules={[{ type: 'email' }]}>
                  <Input />
                </Form.Item>
                <Form.Item name={['user', 'age']} label="商品副标题" rules={[{ type: 'number', min: 0, max: 99 }]}>
                  <Input />
                </Form.Item>
                <Form.Item name={['user', 'website']} label="商品详情页">
                  <Input />
                </Form.Item>
                <Form.Item name={['user', 'introduction']} label="保险协议">
                  <Input />
                </Form.Item>
                <Form.Item name={['user', 'introduction']} label="保险协议">
                  <Input />
                </Form.Item>
                <Form.Item label=" ">
                  <div className='btnView'>
                    <div onClick={() => next()} className='nextBtn'>
                      下一步
                    </div>
                    <div onClick={() => onDraft()} className='draftBtn'>
                      保存至草稿箱
                    </div>
                  </div>
                </Form.Item>
              </Col>
              <Col span={12}>
                
                <Form.Item name="dragger" >
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    onChange={handleChange}
                    beforeUpload={beforeUpload}
                  >
                    <div className='upload-item'>
                      <p className='icon'>
                        +
                      </p>
                      <div className='addImgTxt'>上传商品预览图</div>
                      <div className='require'>尺寸 336px X 416px</div>
                      <div className='require'>不大于1M</div>
                    </div>
                  </Upload>
                </Form.Item>
                
                
          
                
                 </Col>
            </Row>
          </Form>
          
        )}
        {current == 1 && (
          <div>
            2
          </div>
        )}
        {current == 2 && (
          <div>
            3
          </div>
        )}
        {/* <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              下一步
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('Processing complete!')}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div> */}
      </div>
    </div>
  )
}

export default ReleaseProductPage
