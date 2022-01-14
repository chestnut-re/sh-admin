/*
 * @Description:按钮控制权限 
 * @LastEditTime: 2022-01-14 18:56:31
 */
import React from 'react'
import { useStore } from '@/store/context'
/**
 * @description: 获取用户按钮权限
 * @param {number} id 权限id
 * @return {*}
 */
export const authId = (id: number, menuList: any[]): boolean => {
  try {
    const isHave = menuList.findIndex((res) => res.id == id)
    return isHave == -1
  } catch (error) {
    console.log(error)
  }
  return false
}

interface AuthEleProps {
  id: number
  children: React.ReactElement
}
/**
 * @description: 控制具体的元素
 * @param {number} id 权限id
 * @param {any} children 包裹的子
 */
export const AuthEle = ({ id, children }: AuthEleProps): any => {
  const { adminStore } = useStore()
  return <>{authId(id, adminStore.menuBtn) && children}</>
}
