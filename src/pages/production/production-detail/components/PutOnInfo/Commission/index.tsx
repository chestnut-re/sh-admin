import { ProductionService } from '@/service/ProductionService'
import { Select, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import debounce from 'lodash/debounce'
import { ProductionCommission } from '@/service/ProductionCommission'

interface Props {
  value?: any
  onChange?: (value: any) => void
}

/**
 * 商品渠道分佣方案
 */
const Commission: React.FC<Props> = ({ value, onChange }) => {
  const [productType, setProductType] = useState<any[]>([])
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    loadOptions('')
  }, [])

  const loadOptions = (value: string) => {
    setFetching(true)
    setProductType([])
    ProductionCommission.list({ current: 1, planName: value }).then((res) => {
      setFetching(false)
      setProductType(res.data.records)
    })
  }

  const debounceFetcher = React.useMemo(() => {
    return debounce(loadOptions, 1000)
  }, [])

  const goodsTypeHandleChange = (value, option) => {
    console.log('goodsTypeHandleChange', value, productType.find((i) => i.id == option.key))
    onChange?.(productType.find((i) => i.id == option.key))
  }

  return (
    <Select
      showSearch
      allowClear
      style={{ width: '100%' }}
      placeholder="请选择商品分佣方案"
      onChange={goodsTypeHandleChange}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin /> : '暂无数据'}
      onDropdownVisibleChange={(open) => {
        if (open) {
          loadOptions('')
        }
      }}
    >
      {productType &&
        productType.map((item) => (
          <Select.Option name={item['planName']} value={item['planName']} key={item['id']}>
            {item['planName']}
          </Select.Option>
        ))}
    </Select>
  )
}

export default Commission
