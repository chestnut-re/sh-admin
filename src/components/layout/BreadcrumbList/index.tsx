/*
 * @Description:
 * @LastEditTime: 2022-01-25 15:38:31
 */
import React, { FC, useEffect, useState } from 'react'
import { Breadcrumb } from 'antd'
import { useLocation } from 'react-router'
import { getBread } from '@/utils/newTree'
interface Props {
  children: React.ReactElement
  adminStore: any
}
const BreadcrumbDom: React.FC<Props> = ({ children, adminStore }) => {
  const { pathname } = useLocation()
  const [menuList, setMenuList] = useState([])
  useEffect(() => {
    setMenuList(getBread(adminStore, pathname))
  }, [pathname])

  return (
    <>
      {(menuList ?? []).find((res) => res?.visible == true) && (
        <Breadcrumb separator=">">
          {(menuList ?? []).map((item, index) => {
            return (
              <Breadcrumb.Item key={index}>
                <a
                  onClick={() => {
                    window.history.back(-1)
                  }}
                >
                  {item?.name}
                </a>
              </Breadcrumb.Item>
            )
          })}
        </Breadcrumb>
      )}
      {children}
    </>
  )
}
export default BreadcrumbDom
