/**
 * @description 角色相关
 */

import axios from '@/request'

/**
 * 获取角色
 */
export function getRoles(pageIndex = 0, pageSize = 20): Promise<any> {
  return axios.get('/api/role/list', {
    params: {
      pageIndex,
      pageSize,
    },
  })
}

/**
 * 获取角色 all
 */
export function getRolesAll(): Promise<any> {
  return axios.get('/api/role/all')
}

/**
 * 创建角色
 */
export function createRole(data): Promise<any> {
  return axios.post('/api/role', data)
}

/**
 * del role
 */
export const delRole = (id: string): Promise<any> => {
  return axios.delete('/api/role', { params: { id } })
}

/**
 * edit role
 */
export const editRole = (data): Promise<any> => {
  return axios.post('/api/role/edit', data)
}
