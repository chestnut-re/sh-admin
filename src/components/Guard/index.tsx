import { prependListener } from 'process'
import React from 'react'

interface Props {
  /**权限key */
  pKey: string
}

/**
 * admin 权限管理
 */
const Guard: React.FC<Props> = ({ pKey, children }) => {
  // pList 是权限列表
  //   if (!pList.contants(pKey)) {
  //     return <></>
  //   }
  return <>{{ children }}</>
}

export default Guard
