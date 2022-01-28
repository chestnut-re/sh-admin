import { CommonService } from '@/service/CommonService'
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
  const [projects, setProject] = useState<any[]>([{ key: `${Date.now()}` }])
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    if (value) {
      if (mode == 'add') {
        setDisabled(false)
      } else if (mode == 'edit') {
        setDisabled(true)
      }
      console.log(value)
      setProject(value)
    }
  }, [value])

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
    })
  }, [])

  // const _addNewItem = () => {
  //   projects.push({ key: `${Date.now()}` })
  //   setProject([...projects])
  // }

  // const _delItem = (index) => {
  //   projects.splice(index, 1)
  //   setProject([...projects])
  // }

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
            {subCenters &&
              subCenters?.map((item) => {
                return (
                  <Row key={item.id}>
                    <Col span={14}>应用渠道：{item.name}</Col>
                    <Col span={10}>
                      分佣比例
                      {mode == 'add' ? (
                        <InputNumber
                          type="number"
                          style={{ width: 100 }}
                          min={0}
                          max={100}
                          addonAfter="%"
                          defaultValue={item['directScale']}
                          onChange={(value) => {
                            item['directScale'] = value
                            setProject([...projects])
                          }}
                        />
                      ) : (
                        <InputNumber
                          readOnly
                          type="number"
                          min={0}
                          max={100}
                          style={{ width: 100 }}
                          addonAfter="%"
                          defaultValue={item['directScale']}
                          onChange={(value) => {
                            item['directScale'] = value
                            setProject([...projects])
                          }}
                        />
                      )}
                    </Col>
                  </Row>
                )
              })}
          </div>
        )
      })}
    </div>
  )
}
