import React from 'react'
import './index.less'

interface Props {
  url: any
}

/**
 * 列表图片
 */
const ThumbnailPage: React.FC<Props> = ({ url }) => {
  return <img src={url} alt="" />
}
export default ThumbnailPage
