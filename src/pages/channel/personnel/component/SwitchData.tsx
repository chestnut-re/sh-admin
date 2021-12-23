import React from 'react'
import { Switch } from 'antd'

const SwitchData: React.FC = () => {
  const onChange = (checked) => {
    console.log(`switch to ${checked}`)
  }
  return (
    <div>
      <Switch onChange={onChange} />
    </div>
  )
}

export default SwitchData
