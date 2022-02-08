/*
 * @Description:
 * @LastEditTime: 2022-02-08 11:16:46
 */
import ChannelService from '@/service/ChannelService'
import { cityDispose, regionsCodeArray } from '@/utils/tree'
import { Cascader } from 'antd'
import React, { useEffect, useState } from 'react'
import { PersonService } from '@/service/PersonService'
export type Mode = 'order' | 'other'

interface Props {
  defaultValue?: Array<any>
  channelId?: any
  perlValue?: any
  supUser?: any
  mode?: Mode
  onChange?: (value: string) => void
}

/**
 * 城市选择
 */
const AreaSelect: React.FC<Props> = ({ defaultValue, perlValue, supUser, onChange, mode, channelId }) => {
  const [area, setArea] = useState<Array<any>>([])
  const [regions, setRegions] = useState('')
  const [value, setValue] = useState<Array<any>>([])
  useEffect(() => {
    if (channelId) {
      getProvinceCity()
      getChannelInfo()
    }
  }, [channelId])

  useEffect(() => {
    // PersonService.getInfo(supUser)
    getProvinceCity()
    if (supUser) {
      getUserArea()
    }
  }, [supUser,perlValue])

  const getUserArea = () => {
    ChannelService.getUserArea(supUser).then((res) => {
      setRegions(res?.data)
    })
  }

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
      if (!!perlValue) {
        setValue(regionsCodeArray(perlValue, res?.data))
      }
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
    <>
      {mode == 'order' ? (
        <Cascader
          options={area}
          value={value}
          onChange={casOnChange}
          tagRender={tagRender}
          fieldNames={{ label: 'name', value: 'adcode', children: 'areas' }}
        />
      ) : (
        <Cascader
          options={area}
          value={value}
          onChange={casOnChange}
          tagRender={tagRender}
          multiple
          fieldNames={{ label: 'name', value: 'adcode', children: 'areas' }}
        />
      )}
    </>
  )
}

export default AreaSelect
