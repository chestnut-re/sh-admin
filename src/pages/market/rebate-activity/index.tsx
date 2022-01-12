import React, { useState, useEffect } from 'react'
import { Form, Col, Row, Button, Table, Space, Radio, DatePicker, Modal, message } from 'antd'
import './index.less'
import { HttpCode } from '@/constants/HttpCode'
import AEDialog, { DialogMode } from './components/AEDialog'
import { InputTemp, StatusRoute } from '@/components/filter/formItem'
import { marketService } from '@/service/marketService'
import TimeColumn from '@/components/tableColumn/TimeColumn'
import DEDialog from '@/components/components/Dedialog'
import RebateBasicInfo from './components/BasicInfo/BasicInfo'
import GoodsTable from './components/GoodsTable'
import ActivityTable from './components/ActivityTable'
import ModalDialog from '@/components/components/ModalDialog'
import ShowTaskModal from './components/ShowTaskModal'
import ShowGoodsTaskModal from './components/ShowGoodsTaskModal'
import { formateTime } from '@/utils/timeUtils'
const RebateActivity: React.FC = () => {
  const { RangePicker } = DatePicker
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState()
  const [checkState, setCheckState] = useState('')
  const [showDialog, setShowDialog] = useState(false)
  const [selectedData, setSelectedData] = useState('')
  const [dialogMode, setDialogMode] = useState<DialogMode>('add')
  const [deShowDialog, setDeShowDialog] = useState(false)
  const [goodsShowDialog, setGoodsShowDialog] = useState(false)
  const [goodsRoleList, setGoodsRoleList] = useState<Array<any>>([])
  const [selectRecord, setSelectRecord] = useState<string>('')
  const [rebateName, setrebateName] = useState('')
  const [activityShowDialog, setActivityShowDialog] = useState(false)
  const [activityRoleList, setActivityRoleList] = useState<Array<any>>([])
  const [showGoodsDialog, setShowGoodsDialog] = useState(false)
  const [modalData, setModalData] = useState('')
  const [showType, setShowType] = useState('')
  useEffect(() => {
    loadData(pageIndex)
  }, [pageIndex])

  const loadData = (pageIndex) => {
    const params = form.getFieldsValue()
    const query = { ...params }
    // const query
    if (params.time) {
      query.startTime = formateTime(params.time[0])
      query.endTime = formateTime(params.time[1])
      delete query.time
    }

    marketService.list({ current: pageIndex, size: pageSize, ...query }).then((res) => {
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
      render: (text, record, index) => `${record.scale ?? 0 + '%'}`,
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
      dataIndex: ' goodsList',
      render: (text, record, index) => (
        <div
          onClick={() => {
            setShowType('goods')
            setShowGoodsDialog(true)
            setModalData(JSON.stringify(record.goodsList ?? []))
            console.log(showType)
          }}
        >
          {(record.goodsList ?? []).length}
        </div>
      ),
    },
    {
      title: '关联任务清单量',
      render: (text, record, index) => (
        <div
          onClick={() => {
            const data = (record.paperList ?? []).map((res) => {
              return {
                releTime: res.releTime,
                name: res.name,
                id: res.id,
              }
            })
            setShowType('task')
            setShowGoodsDialog(true)
            // setModalData(JSON.stringify(record.paperList ?? []))
            setModalData(JSON.stringify(data))
          }}
        >
          {(record.paperList ?? []).length}
        </div>
      ),
    },
    {
      title: '状态',
      dataIndex: 'state',
      render: (text, record, index) => {
        const stateEnum = {
          undefined: '全部',
          null: '全部',
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
          <Button onClick={() => _editActivityDialog(record)}>关联清单</Button>
          {/* <Button onClick={() => _editDialog(record)}>数据统计</Button> */}
          <Button onClick={() => _delItem(record)} danger>
            删除
          </Button>
        </Space>
      ),
    },
  ]
  const _editGoodsDialog = (record) => {
    const list = (record.goodsList ?? []).map((res) => {
      return res.goodsId
    })
    setSelectRecord(record.id)
    setrebateName(record.name)
    setGoodsShowDialog(true)
    setGoodsRoleList(list)
  }
  const _editActivityDialog = (record) => {
    const list = (record.paperList ?? []).map((res) => {
      return res.id
    })

    setSelectRecord(record.id)
    setrebateName(record.name)
    setActivityShowDialog(true)
    setActivityRoleList(list)
  }

  const goodsOnSuccess = (rowKeys, rowList) => {
    if (rowList.length > 0) {
      const goodsList = rowList.map((res) => {
        res.goodsId = res.id
        return res
      })
      marketService
        .rebateAuditApply({ rebateId: selectRecord, rebateName: rebateName, type: 1, goodsList: goodsList })
        .then((res) => {
          if (res.code === HttpCode.success) {
            loadData(pageIndex)
          }
        })
    }
    setGoodsShowDialog(false)
    setGoodsRoleList([])
  }
  const activityOnSuccess = (rowKeys, rowList) => {
    if (rowList.length > 0) {
      const List = rowList.map((res) => {
        return res
      })
      marketService
        .rebateAuditApply({ rebateId: selectRecord, rebateName, rebateName, type: 2, paperList: List })
        .then((res) => {
          if (res.code === HttpCode.success) {
            loadData(pageIndex)
          }
        })
    }
    setActivityShowDialog(false)
    setActivityRoleList([])
  }

  /**删除 */
  const _delItem = (record) => {
    Modal.confirm({
      title: '提示',
      content: '确定要删除当前',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        marketService.del({ id: record.id }).then((res) => {
          if (res.code == 200) {
            loadData(pageIndex)
            message.success('删除成功')
          }
        })
      },
    })
  }

  /**编辑 */
  const _editDialog = (record) => {
    console.log(record, 'record')
    const data = { ...record }
    data.rebateId = record.id
    setDeShowDialog(!deShowDialog)
    setSelectedData(JSON.stringify(data ?? []))
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
    setSelectedData('')
    setShowDialog(false)
    loadData(pageIndex)
  }

  const _onDialogClose = () => {
    setSelectedData('')
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
              <Form.Item name="state">
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
              </Form.Item>
            </Col>
            {/* <Col span={1} className="table-from-label"></Col> */}
            <Col span={3}>
              <InputTemp name="rebateName" placeholder="活动ID/活动名称" />
            </Col>
            <Col span={1} className="table-from-label">
              创建时间
            </Col>
            <Col span={3}>
              <Form.Item name="time">
                <RangePicker showTime />
              </Form.Item>
            </Col>
            {/* <Col span={1} className="table-from-label">
              状态
            </Col>
            <Col span={3}>
              <StatusRoute name="state" />
            </Col> */}

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
      <DEDialog
        show={deShowDialog}
        onChange={() => setDeShowDialog(false)}
        data={() => <RebateBasicInfo data={selectedData}></RebateBasicInfo>}
        // data={() => <ShowRefund data={selectedData} editGo={_editGo}></ShowRefund>}
      ></DEDialog>
      {goodsShowDialog == true ? (
        <GoodsTable
          goodsShow={goodsShowDialog}
          onSuccess={goodsOnSuccess}
          goodsIdList={goodsRoleList}
          onClose={() => setGoodsShowDialog(false)}
        ></GoodsTable>
      ) : (
        ''
      )}

      <ActivityTable
        goodsShow={activityShowDialog}
        onSuccess={activityOnSuccess}
        goodsIdList={activityRoleList}
        onClose={() => {
          setActivityShowDialog(false)
          setActivityRoleList([])
        }}
      ></ActivityTable>
      <ModalDialog
        show={showGoodsDialog}
        title={showType == 'goods' ? '关联商品管理' : '关联任务清单'}
        data={() => <ShowGoodsTaskModal data={modalData} showType={showType}></ShowGoodsTaskModal>}
        onChange={() => setShowGoodsDialog(false)}
      ></ModalDialog>
    </div>
  )
}

export default RebateActivity
