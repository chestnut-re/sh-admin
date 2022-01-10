import { Space, Table, Popconfirm, Form, Row, Col,Tag, Button, DatePicker, Divider, Input, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { ContactsCenterApi } from '@/service/ContactsCenter'
import dayjs from 'dayjs'
import AEDialog from './component/AEDialog'
import { DialogMode } from '@/utils/enum'
import './index.less'
/**
 * 客服中心-客服列表
 */

//每页大小
const PAGE_SIZE = 20

const ContactsCenter: React.FC = () => {
  const [form] = Form.useForm()
  const { RangePicker } = DatePicker
  const [data, setData] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [total, setTotal] = useState()
  const [showDialog, setShowDialog] = useState(false)
  const [dialogMode, setDialogMode] = useState<DialogMode>('add')
  const [selectedData, setselectedData] = useState([])

  //监听页码改变，请求表格数据
  useEffect(() => {
    loadData(pageIndex)
  }, [pageIndex])

  //表格数据增删改
  const contactsUseHandle = (type, item) => {
    switch (type) {
      case 'add':
        setDialogMode('add')
        setselectedData([])
        _onDialogChangeClose()
        break
      case 'edit':
        setDialogMode('edit')
        setselectedData(item)
        _onDialogChangeClose()
        break
      case 'del':
        deleteContactsItem(item)
        break
      default:
        break
    }
  }

  //请求客服列表数据
  const loadData = (pageIndex) => {
    let bodyData = {
      current: pageIndex,
      pageSize: PAGE_SIZE,
      keyword: form.getFieldValue('keyword'),
      createTimeStart:"",
      createTimeEnd:""
    }
    const Times = form.getFieldValue('time')
    if (Times) {
      const [Start, End] = Times
      bodyData = {
        ...bodyData,
        createTimeStart: dayjs(Start).unix()* 1000,
        createTimeEnd: dayjs(End).unix()* 1000,
      }
    }
    ContactsCenterApi.list(bodyData).then((res) => {
      setData(res.data.records)
      setTotal(res.data.total)
    })
  }

  //删除客服
  const deleteContactsItem = (item) => {
    ContactsCenterApi.delete({ id: item.id })
      .then((res) => {
        const { code, data } = res
        if (code === '200' && data) {
          message.success('删除成功')
          onFinish()
        } else {
          message.error('删除失败')
        }
      })
      .catch((err) => {
        message.error('删除失败')
      })
  }

  //增删改刷新列表当前页是1直接请求接口不是1 页面设为1
  const onFinish = () => {
    if (pageIndex === 1) {
      loadData(1)
    } else {
      setPageIndex(1)
    }
  }

  //弹框确定回调
  const _onDialogSuccess = () => {
    onFinish()
    _onDialogChangeClose()
  }
  //弹框显示或关闭
  const _onDialogChangeClose = () => {
    setShowDialog((v) => {
      return !v
    })
  }

  const columns = [
    {
      title: '序号',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '姓名',
      dataIndex: 'userName',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '所属中心',
      dataIndex: 'channelName',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '状态',
      dataIndex: 'state',
      render: (text, record) => (
        <Tag color={record.state?'green':'volcano'}>
              {record.state?'启用':'禁用'}
            </Tag>
      ),
    },
    {
      title: '操作',
      render: (text, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              contactsUseHandle('edit', record)
            }}
          >
            编辑
          </a>
          <Popconfirm
            title="确定要删除该客服吗?"
            onConfirm={() => {
              contactsUseHandle('del', record)
            }}
            okText="确定"
            cancelText="取消"
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ]
  return (
    <div className="centermsg-root">
      <Row>
        <Col span={20} className="add-contacts-search">
          <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} form={form} layout="inline">
            <Form.Item name="keyword" label="姓名/电话">
              <Input maxLength={11} allowClear placeholder="请输入姓名/电话" />
            </Form.Item>
            <Form.Item name="time" label="创建时间">
              <RangePicker />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 2, span: 0 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
        <Col span={4} className="add-contacts-btn">
          <Button
            type="primary"
            onClick={() => {
              contactsUseHandle('add', '')
            }}
          >
            添加客服
          </Button>
        </Col>
      </Row>
      <Divider type="horizontal" />
      <Table
        rowKey="id"
        columns={columns}
        scroll={{ x: 'max-content' }}
        dataSource={[...data]}
        pagination={{
          onChange: setPageIndex,
          showQuickJumper: true,
          pageSize: PAGE_SIZE,
          total: total,
          current:pageIndex
        }}
      />
      <AEDialog
        data={selectedData}
        mode={dialogMode}
        onSuccess={_onDialogSuccess}
        show={showDialog}
        onClose={_onDialogChangeClose}
      />
    </div>
  )
}

export default ContactsCenter
