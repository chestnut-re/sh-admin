import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { Map, Marker } from 'react-amap'

import './index.less'

interface Props {
  value?: any[]
  onChange?: (value: any[]) => void
}

const MapComp: React.FC<Props> = ({ value, onChange }) => {
  const [position, setPosition] = useState<any>()
  const [pois, setPois] = useState<any[]>([])
  const [signAddr, setSignAddr] = useState<any>({})

  useEffect(() => {
    if (!value) return
    setPosition(value)
  }, [value])

  useEffect(() => {
    onChange?.(position)
  }, [position])

  const mapEvents = {
    // created必须要拥有,用来初始化创建相应对象
    created: () => {
      let auto
      let placeSearch
      window['AMap'].plugin('AMap.Autocomplete', () => {
        auto = new window['AMap'].Autocomplete({
          input: 'tipinput',
          pageSize: 10,
          pageIndex: 1,
          citylimit: false, // 仅搜索本城市的地名
          //   city: '昆明', // 限制为只能搜索当前地区的位置
          outPutDirAuto: true,
          // type: '汽车服务|汽车销售|汽车维修|摩托车服务|餐饮服务|购物服务|生活服务|体育休闲服务|医疗保健服务|住宿服务|风景名胜|商务住宅|政府机构及社会团体|科教文化服务|交通设施服务|金融保险服务|公司企业|道路附属设施|地名地址信息|公共设施'
        })
      })
      // 创建搜索实例
      window['AMap'].plugin('AMap.PlaceSearch', () => {
        placeSearch = new window['AMap'].PlaceSearch({
          input: 'tipinput',
          pageSize: 10,
          pageIndex: 1,
          citylimit: false, // 仅搜索本城市的地名
        })
      })

      window['AMap'].event.addListener(auto, 'select', (e) => {
        placeSearch.search(e.poi.name)
      })
    },
    click: (event) => {
      const position: [number, number] = [event.lnglat.getLng(), event.lnglat.getLat()]
      console.log('click position', position)
      setPosition(position)
    },
  }

  // 进行select框动态输入焦点事件监听，并实现搜索
  const onSearch = (val: any, isFocus = false) => {
    console.log('onSearch', val)

    // 获取到当前得位置进行搜索区域限制
    // const city = this.props.areaSelectData.id
    // const { pois } = this.state
    // if (isFocus && pois && pois.length) {
    //   return
    // }
    const place = new window['AMap'].PlaceSearch({
      pageSize: 10,
      pageIndex: 1,
      //   citylimit: true, // 仅搜索本城市的地名
      //   city, // 限制为只能搜索当前地区的位置
    })
    // 进行搜索
    place.search(val, (status, result) => {
      console.log(status, result)

      const { info, poiList } = result
      if (result.length) {
        return
      }
      if (info !== 'OK') {
        return
      }
      if (poiList.pois && Array.isArray(poiList.pois)) {
        console.log('poiList.pois', poiList.pois)
        setPois(poiList.pois)
      }
    })
  }

  // 选中某条数据，并返回给子组件
  const onPChange = (id) => {
    const signAddrList = pois.find((item) => item.id === id) || null
    console.log(signAddrList)
    if (signAddrList) {
      setSignAddr(signAddrList)
    }
  }

  return (
    <div className="MapComp__root">
      <Map
        amapkey={'667b965b48a621689b7677f5e5f86d2e'}
        // zoomEnable
        events={mapEvents}
        plugins={['ToolBar', 'Scale']}
        center={signAddr?.location ? [signAddr?.location?.lng ?? 0, signAddr?.location?.lat ?? 0] : undefined}
        zoom={15}
      >
        <Marker position={{ longitude: signAddr?.location?.lng, latitude: signAddr?.location?.lat }} />
        {position && <Marker position={{ longitude: position[0], latitude: position[1] }} />}
      </Map>

      <Select
        className="map-input"
        showSearch
        style={{ width: '100%' }}
        placeholder="请输入地址"
        optionFilterProp="children"
        // value={this.state.value}
        onSearch={onSearch}
        onFocus={(e) => onSearch(e.target.value, true)}
        onChange={onPChange}
      >
        {pois.map((item) => (
          <Select.Option key={item.id} value={item.id}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </div>
  )
}

export default MapComp
