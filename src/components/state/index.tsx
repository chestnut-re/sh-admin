import React from 'react'
import './index.less'
interface Props {
  color: any
}
const StateStyle: React.FC<Props> = ({ color }) => {
  return (
    <span className="state__root">
      {color == 'orange' ? <span className="orange"></span> : ''}
      {color == 'green' ? <span className="green"></span> : ''}
      {color == 'grey' ? <span className="grey"></span> : ''}
      {color == 'red' ? <span className="red"></span> : ''}
      {color == 'yellow' ? <span className="yellow"></span> : ''}
    </span>
  )
}
export default StateStyle
