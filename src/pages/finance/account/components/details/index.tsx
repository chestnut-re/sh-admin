import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './index.less'
import { Tabs, Row, Col } from 'antd'
import { FinanceAccountService } from '@/service/FinanceAccountService'
import { HttpCode } from '@/constants/HttpCode'
import TabOnePage from './TabOne'
import TabTwoPage from './TabTwo'
import TabThreePage from './TabThree'

/**
 * 查看明细
 */
const AccountDetails: React.FC = () => {
  const history = useHistory<any>()
  const [data, setData] = useState<any>({})
  const { TabPane } = Tabs
  useEffect(() => {
    if (history.location.state.record) {
      loadAllData()
    }
  }, [history.location.state.record])

  const loadAllData = () => {
    FinanceAccountService.details({ phone: history.location.state.record?.phone }).then((res) => {
      if (res.code === HttpCode.success) {
        setData(res.data ?? {})
      }
    })
  }

  return (
    <div className="account-details__root">
      <div className="details-header">
        <span className="header-title">账户中心/账户明细</span>
      </div>
      <div className="content">
        <Row gutter={[0, 24]}>
          <Col className="gutter-row" span={4}>
            归属渠道：{history.location.state.record?.channelName}
          </Col>
          <Col className="gutter-row" span={4}>
            姓名：{history.location.state.record?.realName}
          </Col>
          <Col className="gutter-row" span={4}>
            账号：{history.location.state.record?.phone}
          </Col>
        </Row>
        <Row gutter={[0, 24]}>
          <Col className="gutter-row" span={6}>
            除了运营资金，包含待释放跟提现中
          </Col>
        </Row>
        <Row gutter={[0, 24]}>
          <Col className="gutter-row" span={4}>
            账户余额：{data?.total}
          </Col>
          <Col className="gutter-row" span={4}>
            待释放：{data?.frozen}
          </Col>
          <Col className="gutter-row" span={4}>
            提现中：{data?.cashing}
          </Col>
          <Col className="gutter-row" span={4}>
            可提现：{data?.cashed}
          </Col>
        </Row>
        <Row gutter={[0, 24]}>
          <Col className="gutter-row" span={4}>
            运营资金：{data?.fundsTotal}
          </Col>
          <Col className="gutter-row" span={4}>
            待释放：{data?.fundsFrozen}
          </Col>
          <Col className="gutter-row" span={4}>
            可用：{data?.available}
          </Col>
        </Row>
      </div>
      <div className="sales-tabs">
        <Tabs defaultActiveKey="1">
          <TabPane tab="佣金" key="1">
            <TabOnePage data={history.location.state.record} />
          </TabPane>
          <TabPane tab="提现" key="2">
            <TabTwoPage data={history.location.state.record} />
          </TabPane>
          <TabPane tab="运营资金" key="3">
            <TabThreePage data={history.location.state.record} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}
export default AccountDetails
