import useQuery from '@/hooks/useQuery'
import { ProductionService } from '@/service/ProductionService'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Table, Tag, Space, Button } from 'antd'
import './index.less'
import Item from 'antd/lib/list/Item'
import dayjs from 'dayjs'
const { Column, ColumnGroup } = Table

/**
 * 分中心上架申请 展示
 * 总中心视角，查看所有的上架申请
 */
const CenterPutOnRequestShow: React.FC = () => {
  const history = useHistory()
  const query = useQuery()
  const { productionDetailStore } = useStore()
  const [data, setData] = useState<any[]>([])
  const [distPlan, setDistPlan] = useState<any[]>([])

  useEffect(() => {
    console.log('center CenterPutOnRequestShow')
    const id = query.get('id') ?? ''
    ProductionService.channelGoodsListByGoodsId(id).then((res) => {
      const d: any[] = []
      res.data.map((i) => {
        i.channelPlanList.map((ii) => {
          d.push({
            channelName: i.channelName,
            distPlanName: i.distPlanName,
            directScale: i.directScale,
            directChannelName: ii.channelName,
            directDirectScale: ii.directScale,
            saleScale2: ii.saleScalePlan.find((sp) => sp.level === 2)?.saleScale,
            saleScale3: ii.saleScalePlan.find((sp) => sp.level === 3)?.saleScale,
            saleScale4: ii.saleScalePlan.find((sp) => sp.level === 4)?.saleScale,
            saleScale5: ii.saleScalePlan.find((sp) => sp.level === 5)?.saleScale,
            teamPrice: i.teamPrice,
          })
          return ii
        })
        return i
      })
      setData(d)
    })
  }, [])

  return (
    <div className="CenterPutOnRequestShow__root">
      <h4>5. 上架申请信息</h4>
      {/* <div>{JSON.stringify(data)}</div> */}
      <div className="box">
        <div className="left">
          <div className="one-info">
            <div className="canal">上架渠道 {data?.length} </div>
          </div>
          <div>
            <Table dataSource={data} bordered>
              <Column className="table-light-color" title="上架渠道" dataIndex="channelName" key="channelName" />
              <Column className="table-light-color" title="分佣方案名称" dataIndex="distPlanName" key="distPlanName" />
              <Column className="table-light-color" title="直销方" dataIndex="directChannelName" key="directScale" />
              <Column
                className="table-light-color"
                title="直销方（分佣）"
                dataIndex="directDirectScale"
                key="directScale"
              />
              <ColumnGroup className="table-light-color" title="分销分佣">
                <Column className="table-light-color" title="二级名称" dataIndex="saleScale2" key="firstName" />
                <Column className="table-light-color" title="三级名称" dataIndex="saleScale3" key="lastName" />
                <Column className="table-light-color" title="四级名称" dataIndex="saleScale4" key="lastName" />
                <Column className="table-light-color" title="五级名称" dataIndex="saleScale5" key="lastName" />
              </ColumnGroup>
              <Column className="table-light-color" title="发团服务费" dataIndex="teamPrice" key="teamPrice" />
            </Table>
          </div>
        </div>

        <div className="right">
          {data.map((item, index) => {
            return (
              <div key={index}>
                <div>商家渠道：{item.channelName}</div>
                <div>上架人：{item.createUserName}</div>
                <div>上架时间：{dayjs(item.shelfTime).format('YYYY-MM-DD HH:mm:ss')}</div>
              </div>
            )
          })}
          {/* <Button
            onClick={() => {
              console.log(data)
            }}
          >
            查看上架审核记录
          </Button> */}
        </div>
      </div>
    </div>
  )
}

export default observer(CenterPutOnRequestShow)
