/*
 * @Description:
 * @LastEditTime: 2022-01-11 19:24:11
 */
//             <Table rowKey="goodsNo" bordered dataSource={dataSourceValue} columns={columns} pagination={false} />

import React, { useEffect, useState } from 'react'
import { Form, Button, Table, Col, Row, Space } from 'antd'
interface Props {
  data: any
  showType: any
}
const ShowGoodsTaskModal: React.FC<Props> = ({ data, showType }) => {
  const [RoleData, setRoleData] = useState([])
  useEffect(() => {
    if (!!data) {
      setRoleData(JSON.parse(data))
    }
  }, [data, showType])
  const columns =
    showType == 'goods'
      ? [
          {
            title: '序号',
            align: 'center',
            render: (text, record, index) => `${index + 1}`,
          },
          {
            title: '商品ID',
            align: 'center',
            dataIndex: 'goodsId',
          },
          {
            title: '商品名称',
            align: 'center',
            dataIndex: 'goodsName',
          },
          {
            title: '关联时间',
            align: 'center',
            dataIndex: 'releTime',
          },
        ]
      : [
          {
            title: '序号',
            align: 'center',
            render: (text, record, index) => `${index + 1}`,
          },
          {
            title: '清单ID',
            align: 'center',
            dataIndex: 'id',
          },
          {
            title: '清单名称',
            align: 'center',
            dataIndex: 'name',
          },
          {
            title: '关联时间',
            align: 'center',
            dataIndex: 'releTime',
          },
        ]

  return (
    <>
      {JSON.parse(data)}
      <Table key="id" columns={columns} dataSource={[...RoleData]} pagination={false} />
    </>
  )
}

export default ShowGoodsTaskModal
