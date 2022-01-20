import useQuery from '@/hooks/useQuery'
import { ProductionService } from '@/service/ProductionService'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Table, Tag, Space, Button } from 'antd'
import './index.less'
import Item from 'antd/lib/list/Item'
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
      {/* <div>{JSON.stringify(data)}</div> */}
      <div className="info">
        <div className="one-info">
          <div className="canal">上架渠道 {data?.length} </div>
        </div>
        <div>
          <Table dataSource={distPlan} bordered>
            <Column title="上架渠道（等级）" dataIndex="channelLeave" key="channelLeave" />
            <Column title="分佣方案名称（暂定等级）" dataIndex="channelLeave" key="channelLeave" />
            <Column title="直销方（分佣）" dataIndex="outLetScale" key="outLetScale" />
            <Column title="直销分佣" dataIndex="outLetScale" key="outLetScale" />
            <ColumnGroup title="分销分佣">
              <Column title="二级名称" dataIndex="s2" key="firstName" />
              <Column title="三级名称" dataIndex="s3" key="lastName" />
              <Column title="四级名称" dataIndex="s4" key="lastName" />
            </ColumnGroup>
            <Column title="发团服务费" dataIndex="serviceCharge" key="serviceCharge" />
            <Column title="合计分佣" dataIndex="distScale" key="distScale" />
          </Table>
        </div>

        <div>
          <Button>查看上架审核记录</Button>
        </div>
      </div>
    </div>
  )
}

export default observer(CenterPutOnRequestShow)
