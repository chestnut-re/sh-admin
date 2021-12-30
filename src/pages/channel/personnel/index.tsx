import React, { useState, useEffect } from 'react'
import { Form, Col, Row, Button, Table, Space, Popconfirm } from 'antd'
import { AccountType, InputTemp, PersonalState } from '@/components/filter/formItem'
import './index.less'
import { del, PersonService } from '@/service/PersonService'
import { cityDispose } from '@/utils/tree'
import AEDialog from './component/AEDialog'
import ChannelListTree from '@/components/components/ChannelListTree'
import { DialogMode,createChannel } from '@/utils/enum'

/*
 * 人员管理
 */
const PersonnelManagement: React.FC = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState()

  const [showDialog, setShowDialog] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const [dialogMode, setDialogMode] = useState<DialogMode>('add')

  const [channelId, setChannelId] = useState('')
  const [structure, setStructure] = useState<any[]>([])

  useEffect(() => {
    getChannel()
  }, [])

  useEffect(() => {
    loadData(pageIndex)
  }, [pageIndex, channelId, structure])

  const loadData = (pageIndex) => {
    if (structure == null || structure.length < 1) return
    const params = form.getFieldsValue()
    console.log(params)
    let newChannelId = channelId
    if (!newChannelId) {
      newChannelId = structure[0].id // 设置默认选中 channelId
    }
    PersonService.list({ current: pageIndex, pageSize: pageSize, ...params, channelId: newChannelId }).then((res) => {
      setData(res.data?.records)
      setTotal(res.data?.total)
    })
  }

  /**
   * 请求渠道名称
   */
  const getChannel = () => {
    PersonService.getStructure().then((res) => {
      setStructure(cityDispose([res?.data], 'children'))
    })
  }

  /**渠道修改 */
  const _onSelectStructure = (id) => {
    console.log('id', id)
    console.log('structure', structure)

    if (id) {
      setChannelId(id)
    } else {
      setChannelId(structure[0]?.id ?? '')
    }
  }

  const columns = [
    {
      title: '人员ID',
      dataIndex: 'userId',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '人员名称',
      dataIndex: 'userName',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '责任区域',
      dataIndex: 'address',
    },
    {
      title: '人员类型',
      dataIndex: 'accountType',
      render: (text: any, record: any) => {
        if (record.state == 0) {
          return `渠道账户`
        } else if (record.state == 1) {
          return `内部渠道`
        } else {
          return `外部渠道`
        }
      },
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '归属渠道',
      dataIndex: 'channelName',
    },
    {
      title: '创建平台',
      dataIndex: 'createChannel',
      render: (text: any, record: any) => `${createChannel[record.createChannel]}`
    },
    {
      title: '状态',
      dataIndex: 'state',
      render: (text: any, record: any) => {
        if (record.state == 0) {
          return `禁用`
        } else {
          return `正常`
        }
      },
    },
    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          {/* <Button
            type="primary"
            onClick={() => {
              _editDialog(record)
            }}
          >
            编辑
          </Button> */}
          {/* <Button type="default">查看</Button> */}
          <Popconfirm
            title="确定删除吗"
            onConfirm={() => {
              del({ userId: record.userId }).then(() => {
                loadData(pageIndex)
              })
            }}
            okText="确定"
            cancelText="取消"
          >
            <Button danger>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  /**编辑 */
  const _editDialog = (record) => {
    setDialogMode('edit')
    setSelectedData(record)
    setShowDialog(true)
  }

  /**添加 */
  const showAdd = () => {
    setShowDialog(true)
    setDialogMode('add')
  }

  /**筛选 */
  const onFinish = () => {
    setPageIndex(1)
    loadData(1)
  }

  /**重置 */
  const resetTable = () => {
    form.resetFields()
    setPageIndex(1)
    loadData(1)
  }

  const onPaginationChange = (page: number, pageSize: number) => {
    setPageIndex(page)
    setPageSize(pageSize)
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
    <div className="PersonnelManagement__root">
    

      <Row gutter={[24, 0]}>
        <Col xxl={3} xl={5} lg={7} md={8}>
          {/* <StructureTree structure={structure} onSelectStructure={_onSelectStructure} /> */}
          {structure.length > 0 ? <ChannelListTree structure={structure} onSelectStructure={_onSelectStructure} /> : ''}
        </Col>
        <Col xxl={21} xl={19} lg={17} md={16}>
        <div>
        <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} form={form}>
          <Row gutter={[12, 12]}>
            <Col span={5}>
              <InputTemp name="keyword" placeholder="渠道名称/责任区域" />
            </Col>
            <Col span={1} className="table-from-label">
              状态
            </Col>
            <Col span={3}>
              <PersonalState name="state" />
            </Col>
            <Col span={2} className="table-from-label">
              人员类型
            </Col>
            <Col span={3}>
              {/* name type */}
              <AccountType name="accountType" />
            </Col>
            <Form.Item wrapperCol={{ offset: 4, span: 0 }}>
              <Space size={16}>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button htmlType="button" onClick={resetTable}>
                  重置
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    showAdd()
                  }}
                >
                  添加人员
                </Button>
              </Space>
            </Form.Item>
          </Row>
        </Form>
      </div>

          
          <Table
            rowKey="userId"
            columns={columns}
            scroll={{ x: 'max-content' }}
            dataSource={data}
            pagination={{
              onChange: onPaginationChange,
              showSizeChanger: false,
              showQuickJumper: true,
              pageSize: pageSize,
              total: total,
            }}
          />
        </Col>
      </Row>
      <AEDialog
        data={selectedData}
        mode={dialogMode}
        onSuccess={_onDialogSuccess}
        show={showDialog}
        onClose={_onDialogClose}
      />
    </div>
  )
}

export default PersonnelManagement
