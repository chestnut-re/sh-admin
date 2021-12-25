import { getAreas } from '@/service/PersonService'
import { Cascader, TreeSelect } from 'antd'
import React, { useEffect, useState } from 'react'
/**
 * 责任区域
 */
interface Props {
  props: any
}

const Prefecture: React.FC<Props> = () => {
  const [treeData, setTreeData] = useState([])
  const [state, setState] = useState([0 - 0 - 0])
  const { SHOW_PARENT } = TreeSelect
  useEffect(() => {
    getAreas().then((res) => {
      console.log(res.data)
      setTreeData(res.data)
    })
    return () => {
      setTreeData([])
    }
  }, [])
  const onChange = (value) => {
    console.log('onChange ', value)
    setState([])
  }
  const tProps = {
    treeData,
    value: state,
    onChange: { onChange },
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: 'Please select',
    style: {
      width: '100%',
    },
  }
  return (
    <TreeSelect
      options={treeData}
      value={state}
      treeCheckable={true}
      showCheckedStrategy={SHOW_PARENT}
      style={{ width: '285px' }}
      onChange={onChange}
    />
  )
}
export default Prefecture
