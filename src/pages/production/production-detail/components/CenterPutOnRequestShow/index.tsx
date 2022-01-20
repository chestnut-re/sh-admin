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
      setData(res.data)
      const arr: any = []
      treeToList(arr, res.data)
      setDistPlan(res.data?.channelPlanList)
    })
  }, [])

  const treeToList = (arr, tree) => {
    console.log(tree)
    tree ??
      tree.map((item, index) => {
        console.log('?', item)
      })
    // arr.push({
    //   channelLeave: tree.channelLeave,
    //   distScale: tree.distScale,
    //   outLetScale: tree.outLetScale,
    //   saleAuth: tree.saleAuth,
    //   serviceCharge: tree.serviceCharge,
    // })
    // arr.map((item, index) => {
    //   item.saleAuth.map((it) => {
    //     console.log(it, item)
    //     item['s' + it.level] = it.saleScale
    //   })
    // })
    // if (tree.children) {
    //   treeToList(arr, tree.children)
    // } else {
    //   return arr
    // }
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

    // tree ??
    //   tree.map((item, index) => {
    //     console.log('???')
    //     item.saleScalePlan.map((it) => {
    //       console.log(it, item)
    //       item['s' + it.level] = it.saleScale
    //     })
    //   })
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
          <Table dataSource={data} bordered>
            <Column title="上架渠道" dataIndex="channelName" key="channelName" />
            <Column title="分佣方案名称" dataIndex="distPlanName" key="distPlanName" />
            <Column title="直销方（分佣）" dataIndex="outLetScale" key="outLetScale" />
            <Column title="直销分佣比例" dataIndex="directScale" key="directScale" />
            <ColumnGroup title="分销分佣">
              <Column title="二级名称" dataIndex="s2" key="firstName" />
              <Column title="三级名称" dataIndex="s3" key="lastName" />
              <Column title="四级名称" dataIndex="s4" key="lastName" />
            </ColumnGroup>
            <Column title="发团服务费" dataIndex="teamPrice" key="teamPrice" />
          </Table>
        </div>

        <div>
          {data.map((item, index) => {
            return (
              <div key={index}>
                <div>商家渠道：{item.channelName}</div>
                <div>上架人：{item.createUserName}</div>
                <div>上架时间：{dayjs(item.shelfTime).format('YYYY-MM-DD HH:mm:ss')}</div>
              </div>
            )
          })}
          <Button
            onClick={() => {
              console.log(data)
            }}
          >
            查看上架审核记录
          </Button>
        </div>
      </div>
    </div>
  )
}

export default observer(CenterPutOnRequestShow)
