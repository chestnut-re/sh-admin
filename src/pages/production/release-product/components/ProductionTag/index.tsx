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
const ProductionTag: React.FC<Props> = ({value, onChange}) => {
  const [productType, setProductType] = useState([])
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    loadOptions('')
  }, [])

  const loadOptions = (value: string) => {
    setFetching(true)
    setProductType([])
    ProductionService.tagList({ sortName: value }).then((res) => {
      setFetching(false)
      setProductType(res.data)
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
