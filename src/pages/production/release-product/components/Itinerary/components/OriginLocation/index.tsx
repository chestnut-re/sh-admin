import { CommonService } from '@/service/CommonService'
import { useStore } from '@/store/context'
import { cityDispose } from '@/utils/tree'
import { Cascader } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'

/**
 * 始发地
 * TODO: 数据回显
 */
const OriginLocation: React.FC = () => {
  const { productionStore } = useStore()
  const [area, setArea] = useState<Array<any>>([])

  useEffect(() => {
    CommonService.getProvinceCity().then((res) => {
      console.log(res)
      setArea(cityDispose(res?.data, 'areas'))
    })
  }, [])

  const casOnChange = (data, selectOptions) => {
    productionStore.setDepartureCity(selectOptions[1].name, data[1])
  }

  return (
    <div>
      始发地:
      <Cascader
        options={area}
        onChange={casOnChange}
        // tagRender={tagRender}
        fieldNames={{ label: 'name', value: 'adcode', children: 'areas' }}
      />
    </div>
  )
}

export default observer(OriginLocation)
