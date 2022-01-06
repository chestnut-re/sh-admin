import React, { useState, useEffect } from 'react'
import { Form, Col, Row, Button, Table, Space, Radio, DatePicker } from 'antd'
import './index.less'
import { HttpCode } from '@/constants/HttpCode'
import AEDialog, { DialogMode } from './components/AEDialog'
import { InputTemp, StatusRoute } from '@/components/filter/formItem'
import { marketService } from '@/service/marketService'
import TimeColumn from '@/components/tableColumn/TimeColumn'
import DEDialog from './components/DEDialog'
import ActivityGoodsTable from '../app-market/activities/components/ActivityGoodsTable'
const RebateActivity: React.FC = () => {
  const { RangePicker } = DatePicker
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState()
  const [checkState, setCheckState] = useState('')
  const [showDialog, setShowDialog] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const [dialogMode, setDialogMode] = useState<DialogMode>('add')
  const [deShowDialog, setDeShowDialog] = useState(false)
  const [goodsShowDialog, setGoodsShowDialog] = useState(false)
  const [goodsRoleList, setGoodsRoleList] = useState<Array<any>>([])
const [selectRecord,setSelectRecord] =  useState<string>('')
  useEffect(() => {
    loadData(pageIndex)
  }, [pageIndex])

  const loadData = (pageIndex) => {
    const params = form.getFieldsValue()
    console.log(params)

    marketService.list({ current: pageIndex, size: pageSize, ...params }).then((res) => {
      setData(res.data.records)
      setTotal(res.data.total)
    })
  }

  const columns = [
    {
      title: '活动ID',
      render: (text, record, index) => `${index + 1}`,
    },

    {
      title: '活动名称',
      dataIndex: 'name',
    },
    {
      title: '返利比例',
      dataIndex: 'scale',
      render: (text, record, index) => `${record.scale + '%'}`,
    },
    {
      title: '返利方式',
      dataIndex: 'bannerUrl',
    },
    {
      title: '创建时间',
      dataIndex: 'updateTime',
      render: (text, record, index) => <TimeColumn time={record?.updateTime} />,
    },
    {
      title: '关联商品数',
      dataIndex: ' taskInventoryGood',
      render: (text, record, index) => `${(record.taskInventoryGood ?? []).length}`,
    },
    {
      title: '关联任务清单量',
      render: (text, record, index) => `${(record.paperList ?? []).length}`,
    },
    {
      title: '状态',
      dataIndex: 'state',
      render: (text, record, index) => {
        const stateEnum = {
          1: '进行中',
          2: '已结束',
          3: '未开始',
        }
        return `${stateEnum[record.state]}`
      },
    },
    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button onClick={() => _editDialog(record)}>查看</Button>
          <Button onClick={() => _editGoodsDialog(record)}>关联商品</Button>
          <Button onClick={() => _editDialog(record)}>关联清单</Button>
          <Button onClick={() => _editDialog(record)}>数据统计</Button>
          <Button onClick={() => _editDialog(record)}>删除</Button>
        </Space>
      ),
    },
  ]
  const _editGoodsDialog = (record) => {
    const list = (record.taskInventoryGood??[]).map(res=>{
      return res.goodsId
    })
    setSelectRecord(record.id)
    setGoodsShowDialog(true)
    setGoodsRoleList(list)
  }
  const goodsOnSuccess = (rowKeys,rowList)=>{
    console.log(rowKeys,rowList)
    setGoodsShowDialog(false)
  }
  /**删除 */
  const _delItem = (record) => {
    marketService.del({ id: record.id }).then((res) => {
      if (res.code === HttpCode.success) {
        loadData(pageIndex)
      }
    })
  }

  /**编辑 */
  const _editDialog = (record) => {
    setDeShowDialog(!deShowDialog)

    // setDialogMode('edit')
    setSelectedData(record)
    // setShowDialog(true)
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

  const _onDialogSuccess = () => {
    setSelectedData(null)
    setShowDialog(false)
    loadData(pageIndex)
  }

  const _onDialogClose = () => {
    setSelectedData(null)
    setShowDialog(false)
  }

  const onPaginationChange = (page: number, pageSize: number) => {
    setPageIndex(page)
    setPageSize(pageSize)
  }
  const onCloseDetail = () => {
    // setDeShowDialog(false)
  }

  return (
    <div className="rebateActivity__root">
      <div>
        <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} form={form}>
          <Row gutter={[10, 10]}>
            <Col span={1} className="table-from-label"></Col>
            <Col span={3}>
              <Radio.Group
                value={checkState}
                onChange={(value) => {
                  setCheckState(value.target.value)
                }}
              >
                <Radio.Button value="">全部</Radio.Button>
                <Radio.Button value="0">进行中</Radio.Button>
                <Radio.Button value="1">已结束</Radio.Button>
                <Radio.Button value="2">未开始</Radio.Button>
                {/* checkState 0 待审核 1审核通过 2审核不通过 */}
              </Radio.Group>
            </Col>
            {/* <Col span={1} className="table-from-label"></Col> */}
            <Col span={3}>
              <InputTemp name="planName" placeholder="活动ID/活动名称" />
            </Col>
            <Col span={1} className="table-from-label">
              创建时间
            </Col>
            <Col span={3}>
              <Form.Item name="time">
                <RangePicker showTime />
              </Form.Item>
            </Col>
            <Col span={1} className="table-from-label">
              状态
            </Col>
            <Col span={3}>
              <StatusRoute name="state" />
            </Col>

            <Form.Item wrapperCol={{ offset: 2, span: 0 }}>
              <Space>
                <Button type="primary" onClick={showAdd}>
                  添加
                </Button>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button type="primary" onClick={resetTable}>
                  重置
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
          onChange: onPaginationChange,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSize: pageSize,
          total: total,
        }}
      />
      <AEDialog
        data={selectedData}
        mode={dialogMode}
        onSuccess={_onDialogSuccess}
        show={showDialog}
        onClose={_onDialogClose}
      />
      <DEDialog show={deShowDialog} data={selectedData} ></DEDialog>
      <ActivityGoodsTable
        goodsShow={goodsShowDialog}
        onSuccess={goodsOnSuccess}
        goodsIdList={goodsRoleList}
        onClose={() => setGoodsShowDialog(false)}
      ></ActivityGoodsTable>
    </div>
  )
}

export default RebateActivity