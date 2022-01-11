import useQuery from '@/hooks/useQuery'
import { ProductionService } from '@/service/ProductionService'
import { useStore } from '@/store/context'
import { divide } from 'lodash'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Table, Tag, Space } from 'antd'
import './index.less'

/**
 * 发布信息展示
 */
const ReleaseInfoShow: React.FC = () => {
  const history = useHistory()
  const query = useQuery()
  const { productionDetailStore } = useStore()
  const [data, setData] = useState<any>({})

  useEffect(() => {
    console.log(query.get('id'))
    ProductionService.get(query.get('id') ?? '').then((res) => {
      console.log(res)
      productionDetailStore.init(res.data)
    })

    return () => {
      productionDetailStore.clearData()
    }
  }, [])

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  }
  const columns = [
    {
      title: '分佣方案名称',
      dataIndex: 'planName',
      key: 'planName',
    },
    {
      title: '分佣比例',
      dataIndex: 'distScale',
      key: 'distScale',
    },
    {
      title: '分中心渠道等级',
      dataIndex: 'channelId',
      key: 'channelId',
    },
    {
      title: '分中心名称',
      dataIndex: 'channelName',
      key: 'channelName',
    },
  ]
  useEffect(() => {
    const id = query.get('id') ?? ''
    ProductionService.getPublishCheckInfo(id).then((res) => {
      setData(res.data)
    })
  }, [])

  return (
    <div className="ReleaseInfoShow__root">
      <h4>4. 发布信息</h4>
      {/* <div>{JSON.stringify(data)}</div> */}
      <div className="box">
        <div className="left">
          <div>
            审核结果: {data?.checkState == 1 ? '通过' : '不通过'}
            {data?.checkState == 2 && <div>失败原因 {data?.checkMag}</div>}
          </div>
          <div>添加库存: {data?.stock}</div>
          <div>代币抵现: 最多可抵 “现售价” {data?.deductionScale}%</div>
          <div className="manual">
            <div>手工补现:</div>
            <div className="manual-right">
              <div className="amount">
                <div>补销量： {data?.shamSales}</div>
                <div>补点赞量： {data?.shamLikes}</div>
                <div>补分享量： {data?.shamShares}</div>
              </div>
              <div className="amount-text">手工补量直接影响前端展示数值，商品的数据由真实销量和手工补量构成</div>
            </div>
          </div>
          <div>
            <div>分佣方案 {data.distPlanId}</div>
            <div>
              <div>
                <Table dataSource={data?.distPlan} columns={columns} bordered />
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <div>发布渠道: {data?.createChannelName}</div>
          <div>上架人: {data?.createUserName}</div>
          <div>上架时间</div>
          <div className="btn">{/* <button>查看发布审核记录</button> */}</div>
        </div>
      </div>
    </div>
  )
}

export default observer(ReleaseInfoShow)
