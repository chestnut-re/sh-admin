import React, { FC, useEffect, useState, useImperativeHandle, useRef, forwardRef } from 'react'
import { Row, Col, Form, DatePicker, InputNumber, Button, Modal, Input, Select, Tabs, Radio } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TabPane } = Tabs;

import './index.less'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {

}

const initialPanes = [
  { title: '10/22', content: 'Content of Tab 1', key: '1' },
];
const Itinerary = (props, ref) => {
  const [form] = Form.useForm();

  const [visible, setVisible] = React.useState(false)
  const [panes, setPanes] = useState(initialPanes)
  const [newTabIndex, setNewTabIndex] = useState(0)
  const [activeKey, setActiveKey] = useState('1')
  const [modalType, setModalType] = useState({})

  const [addData, setAddData] = useState([] as any[])
  const [newAddDataIndex, setNewAddDataIndex] = useState(0)

  useEffect(() => {
    addItinerary()
  }, [])

  useImperativeHandle(ref, () => ({
    formItineraryFields: form,
  }));

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };
  /**
   * 添加信息
   * @param type 
   */
  const showModal = (type) => {
    switch (type) {
      case 'addHotel':
        setModalType({
          type: 'addHotel',
          modalTitle: '添加酒店'
        })
        setVisible(true);
        break
      case 'addScenic':
        setModalType({
          type: 'addScenic',
          modalTitle: '添加景区'
        })
        setVisible(true);
        break
      case 'addMeal':
        setModalType({
          type: 'addMeal',
          modalTitle: '添加饭店'
        })
        setVisible(true);
        break
      case 'addTravel':
        setModalType({
          type: 'addTravel',
          modalTitle: '交通信息'
        })
        setVisible(true);
        break
      default:
        setVisible(false);
        break
    }
  };

  const handleOk = () => {
    const todoList = [...addData];   //浅拷贝一下
    todoList.map((item, key) => {
      if (key == todoList.length - 1) {
        item.data.map((item) => {
          item.name = '123'
        })
      }
    })
    setAddData(todoList)
    setVisible(false);
  };
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 19 },
  };
  /**
   * 添加一条数据
   */


  /**
   * 添加一天的数据
   */
  const addTabs = () => {
    setNewTabIndex(newTabIndex + 1)
    const activeKey = `newTab${newTabIndex}`;
    panes.push({ title: '10/22', content: `${activeKey}`, key: activeKey });
    setPanes(panes)
  }
  /**
   * 删除
   */
  const removeTabs = targetKey => {
    if (panes.length <= 1) {
      alert('只剩一条信息了')
      return
    }
    let newActiveKey = activeKey;
    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter(pane => pane.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setPanes(newPanes)
    setActiveKey(newActiveKey)
  }

  const onEdit = (targetKey, action) => {
    if (action === 'remove') {
      removeTabs(targetKey)
    }
  };

  const onTabsChange = activeKey => {
    setActiveKey(activeKey)
    console.log('item', activeKey)
  }


  /**
   * 添加一天行程
   */

  const addItinerary = () => {
    setNewAddDataIndex(newAddDataIndex + 1)
    const addDataId = `newID${newAddDataIndex}`;

    addData.push({
      id: addDataId,
      title: `第${newAddDataIndex + 1}天`,
      data: []
    })
    setAddData(addData)
  }

  const operations = <Button onClick={addTabs}>复制</Button>;


  return (
    <div className='Itinerary__root'>
      <Form form={form}>
        <Row>
          <Col span={8}>
            <Form.Item
              label="出行时间"
              name="username"
              help="至少出行前48小时，最长不得超过45天"
              {...layout}
            >
              <Radio.Group defaultValue="a" buttonStyle="solid">
                <Radio.Button value="a">固定时间</Radio.Button>
                <Radio.Button value="b">约定时间</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={4}>
            <div className='limitTime'>
              <div className='label'>截止下单时间</div>
              <span className='text'>出发前</span>
              <div className='inputNumber'>
                <InputNumber style={{ width: 30 }} controls={false} size="small" min={1} max={100} defaultValue={1} />
              </div>
              <span className='text'>小时</span>
            </div>
          </Col>
          <Col span={8}>
            <div className='limitTime'>
              <div className='label'>退款截止时间</div>
              <span className='text'>出发前</span>
              <div className='inputNumber'>
                <InputNumber style={{ width: 30 }} controls={false} size="small" min={1} max={100} defaultValue={1} />
              </div>
              <span className='text'>小时</span>
            </div>
          </Col>
        </Row>
        <Row>
          <div className='content'>
            <div className='body'>
              <Tabs
                type="editable-card"
                hideAdd
                onChange={onTabsChange}
                activeKey={activeKey}
                onEdit={onEdit}
                tabBarExtraContent={operations}
              >
                {panes.map(pane => (
                  <TabPane tab={pane.title} key={pane.key}>
                    {pane.key == '1' && (
                      <div className='addDataView'>
                        {addData && addData.map((item, index) => (
                          <div key={`item${index}`} className='item'>
                            <div className='itineraryTitle'>
                              {item['title']}
                            </div>
                            {item['data'].map((items, j) => (
                              <div key={`index${j}`}>
                                {items['name']}
                              </div>
                            ))}

                          </div>
                        ))}
                      </div>
                    )}
                  </TabPane>
                ))}
              </Tabs>
            </div>

            <div className='footer'>
              <div className='item'>
                <Button icon={<PlusOutlined />} onClick={() => showModal('addHotel')} type="dashed">添加酒店</Button>
                <Button icon={<PlusOutlined />} onClick={() => showModal('addScenic')} type="dashed">添加景区</Button>
                <Button icon={<PlusOutlined />} onClick={() => showModal('addMeal')} type="dashed">添加饭店</Button>
                <Button icon={<PlusOutlined />} onClick={() => showModal('addTravel')} type="dashed">添加交通</Button>
                <Button icon={<PlusOutlined />} onClick={addItinerary} type="dashed">行程+1天</Button>
                <Button type="dashed">添加一条</Button>
              </div>
              <div className='item'>
                现售价 合计：￥ 1000
              </div>
            </div>
          </div>
        </Row>
        <Modal
          centered
          title={modalType['modalTitle']}
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          width={1000}
          cancelText='取消'
          okText='保存提交'
        >
          <Row>
            {/* 添加酒店 */}
            {modalType['type'] === 'addHotel' && (
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
                  <Input.TextArea placeholder='可填写：酒店距景区' />
                </Form.Item>
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
                  <Input.TextArea placeholder='可填写：该景点的独有的特点，或其他优势' />
                </Form.Item>
              </Col>
            )}
            {/* 添加吃饭 */}
            {modalType['type'] === 'addMeal' && (
              <Col span={12}>
                <Form.Item {...layout} name="note" label="饭店名称" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item {...layout} name="note" label="团餐人限" >
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
                  <Input.TextArea placeholder='可填写：该景点的独有的特点，或其他优势' />
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
                  <Input.TextArea placeholder='可填写：优势信息' />
                </Form.Item>
              </Col>
            )}

            <Col span={12}>
              <div className='mapView'>
                地图模块
              </div>
            </Col>
          </Row>
        </Modal>
      </Form>
    </div>
  )
}


const WrappedForm = forwardRef(Itinerary);
export default WrappedForm;

