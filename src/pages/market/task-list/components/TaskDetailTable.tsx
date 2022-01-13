/*
 * @Description: 配置商品详情
 * @LastEditTime: 2022-01-13 15:41:35
 */
import { Table, Space, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { ActivitiesService } from '@/service/ActivitiesService'
interface Props {
  goodsIdList: any
  onSuccess: (any:any) => void
}
const ActivityDetailTable: React.FC<Props> = ({ goodsIdList, onSuccess }) => {
  const [data, setData] = useState([])
  const [goodsIdLists, setGoodsIdList] = useState([])
  useEffect(() => {
    setData(JSON.parse(JSON.stringify(goodsIdList)))
    // if (goodsIdList) {
    //   getGoodsDetail()
    // }
  }, [goodsIdList])
  // const getGoodsDetail = async () => {
  //   const res = await ActivitiesService.goodsList({ keyword: '' })
  //   const goodsList = (res?.data ?? []).filter((res) => {
  //     return goodsIdList.includes(res.goodsId)
  //   })
  //   setData(goodsList)
  // }
  const _delItem = (record, index) => {
   data.splice(index, 1)
    // console.log(data,'goodsIdLists.splice(index, 1)')
    onSuccess(data)
  }
  const columns = [
    {
      title: '商品ID',
      dataIndex: 'goodsId',
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
    },
    {
      title: '操作',
      render: (text: any, record: any, index) => (
        <Space size="middle">
          <Button onClick={() => _delItem(record, index)}>移除</Button>
        </Space>
      ),
    },
  ]

  return (
    <div className="page-root">
      <Table rowKey="goodsId" columns={columns} dataSource={[...data]} pagination={false} />
    </div>
  )
}

export default ActivityDetailTable
