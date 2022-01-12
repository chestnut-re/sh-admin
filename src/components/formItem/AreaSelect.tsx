/*
 * @Description:
 * @LastEditTime: 2022-01-12 15:55:14
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
    setValue(JSON.parse(JSON.stringify(defaultValue ?? [])))
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

  const tagRender = (labels, selectedOptions) => {
    console.log()
    const dataAreas = area.find((res) => res.adcode == labels.value)
    if (!dataAreas) {
      return <>{labels.label + ','}</>
    } else {
      const valueData = dataAreas.areas.map((resC) => {
        console.log(resC, 'resC')
        return resC.name
      })
      return <>{valueData.join(',')}</>
    }
    // console.log(labels,selectedOptions,'-----------',area)
  }

  /**
   * @description: 负责区域
   */
  const getProvinceCity = async () => {
    ChannelService.getProvinceCity({ adcodes: regions }).then((res) => {
      setArea(cityDispose(res?.data, 'areas'))
    })
  }
  // const casOnChange = (data: any[]) => {
  //   data.map((items, index, arr) => {
  //     if (items.length < 2) {
  //       console.log(area.find((res) => res.adcode == items[0]))
  //       arr[index].push(area.find((res) => res.adcode == items[0])?.['areas']?.[0]?.['adcode'])
  //     }
  //   })
  //   setValue(data)
  //   onChange?.(data)
  // }
  const casOnChange = (data: any[]) => {
    for (let index = 0; index < data.length; index++) {
      const element = data[index]
      if (data[index].length < 2) {
        const child = area.find((res) => res.adcode == element[0])['areas']
        const newList = child.map((res) => {
          return [element, res.adcode]
        })
        data.splice(index, 1, ...newList)
      }
    }
    setValue(data)
  }
  return (
    <Cascader
      options={area}
      value={value}
      onChange={casOnChange}
      tagRender={tagRender}
      multiple
      fieldNames={{ label: 'name', value: 'adcode', children: 'areas' }}
    />
  )
}

export default AreaSelect
