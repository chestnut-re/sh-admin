
import useQuery from '@/hooks/useQuery'
import { ProductionService } from '@/service/ProductionService'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Tag, Space } from 'antd'
import './index.less'
const { Column, ColumnGroup } = Table

/**
 * 分中心上架申请 展示
 * 分中心视角，查看自己的申请
 */
const CenterPutOnRequestShowSubCenter: React.FC = () => {
  const history = useNavigate()
  const query = useQuery()
  const { productionDetailStore } = useStore()
  const [data, setData] = useState<any>({})
  const [id, setID] = useState<string | null>()
  const [distPlan, setDistPlan] = useState<any[]>([])

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  }
  useEffect(() => {
    console.log('subcenter CenterPutOnRequestShowSubCenter')
    const id = query.get('channelGoodsId') ?? ''
    setID(id)
    if (!id || id === 'null') {
      return
    }
    ProductionService.centerPutOnRequestGet(id).then((res) => {
      setData(res.data)
      const arr: any = []
      treeToList(arr, res.data?.channelPlanList)
      setDistPlan(arr)
    })
  }, [])
  const treeToList = (arr, tree) => {
    // arr.push({
    //   channelName: tree.channelName,
    //   directAuth: tree.directAuth == 0 ? '未开启' : '开启',
    //   directScale: tree.directScale,
    //   id: tree.id,
    //   level: tree.level,
    //   saleAuth: tree.saleAuth == 0 ? '未开启' : '开启',
    //   teamPrice: tree.teamPrice,
    //   saleScalePlan: tree.saleScalePlan,
    // })
    console.log('tree', tree)
    tree ??
      tree.map((item, index) => {
        console.log('???')
        item.saleScalePlan.map((it) => {
          console.log(it, item)
          item['s' + it.level] = it.saleScale
        })
      })
    // console.log('arr', arr)
  }

  return (
    <>
      {id !== 'null' && (
        <div className="CenterPutOnRequestShow__root">
          <h4>5. 上架申请信息</h4>
          {/* <div>{JSON.stringify(data)}</div> */}
          <div className="info">
            <div className="one-info">
              <div className="canal">申请渠道 {data?.channelName} </div>
              <div>责任区域 </div>
            </div>
            <div>申请人 {data?.channelPerson}</div>
            <div>申请时间 {data?.createTime}</div>
            <div>分佣方案 {data?.distPlanName} </div>
            <div>
              <Table dataSource={data?.channelPlanList} bordered>
                <Column className="table-light-color" title="渠道名称" dataIndex="channelName" key="channelName" />
                <Column className="table-light-color" title="直销分佣比例" dataIndex="directScale" key="directScale" />
                <Column className="table-light-color" title="渠道等级" dataIndex="level" key="level" />
                <ColumnGroup className="table-light-color" title="分销分佣">
                  <Column className="table-light-color" title="渠道等级" dataIndex="lastName" key="lastName" />
                  <Column className="table-light-color" title="分销分佣比例" dataIndex="lastName" key="lastName" />
                </ColumnGroup>
                <Column className="table-light-color" title="发团服务费" dataIndex="teamPrice" key="teamPrice" />
              </Table>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default observer(CenterPutOnRequestShowSubCenter)
