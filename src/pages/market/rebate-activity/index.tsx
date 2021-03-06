/*
 * @Description:
 * @LastEditTime: 2022-01-26 16:50:42
 */
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
import { PlusOutlined } from '@ant-design/icons'
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
  const [goodsAlreadyData, setGoodsAlreadyData] = useState([])
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
      title: '??????ID',
      render: (text, record, index) => `${index + 1}`,
    },

    {
      title: '????????????',
      dataIndex: 'name',
    },
    {
      title: '????????????',
      dataIndex: 'scale',
      render: (text, record, index) => `${record.scale ?? 0 + '%'}`,
    },
    {
      title: '????????????',
      dataIndex: 'bannerUrl',
      render: (text, record) =>
        `${record?.isShareRebate == 1 ? '???????????????' : ''}${record?.isPullRebate == 1 ? '????????????' : ''}`,
    },
    {
      title: '????????????',
      dataIndex: 'updateTime',
      render: (text, record, index) => <TimeColumn time={record?.updateTime} />,
    },
    {
      title: '???????????????',
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
      title: '?????????????????????',
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
      title: '??????',
      dataIndex: 'state',
      render: (text, record, index) => {
        const stateEnum = {
          undefined: '??????',
          null: '??????',
          1: '?????????',
          2: '?????????',
          3: '?????????',
        }
        return `${stateEnum[record.state]}`
      },
    },
    {
      title: '??????',
      fixed: 'right',
      render: (text: any, record: any) => (
        <Space size="middle">
          <span className="operation" onClick={() => _editDialog(record)}>
            ??????
          </span>
          <span className="operation" onClick={() => _editGoodsDialog(record)}>
            ????????????
          </span>
          <span className="operation" onClick={() => _editActivityDialog(record)}>
            ????????????
          </span>
          {/* <Button onClick={() => _editDialog(record)}>????????????</Button> */}
          <span className="operation" onClick={() => _delItem(record)}>
            ??????
          </span>
        </Space>
      ),
    },
  ]
  const _editGoodsDialog = (record) => {
    const list = (record.goodsList ?? []).map((res) => {
      return res.goodsId
    })
    const data = (record.goodsList ?? []).map((res) => {
      return {
        goodsId: res.goodsId,
        goodsName: res.goodsName,
        promotionalImageUrl: res.promotionalImageUrl,
      }
    })
    setSelectRecord(record.id)
    setrebateName(record.name)
    setGoodsShowDialog(true)
    setGoodsAlreadyData(data)
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
    // if (rowList.length > 0) {
    const goodsList = rowList.map((res) => {
      // res.goodsId = res.id
      return res
    })
    console.log(goodsList, '---')
    marketService
      .rebateAuditApply({ rebateId: selectRecord, rebateName: rebateName, type: 1, goodsList: goodsList })
      .then((res) => {
        if (res.code === HttpCode.success) {
          message.success('????????????????????????')
          //   Modal.confirm({
          //   title: '????????????',
          //   // icon: <ExclamationCircleOutlined />,
          //   content: '???????????????',
          //   okText: '??????',
          //   cancelText: '??????',
          // })
          loadData(pageIndex)
        }
      })
    // }
    setGoodsShowDialog(false)
    setGoodsRoleList([])
  }
  const activityOnSuccess = (rowKeys, rowList) => {
    // if (rowList.length > 0) {
    const List = rowList.map((res) => {
      return res
    })
    marketService
      .rebateAuditApply({ rebateId: selectRecord, rebateName, rebateName, type: 2, paperList: List })
      .then((res) => {
        if (res.code === HttpCode.success) {
          message.success('??????????????????????????????')
          // Modal.confirm({
          //   title: '????????????',
          //   // icon: <ExclamationCircleOutlined />,
          //   content: '??????????????????????????????????????????????????????????????????',
          //   okText: '??????',
          //   cancelText: '??????',
          // })
          loadData(pageIndex)
        }
      })
    // }
    setActivityShowDialog(false)
    setActivityRoleList([])
  }

  /**?????? */
  const _delItem = (record) => {
    Modal.confirm({
      title: '??????????????????',
      content: '????????????????????????????????????????????????',
      okText: '??????',
      okType: 'primary',
      cancelText: '??????',
      onOk: () => {
        marketService.del({ id: record.id }).then((res) => {
          if (res.code == 200) {
            loadData(pageIndex)
            message.success('????????????')
          }
        })
      },
    })
  }

  /**?????? */
  const _editDialog = (record) => {
    console.log(record, 'record')
    const data = { ...record }
    data.rebateId = record.id
    setDeShowDialog(!deShowDialog)
    setSelectedData(JSON.stringify(data ?? []))
  }

  /**?????? */
  const showAdd = () => {
    setShowDialog(true)
    setDialogMode('add')
  }

  /**?????? */
  const onFinish = () => {
    setPageIndex(1)
    loadData(1)
  }

  /**?????? */
  const resetTable = () => {
    form.resetFields()
    setPageIndex(1)
    loadData(1)
  }

  const _onDialogSuccess = (res) => {
    const record = res
    setSelectedData('')
    setShowDialog(false)
    loadData(pageIndex)
    Modal.confirm({
      title: '????????????',
      content: '??????????????????????????????????????????????????????????????????????????????',
      okText: '??????????????????',
      cancelText: '??????????????????',
      onOk: () => {
        setSelectRecord(record.id)
        setrebateName(record.name)
        setGoodsShowDialog(true)
        setActivityRoleList([])
      },
      onCancel: () => {
        setSelectRecord(record.id)
        setrebateName(record.name)
        setActivityShowDialog(true)
        setActivityRoleList([])
      },
    })
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
        <Form name="basic" initialValues={{ checkState: '' }} onFinish={onFinish} form={form}>
          <Row>
            <Col span={21}>
             <Row gutter={[20, 0]}>
             <Col className="table-from-label" ></Col>
              <Col >
                <Form.Item name="checkState">
                  <Radio.Group
                    value={checkState}
                    onChange={(value) => {
                      setCheckState(value.target.value)
                    }}
                  >
                    <Radio.Button value="">??????</Radio.Button>
                    <Radio.Button value="1">?????????</Radio.Button>
                    <Radio.Button value="2">?????????</Radio.Button>
                    <Radio.Button value="3">?????????</Radio.Button>
                    {/* checkState 0 ????????? 1???????????? 2??????????????? */}
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col className="table-from-label"></Col>
              <Col>
                <InputTemp name="rebateName" placeholder="??????ID/????????????" />
              </Col>
              <Col className="table-from-label">????????????</Col>
              <Col>
                <Form.Item name="time">
                  <RangePicker showTime />
                </Form.Item>
              </Col>
              {/* <Col span={1} className="table-from-label">
              ??????
            </Col>
            <Col span={3}>
              <StatusRoute name="state" />
            </Col> */}
              <Col>
                <Form.Item>
                  <Space>
                    <Button htmlType="submit">??????</Button>
                    <Button onClick={resetTable}>??????</Button>
                  </Space>
                </Form.Item>
              </Col>
             </Row>
            </Col>
            <Row style={{ textAlign: 'right' }}>
              <Col>
                <Space>
                  <Button type="primary" icon={<PlusOutlined />} onClick={showAdd}>
                    ??????
                  </Button>
                </Space>
              </Col>
            </Row>
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
          query={{
            type: 1,
          }}
          goodsAlreadyData={goodsAlreadyData}
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
      {showGoodsDialog == true ? (
        <ModalDialog
          show={showGoodsDialog}
          title={showType == 'goods' ? '??????????????????' : '??????????????????'}
          data={() => <ShowGoodsTaskModal data={modalData} showType={showType}></ShowGoodsTaskModal>}
          onChange={() => setShowGoodsDialog(false)}
        ></ModalDialog>
      ) : (
        ''
      )}
    </div>
  )
}

export default RebateActivity
