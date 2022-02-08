import useQuery from '@/hooks/useQuery'
import { ProductionService } from '@/service/ProductionService'
import { useStore } from '@/store/context'
import { Button, Form, message, Table } from 'antd'
import Column from 'antd/lib/table/Column'
import ColumnGroup from 'antd/lib/table/ColumnGroup'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Commission from './Commission'
import './index.less'

/**
 * 上架申请
 */
const CenterPutOnRequest: React.FC = () => {
  const history = useNavigate()
  const query = useQuery()
  const { productionDetailStore } = useStore()
  const [maxLevel, setMaxLevel] = useState(0)

  const [form] = Form.useForm()
  // const [commission, setCommission] = useState<any>({})
  const [list, setList] = useState<any>([])
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  }

  const _onCommissionChange = (value) => {
    console.log('分佣方案', value)
    value.channelPlanList.map((item, index) => {
      item.saleScalePlan.map((it) => {
        item['s' + it.level] = it.saleScale
      })
    })

    // saleScalePlanLevel0

    const newPL = value?.channelPlanList.map((i) => {
      i.saleScalePlan.map((ii, index) => {
        i[`saleScalePlanLevel${index}`] = ii.level
        i[`saleScalePlan${index}`] = ii.saleScale
      })
      return i
    })

    setList(newPL ?? [])
    // setCommission(value?.channelPlanList)

    if (value?.channelPlanList) {
      let maxLevel = 0
      value?.channelPlanList.map((i) => {
        maxLevel = Math.max(maxLevel, i.saleScalePlan?.length)
      })
      setMaxLevel(maxLevel)
    }
  }

  /**提交发布 */
  const _submit = () => {
    form
      .validateFields()
      .then((formData) => {
        console.log(formData)
        const postData = { ...formData }
        const savePlan = postData.distPlanId
        postData.channelPlanList = savePlan?.channelPlanList
        postData.distPlanId = savePlan.id
        postData.presetBonus = savePlan.presetBonus
        postData.goodsId = query.get('id')

        console.log(postData)
        ProductionService.centerPutOnRequest(postData).then((res) => {
          if (res.code === '200') {
            message.success('上架申请提交成功')
            history(-1)
          }
        })
      })
      .catch((e) => {
        console.error(e)
      })
  }

  return (
    <div className="CenterPutOnRequest__root">
      <h4>5. 上架申请</h4>
      <Form name="basic" initialValues={{ remember: true }} autoComplete="off" form={form} {...layout}>
        <Form.Item label="分佣方案" name="distPlanId" rules={[{ required: true }]}>
          <Commission onChange={_onCommissionChange} />
        </Form.Item>
        {/* <div>{JSON.stringify(commission)}</div> */}
        <div>
          <Table dataSource={list} bordered>
            <Column title="渠道名称" dataIndex="channelName" key="channelName" />
            <Column title="直销分佣比例" dataIndex="directScale" key="directScale" />
            <Column title="渠道等级" dataIndex="level" key="level" />
            <ColumnGroup title="分销分佣">
              <>
                <Column title="渠道等级" dataIndex="saleScalePlanLevel0" key="lastName" />
                <Column title="分销分佣比例" dataIndex="saleScalePlan0" key="lastName" />
              </>
              {maxLevel > 1 && (
                <>
                  <Column title="渠道等级" dataIndex="saleScalePlanLevel1" key="lastName" />
                  <Column title="分销分佣比例" dataIndex="saleScalePlan1" key="lastName" />
                </>
              )}
              {maxLevel > 2 && (
                <>
                  <Column title="渠道等级" dataIndex="saleScalePlanLevel2" key="lastName" />
                  <Column title="分销分佣比例" dataIndex="saleScalePlan2" key="lastName" />
                </>
              )}
              {maxLevel > 3 && (
                <>
                  <Column title="渠道等级" dataIndex="saleScalePlanLevel3" key="lastName" />
                  <Column title="分销分佣比例" dataIndex="saleScalePlan3" key="lastName" />
                </>
              )}
            </ColumnGroup>
            <Column title="发团服务费" dataIndex="teamPrice" key="teamPrice" />
          </Table>
        </div>
        <Button onClick={_submit}>提交申请</Button>
      </Form>
    </div>
  )
}

export default observer(CenterPutOnRequest)
