import { CommonService } from '@/service/CommonService'
import { getNanoId } from '@/utils/nanoid'
import { Input, Select, Button, Space, InputNumber, Row, Col } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { FC } from 'react'

import './index.less'

interface Props {
  value?: any[]
  onChange?: (value: any[]) => void
  mode: any
}

/**
 * 商品分佣金设置
 */
export const SubCenterSelect: FC<Props> = ({ ...props }) => {
  const { onChange, value, mode } = props
  const [subCenters, setSubCenters] = useState<any[]>([])
  const [projects, setProject] = useState<any[]>([])

  useEffect(() => {
    if (mode == 'edit') {
      if (!subCenters) return
      if (value) {
        console.log(value)
        setProject(value)
      }
    }
  }, [value, subCenters])

  useEffect(() => {
    onChange?.(projects)
  }, [projects])

  //   {
  //     "directAuth": 0,
  //     "directScale": 0,
  //     "level": 0,
  //     "saleAuth": 0,
  //        "id": 11
  //     "saleScalePlan": [
  //         {
  //             "level": 0,
  //             "saleScale": 0
  //         }
  //     ],
  //     "teamPrice": 0
  // }

  useEffect(() => {
    CommonService.getStructure().then((res) => {
      setSubCenters(res.data.children)
      if (mode == 'add') {
        setProject(
          res.data.children.map((i) => {
            return {
              key: getNanoId(),
              id: i.id,
              directScale: 0,
              channelName: i.name,
              level: i.level,
            }
          })
        )
      }
    })
  }, [])

  return (
    <div className="SubCenterSelect__root">
      {projects?.map((pItem, index) => {
        console.log('pItem', pItem)
        console.log('item', subCenters)
        let selectValue
        for (const i in subCenters) {
          if (subCenters[i].id === pItem.id) {
            selectValue = subCenters[i].name
          }
        }
        console.log('selectValue', selectValue)

        return (
          <div key={pItem.key}>
            <Row key={pItem.id}>
              <Col span={14}>应用渠道：{pItem.channelName}</Col>
              <Col span={10}>
                <span>分佣比例</span>
                <InputNumber
                  readOnly={mode !== 'add'}
                  type="number"
                  min={0}
                  max={100}
                  style={{ width: 100 }}
                  addonAfter="%"
                  defaultValue={pItem['directScale']}
                  onChange={(value) => {
                    pItem['directScale'] = value
                    setProject([...projects])
                  }}
                />
              </Col>
            </Row>
          </div>
        )
      })}
    </div>
  )
}
