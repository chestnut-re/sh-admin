/*
 * @Description: 配置商品详情
 * @LastEditTime: 2022-01-05 13:41:53
 */
import { Table, Space, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { ActivitiesService } from '@/service/ActivitiesService'
interface Props {
  goodsIdList: any
  onSuccess: (any: any) => void
}
const ActivityDetailTable: React.FC<Props> = ({ goodsIdList, onSuccess }) => {
  const [data, setData] = useState([])
  const [goodsIdLists, setGoodsIdList] = useState([])
  useEffect(() => {
    setGoodsIdList(JSON.parse(JSON.stringify(goodsIdList)))
    if (goodsIdList) {
      getGoodsDetail()
    }
  }, [goodsIdList])
  const getGoodsDetail = async () => {
    const res = await ActivitiesService.goodsList({ keyword: '' })
    const goodsList = (res?.data ?? []).filter((res) => {
      return goodsIdList.includes(res.goodsId)
    })
    setData(goodsList)
  }
  const _delItem = (record, index) => {
    goodsIdLists.splice(index, 1)
    onSuccess(goodsIdLists)
  }
  const columns = [
    {
      title: '商品ID',
      dataIndex: 'goodsId',
      className: 'table-light-color',
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      className: 'table-light-color',
    },
    {
      title: '操作',
      className: 'table-light-color',
      render: (text: any, record: any, index) => (
        <Space size="middle">
          <span className="operation" onClick={() => _delItem(record, index)}>
            移除
          </span>
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
