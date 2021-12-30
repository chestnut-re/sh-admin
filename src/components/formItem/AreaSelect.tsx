/*
 * @Description:
 * @LastEditTime: 2021-12-30 17:50:22
 */
import ChannelService from '@/service/ChannelService'
import { cityDispose } from '@/utils/tree'
import { Cascader } from 'antd'
import React, { useEffect, useState } from 'react'

interface Props {
  defaultValue?: Array<any>
  channelId: any
  onChange?: (value: string) => void
}

/**
 * 城市选择
 */
const AreaSelect: React.FC<Props> = ({ defaultValue, onChange, channelId }) => {
  const [area, setArea] = useState<Array<any>>([])
  const [regions, setRegions] = useState('')
  const [value, setValue] = useState<Array<any>>([])
  useEffect(() => {
    getProvinceCity()
    if (channelId) {
      getChannelInfo()
    }
  }, [channelId])
  useEffect(() => {
    setValue(JSON.parse(JSON.stringify(defaultValue??[])))
  }, [defaultValue])

  useEffect(() => {
    onChange?.(value ?? '')
  }, [value])

  const getChannelInfo = () => {
    ChannelService.get(channelId).then((res) => {
      setRegions(res?.data?.regions)
    })
  }

  useEffect(() => {
    getProvinceCity()
    setValue([])
  }, [regions])
  
  // const tagRender = (labels, selectedOptions) =>{
  //   console.log(labels,selectedOptions,'-----------')
  //   return  (<p>{labels.label }</p>)
  // }

  /**
   * @description: 负责区域
   */
  const getProvinceCity = async () => {
    ChannelService.getProvinceCity({ adcodes: regions }).then((res) => {
      setArea(cityDispose(res?.data, 'areas'))
    })
  }
  const casOnChange = (data: any[]) => {
    data.map((items, index, arr) => {
      if (items.length < 2) {
        console.log(area.find((res) => res.adcode == items[0]))
        arr[index].push(area.find((res) => res.adcode == items[0])?.['areas']?.[0]?.['adcode'])
      }
    })
    setValue(data)
    onChange?.(data)
  }
  return (
    <Cascader
      options={area}
      value={value}
      onChange={casOnChange}
      // tagRender={tagRender}
      multiple
      fieldNames={{ label: 'name', value: 'adcode', children: 'areas' }}
    />
  )
}

export default AreaSelect
