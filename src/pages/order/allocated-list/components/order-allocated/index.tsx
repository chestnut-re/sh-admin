import React, { useState, useEffect, useRef } from 'react'
import useQuery from '@/hooks/useQuery'
import './../../../order-list/components/order-details/OrderDetails.less'
import '@/pages/production/release-product/index.less'
import { useNavigate } from 'react-router-dom'
import { Table, Space, Button, message, Modal } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'
import { OrderService, AllocatedOrderService } from '@/service/OrderService'
import { HttpCode } from '@/constants/HttpCode'
import ServiceList from '../service-list'
import ConfigCommission from '../config-commission'
import StepView from './../StepView'
import DetailsPage from '../config-commission/details'
/**
 * 订单详情
 */
const AllocatedDetailsPage: React.FC = () => {
  const history = useNavigate()
  const query = useQuery()
  const _ref = useRef<any>()
  const [dataD, setDataD] = useState<any>([])
  const [data, setData] = useState<any>([])
  const [current, setCurrent] = useState(0)
  const [selectData, setSelectData] = useState<any>({})
  const [show, setShow] = useState<any>(false)
  const [addData, setAddData] = useState<any>([])
  useEffect(() => {
    loadData()
    getRelations()
  }, [])

  useEffect(() => {
    const arr = JSON.parse(JSON.stringify(selectData))
    if (arr != []) {
      arr.userName = arr.realName
      arr.orderShip = '接单人'
      arr.relationship = arr.belongChannel
      arr.responsibilityArea = arr.address
      arr.phoneNumber = arr.phone
      arr.rebateFlag = arr.haveRebate
      arr.accountTypeVal = '内部渠道'
      if (arr.address) {
        if (arr.address.search(data.departureCity) != -1) {
          arr.areaEqualFlag = '是'
        } else {
          arr.areaEqualFlag = '否'
        }
      } else {
        arr.areaEqualFlag = '否'
      }
    }

    setAddData([...dataD, arr])
  }, [selectData])

  useEffect(() => {
    setAddData([...dataD])
  }, [dataD])
  const loadData = () => {
    OrderService.details({ orderId: query.get('id') }).then((res) => {
      if (res.code === HttpCode.success) {
        setData(res.data)
      }
    })
  }

  const getRelations = () => {
    OrderService.relation({ orderId: query.get('id') }).then((res) => {
      if (res.code === HttpCode.success) {
        setDataD(res.data)
      }
    })
  }
  const columnsD = [
    {
      title: '订单关系',
      dataIndex: 'orderShip',
      className: 'table-light-color',
    },
    {
      title: '姓名',
      dataIndex: 'userName',
      className: 'table-light-color',
    },
    {
      title: '关系归属',
      dataIndex: 'relationship',
      className: 'table-light-color',
    },
    {
      title: '买家常住地/渠道责任区域',
      dataIndex: 'responsibilityArea',
      className: 'table-light-color',
    },
    {
      title: '始发地同异',
      dataIndex: 'areaEqualFlag',
      className: 'table-light-color',
    },
    {
      title: '手机号',
      dataIndex: 'phoneNumber',
      className: 'table-light-color',
    },
    {
      title: '平台身份',
      dataIndex: 'accountTypeVal',
      className: 'table-light-color',
    },
    {
      title: '当前返利任务',
      dataIndex: 'rebateFlag',
      className: 'table-light-color',
      render: (text: any, record: any) => {
        if (record.rebateFlag == 0) {
          return `-`
        } else if (record.rebateFlag == 1) {
          return `有`
        }
      },
    },
  ]

  /**下一步 */
  const next = () => {
    if (current === 0) {
      setCurrent(1)
    } else if (current == 1) {
      setCurrent(0)
    }
  }

  const _commit = () => {
    const data = {
      orderId: '',
      userId: '',
      channelId: '',
      list: {},
    }
    data.orderId = query.get('id') ?? ''
    data.userId = selectData.userId
    data.channelId = selectData.channelId
    data.list = JSON.parse(JSON.stringify(_ref.current?.relationList))
    data.list.map((item: any) => {
      delete item.key
      delete item.userId
      item.channelScaleList = item.relation
      delete item.relation
      item.channelScaleList.map((item: any) => {
        delete item.subsidy
        delete item.supUserId
        delete item.supUser
        item.rebateFlag = item.haveRebate
        delete item.haveRebate
        item.buildFlag = item.havePresetBonus
        delete item.havePresetBonus
        item.buildScale = item.presetBonus
        delete item.presetBonus
        if (!item.scale) {
          item['scale'] = 0
        }
      })
    })
    AllocatedOrderService.submit(data).then((res) => {
      if (res.code === HttpCode.success) {
        setShow(true)
      }
    })
  }

  const toList = () => {
    history('/order/order-list')
  }

  const toAllocated = () => {
    history('/order/allocated-list')
  }

  return (
    <div className="detail__root">
      <div className="states-con">
        <span className="order-sta">订单状态</span>
        <span className="order-state">{data?.stateVal}</span>
        {/* <div className="order-time">
          剩<span></span>
        </div> */}
        {data.orderTypeVal ? <div className="order-fx">{data?.orderTypeVal}</div> : ''}

        <div className="states-order">
          <div>{data.orderNo ? data.orderNo : '无'}</div>
          <div>订单编号</div>
        </div>
        <div className="states-order1">
          <div>{data.orderTime ? data.orderTime : '无'}</div>
          <div>下单时间</div>
        </div>
        <div className="states-order2">
          <div>{data.payTime ? data.payTime : '无'}</div>
          <div>付款时间</div>
        </div>
        <div className="states-order3">
          <div>{data.sourceVal ? data.sourceVal : '无'}</div>
          <div>下单途径</div>
        </div>
      </div>
      <div className="infor-con">
        <div className="infor-title">
          <img src="" alt="" />
          <span>{data.goodsName ? data.goodsName : ''}</span>
        </div>
        <div className="infor infor-spe">
          <div>始发地</div>
          <div>{data?.departureCity}</div>
        </div>
        <div className="infor">
          <div>成人价</div>
          <div>{data?.personCurrentPrice ? (parseInt(data?.personCurrentPrice) / 1000).toFixed(2) : ''}</div>
        </div>
        <div className="infor">
          <div>儿童价</div>
          <div>{data?.childCurrentPrice ? (parseInt(data?.childCurrentPrice) / 1000).toFixed(2) : ''}</div>
        </div>
        <div className="infor">
          <div>下单数量</div>
          <div>
            <span style={{ display: 'inline-block', height: '20px', lineHeight: '20px' }}>
              <span style={{ fontSize: 20 }}>{parseInt(data?.adultNum) + parseInt(data?.childNum)}</span>
              <span>
                &nbsp;成人×{data?.adultNum}&nbsp;儿童×{data?.childNum}
              </span>
            </span>
          </div>
        </div>
        <div className="infor">
          <div>代币最多可抵</div>
          <div>{data?.deductionPrice ? (parseInt(data?.deductionPrice) / 1000).toFixed(2) : ''}</div>
        </div>
      </div>
      <div className="details-title">订单关联人</div>
      <Table
        rowKey="id"
        className="table-light-color"
        columns={columnsD}
        scroll={{ x: 'max-content' }}
        pagination={false}
        dataSource={[...addData]}
      />
      {query.get('mode') == 'edit' ? (
        <div className="ReleaseProduct__root">
          <StepView current={current} />
          <div className="steps-content">
            {current == 0 && <ServiceList id={query.get('id')} setSelectData={setSelectData} />}
            {current == 1 && (
              <ConfigCommission orderData={dataD} cRef={_ref} receiverData={selectData} id={query.get('id')} />
            )}
            <div className="btnView">
              <div className="item">
                {current > 0 && (
                  <>
                    <div className="nextBtn prev" onClick={_commit}>
                      确定提交
                    </div>
                  </>
                )}
                <div onClick={() => next()} className="nextBtn">
                  {current === 1 ? '取消' : '下一步'}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <DetailsPage id={query.get('id')} />
      )}
      <Modal centered visible={show} footer={false} onCancel={() => setShow(false)} maskClosable={false}>
        <div style={{ textAlign: 'center' }}>
          <p>
            <CheckCircleOutlined style={{ fontSize: 36 }} />
          </p>
          <h3>订单分配成功</h3>
          <p>
            可以在订单中心/<a onClick={toList}>订单列表</a>页查看订单情况
          </p>
          <Space size="large">
            <Button type="primary" onClick={toAllocated}>
              返回待分配列表
            </Button>
            <Button onClick={toList}>查看订单列表</Button>
          </Space>
        </div>
      </Modal>
    </div>
  )
}
export default AllocatedDetailsPage
