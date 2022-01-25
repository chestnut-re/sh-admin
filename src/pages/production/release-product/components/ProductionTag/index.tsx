import { ProductionService } from '@/service/ProductionService'
import { Select, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import debounce from 'lodash/debounce'

interface Props {
  value?: any
  onChange?: (value: any) => void
}

/**
 * 商品标签
 */
const ProductionTag: React.FC<Props> = ({ value, onChange }) => {
  const [productType, setProductType] = useState<any[]>([])
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    loadOptions('')
  }, [])

  const loadOptions = (value: string) => {
    setFetching(true)
    setProductType([])
    ProductionService.tagList({ sortName: value }).then((res) => {
      setFetching(false)
      if (res.data) {
        const list: any[] = []
        res.data.map((i) => {
          list.push({
            id: i.id,
            operationType: i.operationType,
            parentId: i.parentId,
            sortName: i.sortName,
          })
          if (i.children) {
            i.children.map((c) => {
              list.push({
                id: c.id,
                operationType: c.operationType,
                parentId: c.parentId,
                sortName: c.sortName,
              })
            })
          }
        })
        setProductType(list)
      }
    })
  }

  const debounceFetcher = React.useMemo(() => {
    return debounce(loadOptions, 1000)
  }, [])

  const goodsTypeHandleChange = (value) => {
    console.log('goodsTypeHandleChangegoodsTypeHandleChange', value)
    onChange?.(value)
  }

  return (
    <Select
      allowClear
      value={value}
      style={{ width: '100%' }}
      placeholder="请选择商品分类"
      onChange={goodsTypeHandleChange}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin /> : '暂无数据'}
      onDropdownVisibleChange={(open) => {
        if (!open) {
          loadOptions('')
        }
      }}
    >
      {productType &&
        productType.map((item) => (
          <Select.Option name={item['sortName']} value={item['sortName']} key={item['sortName']}>
            {item['sortName']}
          </Select.Option>
        ))}
    </Select>
  )
}

export default ProductionTag
