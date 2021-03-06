import { Select, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import debounce from 'lodash/debounce'
import { ConfigManagementService } from '@/service/OrderService'

interface Props {
  value?: any
  onChange?: (value: any) => void
  onChangeContent: (value: string) => void
}

/**
 * 退改政策
 */
const Policy: React.FC<Props> = ({ value, onChange, onChangeContent }) => {
  const [datas, setData] = useState<any[]>([])
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    loadOptions('')
  }, [])

  const loadOptions = (value: string) => {
    setFetching(true)
    setData([])
    ConfigManagementService.list({ policyName: value, size: 100, current: 1 }).then((res) => {
      setFetching(false)
      setData(res.data.records)
    })
  }

  const debounceFetcher = React.useMemo(() => {
    return debounce(loadOptions, 1000)
  }, [])

  const goodsTypeHandleChange = (value, option) => {
    console.log('goodsTypeHandleChange', value, option)
    onChange?.(value)
    console.log('onChangeContent');
    if (!value) {
      onChangeContent('')
      return
    }
    const id = value.split('-')[0]
    const d = datas.find((res) => res.id === id)
    console.log('d', d);
    if (d) {
      onChangeContent(d.policyContent)
    }
  }

  return (
    <Select
      allowClear
      value={value}
      style={{ width: '100%' }}
      placeholder="请选择退改政策"
      onChange={goodsTypeHandleChange}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin /> : '暂无数据'}
      onDropdownVisibleChange={(open) => {
        if (!open) {
          loadOptions('')
        }
      }}
    >
      {datas &&
        datas.map((item) => (
          <Select.Option
            name={`${item['id']}-${item['policyName']}`}
            value={`${item['id']}-${item['policyName']}`}
            key={`${item['id']}-${item['policyName']}`}
          >
            {item['id']}-{item['policyName']}
          </Select.Option>
        ))}
    </Select>
  )
}

export default Policy
