import useQuery from '@/hooks/useQuery'
import { ProductionService } from '@/service/ProductionService'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Table, Tag, Space } from 'antd'
import './index.less'
const { Column, ColumnGroup } = Table

/**
 * 分中心上架申请 展示
 * 分中心视角，查看自己的申请
 */
const CenterPutOnRequestShowSubCenter: React.FC = () => {
  const history = useHistory()
  const query = useQuery()
  const { productionDetailStore } = useStore()
  const [data, setData] = useState<any>({})

  const dataList = [
    // {
    //   key: '1',
    //   firstName: 'John',
    //   lastName: 'Brown',
    //   age: 32,
    //   address: 'New York No. 1 Lake Park',
    //   tags: ['nice', 'developer'],
    // }
  ]
  useEffect(() => {
    const id = query.get('channelGoodsId') ?? ''
    ProductionService.centerPutOnRequestGet(id).then((res) => {
      setData(res.data)
    })
  }, [])

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  }

  return (
    <div className="CenterPutOnRequestShow__root">
      <h4>5. 上架申请信息</h4>
      <div>{JSON.stringify(data)}</div>
      <div className="info">
        <div className="one-info">
          <div className="canal">申请渠道 </div>
          <div>责任区域 </div>
        </div>
        <div>申请人 </div>
        <div>申请时间 </div>
        <div>分佣方案 </div>
        <div>
          表格
          <Table dataSource={dataList} bordered>
            <Column title="直销方" dataIndex="age" key="age" />
            <Column title="直销分佣" dataIndex="age" key="age" />
            <ColumnGroup title="分销分佣">
              <Column title="二级名称" dataIndex="firstName" key="firstName" />
              <Column title="三级名称" dataIndex="lastName" key="lastName" />
              <Column title="四级名称" dataIndex="lastName" key="lastName" />
            </ColumnGroup>
            <Column title="发团服务费" dataIndex="address" key="address" />
            <Column
              title="合计分佣"
              dataIndex="tags"
              key="tags"
              render={(tags) => (
                <>
                  {tags.map((tag) => (
                    <Tag color="blue" key={tag}>
                      {tag}
                    </Tag>
                  ))}
                </>
              )}
            />
          </Table>
        </div>
      </div>
    </div>
  )
}

export default observer(CenterPutOnRequestShowSubCenter)
