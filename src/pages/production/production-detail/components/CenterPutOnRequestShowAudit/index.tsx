import useQuery from '@/hooks/useQuery'
import { ProductionService } from '@/service/ProductionService'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { Table, Tag, Space } from 'antd'
import './index.less'
import Item from 'antd/lib/list/Item'
const { Column, ColumnGroup } = Table

interface Props {
  onChange: (data: any) => void
}

/**
 * 分中心上架申请 展示
 * 总中心视角，审核上架申请
 */
const CenterPutOnRequestShowAudit: React.FC<Props> = ({ onChange }) => {
  const query = useQuery()
  const [data, setData] = useState<any>({})
  const [distPlan, setDistPlan] = useState<any[]>([])

  useEffect(() => {
    console.log('总中心视角，分中心上架申请')
    const channelGoodsId = query.get('channelGoodsId') ?? ''
    ProductionService.channelGoodsListByGoodsIdAudit(channelGoodsId).then((res) => {
      setData(res.data)
      onChange(res.data)
      const d: any[] = []
      res.data.channelPlanList.map((i) => {
        d.push({
          channelName: i.channelName,
          level: i.level,
          directScale: i.directScale,
          saleScale2: i.saleScalePlan?.find((sp) => sp.level === 2)?.saleScale,
          saleScale3: i.saleScalePlan?.find((sp) => sp.level === 3)?.saleScale,
          saleScale4: i.saleScalePlan?.find((sp) => sp.level === 4)?.saleScale,
          saleScale5: i.saleScalePlan?.find((sp) => sp.level === 5)?.saleScale,
          teamPrice: i.teamPrice,
        })
        return i
      })
      setDistPlan(d)
    })
  }, [])

  const treeToList = (arr, tree) => {
    console.log(tree)
    arr.push({
      channelLeave: tree.channelLeave,
      distScale: tree.distScale,
      outLetScale: tree.outLetScale,
      saleAuth: tree.saleAuth,
      serviceCharge: tree.serviceCharge,
    })
    arr.map((item, index) => {
      item.saleAuth.map((it) => {
        console.log(it, item)
        item['s' + it.level] = it.saleScale
      })
    })
    console.log('arr', arr)
    if (tree.children) {
      treeToList(arr, tree.children)
    } else {
      return arr
    }
    // for (const item of tree) {
    //   if (item.children && item.children.length > 0) {
    //     const sitem = { ...item }
    //     delete sitem.children
    //     arr = arr.concat(sitem, treeToList(item.children))
    //   } else {
    //     delete item.children
    //     arr.push(item)
    //   }
    // }
    // return arr
  }

  return (
    <div className="CenterPutOnRequestShow__root">
      <h4>5. 上架申请信息</h4>
      {/* <div>{JSON.stringify(data)}</div> */}
      <div className="info-info">
        <div className="left">
          <div>
            <div>申请渠道: {data.channelName}</div>
            <div>责任区域: {data.channelRegions}</div>
            <div>申请人: {data.channelPerson}</div>
            <div>申请时间: {data.createTime}</div>
            <div>分佣方案: {data.distPlanName}</div>
          </div>
          <div>
            {/* <Table dataSource={distPlan} bordered></Table> */}
            <Table dataSource={distPlan} bordered>
              <Column className="table-light-color" title="上架渠道" dataIndex="channelName" key="channelName" />
              <Column className="table-light-color" title="直销分佣比例" dataIndex="directScale" key="directScale" />
              <Column className="table-light-color" title="渠道等级" dataIndex="level" key="level" />
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
          <div>
            <div>商家渠道: {data.channelName}</div>
            <div>创建人: {data.createUserName}</div>
            <div>创建时间: {data.createTime}</div>
          </div>
          <div>
            <div>更新人: {data.updateUserName}</div>
            <div>更新时间: {data.updateTime}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(CenterPutOnRequestShowAudit)
