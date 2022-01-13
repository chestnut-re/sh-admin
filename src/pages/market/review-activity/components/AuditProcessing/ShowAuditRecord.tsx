/*
 * @Description:
 * @LastEditTime: 2022-01-11 18:52:18
 */

import React, { useEffect, useState } from 'react'
import { Form, Button, Table, Col, Row, Space } from 'antd'
import { rebateService } from '@/service/marketService'
interface Props {
  data: any
}
const statusEnum = {
  0: '待审核',
  1: '审核通过',
  2: '审核拒绝',
}
const ShowAuditRecord: React.FC<Props> = ({ data }) => {
  const [RoleData, setRoleData] = useState([])
  useEffect(() => {
    if (!!data) {
      rebateService
        .rebateAuditRecordPage({
          rebateAuditId: JSON.parse(data)?.id,
          current: 1,
          size: 1000,
        })
        .then((res) => {
          setRoleData(res?.data?.records)
        })
    }
  }, [data])
  const columns = [
    {
      title: '序号',
      align: 'center',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '审核项目',
      align: 'center',
      dataIndex: 'rebateName',
      render: (text, record, index) => `${record.type == 1 ? '商品' : '清单'}`,
    },
    {
      title: '审核内容',
      align: 'center',
      dataIndex: 'content',
    },
    {
      title: '驳回原因',
      align: 'center',
      dataIndex: 'refuseReason',
    },
    {
      title: '审核结果',
      align: 'center',
      dataIndex: 'password',
      render: (text, record, index) => `${statusEnum[record.auditResult]}`,
    },
    {
      title: '审核人',
      align: 'center',
      dataIndex: 'auditUserName',
    },
    {
      title: '审核时间',
      align: 'center',
      dataIndex: 'auditTime',
    },
  ]

  return (
    <>
      <Table rowKey="id" columns={columns} dataSource={[...RoleData]} pagination={false} />
    </>
  )
}

export default ShowAuditRecord
