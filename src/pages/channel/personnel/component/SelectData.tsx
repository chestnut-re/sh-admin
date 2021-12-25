import { getSubordinate } from '@/service/PersonService'
import { Select } from 'antd'
import React, { useEffect, useState } from 'react'

/**
 * 从属关系
 */
// interface Props {
//   options: Array<any>
//   onselect: () => void
// }
const SelectData: React.FC = () => {
  useEffect(() => {
    getSubordinate(1).then((res) => {
      console.log(res)
    })
  }, [])

  return (
    <Select
      mode="multiple"
      showArrow
      // tagRender={tagRender}
      defaultValue={['gold', 'cyan']}
      style={{ width: '100px' }}
      // options={options}
    />
  )
}
export default SelectData
