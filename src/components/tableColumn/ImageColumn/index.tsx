import React from 'react'
import { deprecate } from 'util'
import './index.less'

interface Props {
  url: any
}

/**
 * 列表图片
 * Table img
 */
const ImageColumn: React.FC<Props> = ({ url }) => {
  return <img src={url} alt="" />
}
export default ImageColumn
