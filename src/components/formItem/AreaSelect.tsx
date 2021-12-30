/*
 * @Description: 
 * @LastEditTime: 2021-12-30 12:00:39
 */
import ChannelService from '@/service/ChannelService'
import { cityDispose } from '@/utils/tree'
import { Cascader } from 'antd'
import React, { useEffect, useState } from 'react'

interface Props {
  value?: string
  channelId:any
  onChange?: (value: string) => void
}

/**
 * 城市选择
 */
const AreaSelect: React.FC<Props> = ({ value, onChange }) => {
  const [area, setArea] = useState<Array<any>>([])

  useEffect(() => {
    getProvinceCity()
  }, [])

  useEffect(() => {
    onChange?.(value ?? '')
  }, [value])

  /**
   * @description: 负责区域
   */
  const getProvinceCity = async () => {
    ChannelService.getProvinceCity().then((res) => {
      setArea(cityDispose(res?.data, 'areas'))
    })
  }

  const casOnChange = (data: any[]) => {
    console.log('data', data)
    const newD = data.map((item, index, arr) => {
      return `${item[item.length-1]}`
    })
    console.log(newD);
    onChange?.(newD.toString())
  }

  return (
    <Cascader
      options={area}
      onChange={casOnChange}
      multiple
      fieldNames={{ label: 'name', value: 'adcode', children: 'areas' }}
    />
  )
}

export default AreaSelect
