import useQuery from '@/hooks/useQuery'
import { ProductionService } from '@/service/ProductionService'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { Table, Tag, Space } from 'antd'
import './index.less'
import Item from 'antd/lib/list/Item'
const { Column, ColumnGroup } = Table

/**
 * 分中心上架申请 展示
 * 总中心视角，审核上架申请
 */
const CenterPutOnRequestShowAudit: React.FC = () => {
  const query = useQuery()
  const [data, setData] = useState<any>({})
  const [distPlan, setDistPlan] = useState<any[]>([])

  useEffect(() => {
    console.log('总中心视角，分中心上架申请')
    const channelGoodsId = query.get('channelGoodsId') ?? ''
    ProductionService.channelGoodsListByGoodsIdAudit(channelGoodsId).then((res) => {
      setData(res.data)
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
      <div>{JSON.stringify(data)}</div>
      <div className="info">
        <div>
          <div>申请渠道: {data.channelId}</div>
          <div>责任区域: </div>
          <div>申请人: </div>
          <div>申请时间: </div>
          <div>分佣方案: </div>
        </div>
        <div>
          <Table dataSource={distPlan} bordered></Table>
        </div>
      </div>
    </div>
  )
}

export default observer(CenterPutOnRequestShowAudit)
