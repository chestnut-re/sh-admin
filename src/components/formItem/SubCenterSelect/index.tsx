import { CommonService } from '@/service/CommonService'
import { Input, Select, Button, Space, InputNumber } from 'antd'
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

  const _addNewItem = () => {
    projects.push({ key: `${Date.now()}` })
    setProject([...projects])
  }

  const _delItem = (index) => {
    projects.splice(index, 1)
    setProject([...projects])
  }

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
            <Space>
              分佣比例
              {mode == 'add' ? (
                <InputNumber
                  type="number"
                  style={{ width: 100 }}
                  addonAfter="%"
                  defaultValue={projects[index]['directScale']}
                  onChange={(value) => {
                    projects[index]['directScale'] = value
                    setProject([...projects])
                  }}
                />
              ) : (
                <InputNumber
                  readOnly
                  type="number"
                  style={{ width: 100 }}
                  addonAfter="%"
                  defaultValue={projects[index]['directScale']}
                  onChange={(value) => {
                    projects[index]['directScale'] = value
                    setProject([...projects])
                  }}
                />
              )}
              {mode == 'add' ? (
                <Select
                  style={{ width: 100 }}
                  value={selectValue}
                  onChange={(value) => {
                    projects[index].id = subCenters[value].id
                    projects[index].level = subCenters[value].level
                    projects[index].channelName = subCenters[value].name
                    setProject([...projects])
                  }}
                >
                  {subCenters.map((item, index) => {
                    return (
                      <Select.Option key={`${pItem.key}-${item.id}`} value={index}>
                        {item.name}
                      </Select.Option>
                    )
                  })}
                </Select>
              ) : (
                <Select
                  disabled
                  style={{ width: 100 }}
                  value={selectValue}
                  onChange={(value) => {
                    projects[index].id = subCenters[value].id
                    projects[index].level = subCenters[value].level
                    projects[index].channelName = subCenters[value].name
                    setProject([...projects])
                  }}
                >
                  {subCenters.map((item, index) => {
                    return (
                      <Select.Option key={`${pItem.key}-${item.id}`} value={index}>
                        {item.name}
                      </Select.Option>
                    )
                  })}
                </Select>
              )}
              {index === projects.length - 1 && (
                <Button type="primary" onClick={_addNewItem} disabled={disabled}>
                  添加
                </Button>
              )}
              {index !== 0 && (
                <Button
                  disabled={disabled}
                  type="primary"
                  onClick={() => {
                    _delItem(index)
                  }}
                >
                  删除
                </Button>
              )}
            </Space>
          </div>
        )
      })}
    </div>
  )
}
