import { CommonService } from '@/service/CommonService'
import { Input, Select, Button, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { FC } from 'react'

import './index.less'

interface Props {
  value?: any[]
  onChange?: (value: any[]) => void
}

/**
 * 商品分佣金设置
 */
export const SubCenterSelect: FC<Props> = ({ ...props }) => {
  const { onChange, value = [{ key: `${Date.now()}` }] } = props
  const [subCenters, setSubCenters] = useState<any[]>([])
  const [projects, setProject] = useState<any[]>([{ key: `${Date.now()}` }])

  useEffect(() => {
    setProject(value)
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
        const selectValue = subCenters.filter((item) => item.id === pItem.id)[0]?.value
        return (
          <div key={pItem.key}>
            <Space>
              分佣比例 <Input type="number" style={{ width: 80 }} /> %
              <Select
                style={{ width: 100 }}
                value={selectValue}
                onChange={(value) => {
                  projects[index].id = subCenters[value].id
                  projects[index].level = subCenters[value].level
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
              {index === projects.length - 1 && (
                <Button type="primary" onClick={_addNewItem}>
                  添加
                </Button>
              )}
              {index !== 0 && (
                <Button
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
