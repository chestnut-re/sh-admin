/*
 * @Description:
 * @LastEditTime: 2022-01-11 10:23:02
 */
//             <Table rowKey="goodsNo" bordered dataSource={dataSourceValue} columns={columns} pagination={false} />

import React, { useState } from 'react'
import { Form, Button, Table, Col, Row, Space } from 'antd'
interface Props {
  data: any
}
const ShowTaskModal: React.FC<Props> = ({ data }) => {
  const columns = [
    {
      title: '序号',
      align: 'center',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '清单ID',
      align: 'center',
      dataIndex: 'account',
    },
    {
      title: '清单名称',
      align: 'center',
      dataIndex: 'password',
    },
    {
      title: '关联时间',
      align: 'center',
      dataIndex: 'name',
    },
    {
      title: '审核状态',
      align: 'center',
      dataIndex: 'role',
    },
  ]

  return (
    <div className="page-root">
      <Table rowKey="id" columns={columns} dataSource={[...data]} />
    </div>
  )
}

export default ShowTaskModal
