import React, { useEffect, useState } from 'react'
import { Row, Col, Form, DatePicker, InputNumber, Button, Modal, Input, Select } from 'antd';
import { FieldTimeOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

import './index.less'

const Itinerary: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };
  const showModal = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setTimeout(() => {
      setVisible(false);
    }, 2000);
  };
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 19 },
  };
  return (
    <div className='Itinerary__root'>
      <Row>
        <Col span={12}>
          <Form.Item
            label="出行时间"
            name="username"
          >
            <DatePicker placeholder='固定时间' />
            <DatePicker placeholder='约定时间' />

          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="截止下单时间"
            name="username"
          >
            出发前
            <InputNumber size="large" min={1} max={100000} defaultValue={3} />
            小时
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <div className='content'>
          <div className='header'>
            <Button type="primary" icon={<FieldTimeOutlined />} >
              10/22
            </Button>
          </div>


          <div className='body'>
            <div className='dataItem'>
              <span className='must'>*</span><span className='title'> 始发地 </span><Button>北京</Button>
            </div>
          </div>
          <div className='footer'>
            <Button onClick={showModal} icon={<PlusOutlined />} type="dashed">添加酒店</Button>
            <Button type="dashed">添加景区</Button>
            <Button type="dashed">添加饭店</Button>
            <Button type="dashed">行程+1天</Button>
            <span style={{ marginLeft: 40 }} className='must'>*</span>
            <span className=''>库存</span>
            <InputNumber style={{ marginLeft: 10 }} size="small" min={1} max={100000} defaultValue={3} />
          </div>
        </div>
      </Row>
      <Modal
        centered
        title="添加酒店"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        cancelText='取消'
        okText='保存提交'
      >
        <Row>
          <Col span={12}>
            <Form.Item {...layout} name="note" label="酒店名称" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item {...layout} name="gender" label="选择房型" rules={[{ required: true }]}>
              <Select
                placeholder="房型"
                // onChange={onGenderChange}
                allowClear
              >
                <Option value="male">大床放</Option>
                <Option value="female">双人床</Option>
                <Option value="other">套房</Option>
              </Select>
            </Form.Item>
            <Form.Item {...layout} name={['user', 'introduction']} label="其他备注">
              <Input.TextArea placeholder='可填写：酒店距景区' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <div className='mapView'>
              地图模块
            </div>
          </Col>
        </Row>
      </Modal>
    </div>
  )
}

export default Itinerary

