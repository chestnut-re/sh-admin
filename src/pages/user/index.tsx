import React, { useState, useEffect } from 'react'
import { Form, Col, Row, Button, Table, Space } from 'antd'
// import './index.less'
import AEUserDialog, { DialogMode } from './components/aeUserDialog'
import { usersQueryList } from '@/service/user'
import { HttpCode } from '@/constants/HttpCode'
// import { format } from 'path'
import { InputTemp, SelectEmployeeStatusTemp, SelectRegisterChannel } from '@/components/filter/formItem'

/**
 * App营销-Banner管理-List
 */
const BannerListPage: React.FC = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState()

  const [showDialog, setShowDialog] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const [dialogMode, setDialogMode] = useState<DialogMode>('add')
  useEffect(() => {
    form.setFieldsValue({
      employeeStatus: 0,
      registerChannel: 1,
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
    },
    {
      title: '用户姓名',
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
      title: '注册渠道',
      dataIndex: 'registerChannel',
      render: (text: any, record: any) => {
        const regCode = {
          1: '扫码',
          2: '任务分享',
          3: '商品分享',
          4: 'app自然流量',
          5: '小程序自然流量',
        }
        return regCode[record.registerChannel]
      },
    },
    {
      title: '转身份时间',
      dataIndex: 'changeUserTypeTime',
    },

    {
      title: '转身份操作人',
      dataIndex: 'operationUser',
    },

    // {
    //   title: '操作',
    //   render: (text: any, record: any) => (
    //     <Space size="middle">
    //       <Button onClick={() => _editDialog(record)}>编辑</Button>
    //       <Button onClick={() => _delItem(record)}>删除</Button>
    //     </Space>
    //   ),
    // },
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
  // const _editDialog = (record) => {
  //   setDialogMode('edit')
  //   setSelectedData(record)
  //   setShowDialog(true)
  // }

  const onValuesFailed = () => {
    form
      .validateFields()
      .then((formData) => {
        //edit

        loadData(pageIndex)
        console.log(formData, '----')
      })
      .catch((e) => {
        console.error(e)
      })
  }

  const onFinish = () => {
    setShowDialog(true)
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
        <Form name="basic" initialValues={{ remember: true }} onValuesChange={onValuesFailed} form={form}>
          <Row gutter={[10, 0]}>
            <Col span={1} className="table-from-label">
              用户类型
            </Col>
            <Col span={4}>
              <SelectEmployeeStatusTemp name="employeeStatus" />
            </Col>
            <Col span={1} className="table-from-label">
              注册途径
            </Col>
            <Col span={3}>
              <SelectRegisterChannel name="registerChannel" />
            </Col>
            <Col span={1} className="table-from-label">
              关键词
            </Col>
            <Col span={3}>
              <InputTemp name="keyword" />
            </Col>
            <Form.Item wrapperCol={{ offset: 2, span: 0 }}>
              <Space>
                <Button type="primary" htmlType="submit" onClick={() => loadData(1)}>
                  查询
                </Button>
                <Button type="primary" htmlType="submit" onClick={onFinish}>
                  添加
                </Button>
              </Space>
            </Form.Item>
          </Row>
        </Form>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        scroll={{ x: 'max-content' }}
        dataSource={[...data]}
        pagination={{
          onChange: setPageIndex,
          showSizeChanger: true,
          showQuickJumper: true,
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
