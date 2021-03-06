import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useQuery from '@/hooks/useQuery'
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
  const query = useQuery()
  const [data, setData] = useState<any>({})
  const { TabPane } = Tabs
  useEffect(() => {
    if (query.get('userId')) {
      loadAllData()
    }
  }, [query.get('userId')])

  const loadAllData = () => {
    FinanceAccountService.details({ phone: query.get('phone') ?? '' }).then((res) => {
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
            归属渠道：{query.get('channelName') ?? ''}
          </Col>
          <Col className="gutter-row" span={4}>
            姓名：{query.get('realName') ?? ''}
          </Col>
          <Col className="gutter-row" span={4}>
            账号：{query.get('phone') ?? ''}
          </Col>
        </Row>
        <Row gutter={[0, 24]}>
          <Col className="gutter-row" span={6}>
            除了运营资金，包含待释放跟提现中
          </Col>
        </Row>
        <Row gutter={[0, 24]}>
          <Col className="gutter-row" span={4}>
            账户余额：{(parseInt(data?.total) / 1000).toFixed(2)}
          </Col>
          <Col className="gutter-row" span={4}>
            待释放：{(parseInt(data?.frozen) / 1000).toFixed(2)}
          </Col>
          <Col className="gutter-row" span={4}>
            提现中：{(parseInt(data?.cashing) / 1000).toFixed(2)}
          </Col>
          <Col className="gutter-row" span={4}>
            可提现：{(parseInt(data?.cashed) / 1000).toFixed(2)}
          </Col>
        </Row>
        <Row gutter={[0, 24]}>
          <Col className="gutter-row" span={4}>
            运营资金：{(parseInt(data?.fundsTotal) / 1000).toFixed(2)}
          </Col>
          <Col className="gutter-row" span={4}>
            待释放：{(parseInt(data?.fundsFrozen) / 1000).toFixed(2)}
          </Col>
          <Col className="gutter-row" span={4}>
            可用：{(parseInt(data?.available) / 1000).toFixed(2)}
          </Col>
        </Row>
      </div>
      <div className="sales-tabs">
        <Tabs defaultActiveKey="1">
          <TabPane tab="佣金" key="1">
            <TabOnePage data={query.get('phone')} />
          </TabPane>
          <TabPane tab="提现" key="2">
            <TabTwoPage data={query.get('phone')} />
          </TabPane>
          <TabPane tab="运营资金" key="3">
            <TabThreePage data={query.get('phone')} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}
export default AccountDetails
