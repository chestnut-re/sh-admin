import { CommonService } from '@/service/CommonService'
import { useStore } from '@/store/context'
import { cityDispose } from '@/utils/tree'
import { Cascader } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import './index.less'
interface Props {
  value?: any[]
  onChange?: (value: any[]) => void
}

const getAdCodeValue = (area, adcode): any[] => {
  const ret: any[] = []
  area.map((i) => {
    const inner = i.areas.find((ii) => ii.adcode === adcode)
    if (inner) {
      ret[0] = i.name
      ret[1] = inner.name
    }
  })
  return ret
}

/**
 * 始发地
 * TODO: 数据回显
 */
const OriginLocation: React.FC<Props> = () => {
  const { productionStore } = useStore()
  const [area, setArea] = useState<Array<any>>([])
  const [value, setValue] = useState<Array<any>>([])

  useEffect(() => {
    CommonService.getProvinceCity().then((res) => {
      console.log(res)
      setArea(cityDispose(res?.data, 'areas'))
    })
  }, [])

  useEffect(() => {
    // 回显示数据
    // productionStore.data.departureCity
    // productionStore.data.departureCityAdcode
    if (area && area.length > 0 && productionStore.data.departureCityAdcode) {
      setValue(getAdCodeValue(area, productionStore.data.departureCityAdcode))
    }
  }, [productionStore.data, area])

  const casOnChange = (data, selectOptions) => {
    setValue(data)
    productionStore.setDepartureCity(selectOptions[1].name, data[1])
  }

  return (
    <div className="OriginLocation__root">
      <span className="pla-name">始发地:</span>
      <Cascader
        size="small"
        options={area}
        onChange={casOnChange}
        value={value}
        fieldNames={{ label: 'name', value: 'adcode', children: 'areas' }}
      />
    </div>
  )
}

export default observer(OriginLocation)
