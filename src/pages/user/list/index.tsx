/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Description: 用户列表
 * @LastEditTime: 2022-01-27 14:33:12
 */
import React, { useState, useEffect } from 'react'
import { Form, Col, Row, Button, Table, Space } from 'antd'
import AEUserDialog, { DialogMode } from './components/aeUserDialog'
import { usersQueryList, userGet } from '@/service/user'
import { regCode } from '@/utils/enum'
import { SelectEmployeeStatusTemp, SelectRegisterChannel } from '@/components/filter/formItem'
import TimeColumn from '@/components/tableColumn/TimeColumn'
// import { AuthEle } from '@/components/Common/AuthEle'
const BannerListPage: React.FC = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState()

  const [showDialog, setShowDialog] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const [dialogMode, setDialogMode] = useState<DialogMode>('add')

  useEffect(() => {
    form.setFieldsValue({
      employeeStatus: 99,
      registerChannel: 99,
      keyword: '',
    })
  }, [])

  useEffect(() => {
    loadData(pageIndex)
  }, [pageIndex])

  const loadData = (pageIndex) => {
    const query = {
      current: pageIndex,
      pageSize: pageSize,
      ...form.getFieldsValue(),
    }
    if (query.registerChannel == 99) delete query.registerChannel
    if (query.employeeStatus == 99) delete query.employeeStatus
    usersQueryList(query).then((res) => {
      console.log(res)
      setData(res.data.records)
      setTotal(res.data.total)
    })
  }

  const columns = [
    {
      title: '序号',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '用户ID',
      dataIndex: 'userId',
    },
    {
      title: '注册时间',
      dataIndex: 'registerTime',
      render: (_text, record: any) => <TimeColumn time={record?.registerTime} />,
    },
    {
      title: '姓名',
      dataIndex: 'realName',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '微信号',
      dataIndex: 'wechatNum',
    },
    {
      title: '常住地址',
      dataIndex: 'address',
    },
    {
      title: '关系归属',
      dataIndex: 'relationChannel',
    },
    {
      title: '注册途径',
      dataIndex: 'registerChannel',
      render: (text: any, record: any) => {
        return regCode[record.registerChannel]
      },
    },
    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          <span className="operation" onClick={() => _editDialog(record)}>
            查看
          </span>
          {/* <Button onClick={() => _delItem(record)}>删除</Button> */}
        </Space>
      ),
    },
  ]

  /**删除 */
  // const _delItem = (record) => {
  // BannerService.del({ id: record.id }).then((res) => {
  //   if (res.code === HttpCode.success) {
  //     loadData(pageIndex)
  //   }
  // })
  // }

  /**编辑 */
  const _editDialog = (record) => {
    console.log(record.userId, 'record')

    userGet(record.userId).then((res) => {
      setDialogMode('edit')
      setSelectedData(res.data)
      setShowDialog(true)
    })
  }

  const onFinish = () => {
    setPageIndex(1)
    loadData(1)
  }

  const _onDialogSuccess = () => {
    setSelectedData(null)
    setShowDialog(false)
    loadData(pageIndex)
  }

  const _onDialogClose = () => {
    setSelectedData(null)
    setShowDialog(false)
  }

  return (
    <div className="channel-list">
      <div>
        {/* <AuthEle id={4}>
          <>
          </>
        </AuthEle> */}
        <Form name="basic" initialValues={{ remember: true }} form={form} onFinish={onFinish}>
          <Row gutter={[10, 0]}>
            <Col span={2} className="table-from-label">
              用户类型
            </Col>
            <Col span={4}>
              <SelectEmployeeStatusTemp name="employeeStatus" />
            </Col>
            <Col span={2} className="table-from-label">
              注册途径
            </Col>
            <Col span={3}>
              <SelectRegisterChannel name="registerChannel" />
            </Col>
            {/* <Col span={1} className="table-from-label">
              关键词
            </Col>
            <Col span={3}>
              <InputTemp name="keyword" />
            </Col> */}
            <Form.Item wrapperCol={{ offset: 1, span: 12 }}>
              <Space>
                <Button htmlType="submit">查询</Button>
                {/* <Button type="primary" htmlType="submit" onClick={onFinish}>
                  添加
                </Button> */}
              </Space>
            </Form.Item>
          </Row>
        </Form>
      </div>
      <Table
        rowKey="userId"
        columns={columns}
        scroll={{ x: 'max-content' }}
        dataSource={[...data]}
        pagination={{
          onChange: setPageIndex,
          showSizeChanger: false,
          showQuickJumper: true,
          current: pageIndex,
          pageSize: pageSize,
          total: total,
        }}
      />
      <AEUserDialog
        data={selectedData}
        mode={dialogMode}
        onSuccess={_onDialogSuccess}
        show={showDialog}
        onClose={_onDialogClose}
      />
    </div>
  )
}

export default BannerListPage
