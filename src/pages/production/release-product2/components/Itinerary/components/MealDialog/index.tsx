import { Modal } from 'antd'
import React from 'react'

const HotelDialog = () => {
  return (
    <Modal
      centered
      title={modalType['modalTitle']}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={1000}
      cancelText="取消"
      okText="保存提交"
    >
      <Row>
        {/* 添加酒店 */}
        {modalType['type'] === 'addHotel' && (
          <Col span={12}>
            <Form form={hotelForm}>
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
              <Form.Item {...layout} label="供应成本价格" style={{ marginBottom: 0 }}>
                <Form.Item
                  name="year"
                  rules={[{ required: true }]}
                  style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                >
                  <Input placeholder="成人价" />
                </Form.Item>
                <Form.Item
                  name="month"
                  rules={[{ required: true }]}
                  style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                >
                  <Input placeholder="儿童价" />
                </Form.Item>
              </Form.Item>
              <Form.Item {...layout} label="市场标价" style={{ marginBottom: 0 }}>
                <Form.Item
                  name="year"
                  rules={[{ required: true }]}
                  style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                >
                  <Input placeholder="成人价" />
                </Form.Item>
                <Form.Item
                  name="month"
                  rules={[{ required: true }]}
                  style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                >
                  <Input placeholder="儿童价" />
                </Form.Item>
              </Form.Item>
              <Form.Item {...layout} label="现售价" style={{ marginBottom: 0 }}>
                <Form.Item
                  name="year"
                  rules={[{ required: true }]}
                  style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                >
                  <Input placeholder="成人价" />
                </Form.Item>
                <Form.Item
                  name="month"
                  rules={[{ required: true }]}
                  style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                >
                  <Input placeholder="儿童价" />
                </Form.Item>
              </Form.Item>
              <Form.Item {...layout} name={['user', 'introduction']} label="其他备注">
                <Input.TextArea placeholder="可填写：酒店距景区" />
              </Form.Item>
            </Form>
          </Col>
        )}
        {/* 添加景点 */}
        {modalType['type'] === 'addScenic' && (
          <Col span={12}>
            <Form.Item {...layout} name="note" label="景点名称" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item {...layout} name="note" label="游览时长" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item {...layout} label="门票成本价格" style={{ marginBottom: 0 }}>
              <Form.Item
                name="year"
                rules={[{ required: true }]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
              >
                <Input placeholder="成人价" />
              </Form.Item>
              <Form.Item
                name="month"
                rules={[{ required: true }]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
              >
                <Input placeholder="儿童价" />
              </Form.Item>
            </Form.Item>
            <Form.Item {...layout} label="门票标价" style={{ marginBottom: 0 }}>
              <Form.Item
                name="year"
                rules={[{ required: true }]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
              >
                <Input placeholder="成人价" />
              </Form.Item>
              <Form.Item
                name="month"
                rules={[{ required: true }]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
              >
                <Input placeholder="儿童价" />
              </Form.Item>
            </Form.Item>
            <Form.Item {...layout} label="现售价" style={{ marginBottom: 0 }}>
              <Form.Item
                name="year"
                rules={[{ required: true }]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
              >
                <Input placeholder="成人价" />
              </Form.Item>
              <Form.Item
                name="month"
                rules={[{ required: true }]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
              >
                <Input placeholder="儿童价" />
              </Form.Item>
            </Form.Item>
            <Form.Item {...layout} name={['user', 'introduction']} label="其他备注">
              <Input.TextArea placeholder="可填写：该景点的独有的特点，或其他优势" />
            </Form.Item>
          </Col>
        )}
        {/* 添加吃饭 */}
        {modalType['type'] === 'addMeal' && (
          <Col span={12}>
            <Form.Item {...layout} name="note" label="饭店名称" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item {...layout} name="note" label="团餐人限">
              <Input />
            </Form.Item>
            <Form.Item {...layout} label="团餐成本价" style={{ marginBottom: 0 }}>
              <Form.Item
                name="year"
                rules={[{ required: true }]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
              >
                <Input placeholder="成人价" />
              </Form.Item>
              <Form.Item
                name="month"
                rules={[{ required: true }]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
              >
                <Input placeholder="儿童价" />
              </Form.Item>
            </Form.Item>
            <Form.Item {...layout} label="市场标价" style={{ marginBottom: 0 }}>
              <Form.Item
                name="year"
                rules={[{ required: true }]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
              >
                <Input placeholder="成人价" />
              </Form.Item>
              <Form.Item
                name="month"
                rules={[{ required: true }]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
              >
                <Input placeholder="儿童价" />
              </Form.Item>
            </Form.Item>
            <Form.Item {...layout} label="现售价" style={{ marginBottom: 0 }}>
              <Form.Item
                name="year"
                rules={[{ required: true }]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
              >
                <Input placeholder="成人价" />
              </Form.Item>
              <Form.Item
                name="month"
                rules={[{ required: true }]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
              >
                <Input placeholder="儿童价" />
              </Form.Item>
            </Form.Item>

            <Form.Item {...layout} name={['user', 'introduction']} label="其他备注">
              <Input.TextArea placeholder="可填写：该景点的独有的特点，或其他优势" />
            </Form.Item>
          </Col>
        )}

        {/* 添加出行 */}
        {modalType['type'] === 'addTravel' && (
          <Col span={12}>
            <Form.Item {...layout} name="note" label="交通方式" rules={[{ required: true }]}>
              <Select defaultValue="火车" style={{ width: 120 }}>
                <Option value="火车">火车</Option>
                <Option value="飞机">飞机</Option>
                <Option value="汽车">汽车</Option>
              </Select>
            </Form.Item>

            <Form.Item {...layout} name={['user', 'introduction']} label="其他备注">
              <Input.TextArea placeholder="可填写：优势信息" />
            </Form.Item>
          </Col>
        )}
        {modalType['type'] === 'addAData' && (
          <Col span={12}>
            <Form.Item {...layout} label="添加信息">
              <Input.TextArea
                onChange={addADataInput}
                value={itineraryData['travelTitle']}
                placeholder="可填写：优势信息"
              />
            </Form.Item>
          </Col>
        )}
        {modalType['type'] !== 'addAData' && (
          <Col span={12}>
            <div className="mapView">地图模块</div>
          </Col>
        )}
      </Row>
    </Modal>
  )
}

export default HotelDialog
