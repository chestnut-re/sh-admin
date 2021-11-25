import axios from '@/request'

/**
 * 登录
 */
export function login(account: string, password: string): Promise<any> {
  return axios.post('/api/login', {
    account,
    password,
  })
}

/**
 * 用户列表
 *
 * pageIndex = 0, pageSize = 20
 */
export function userList(params: any): Promise<any> {
  console.log('params', params)

  return axios.get('/api/userList', {
    params: params,
  })
}

/**
 * 获取用户信息
 */
export function getUserInfo(): Promise<any> {
  return axios.get('/api/userInfo')
}

/**
 * 创建 user
 */
export function createUser(data): Promise<any> {
  return axios.post('/api/user', data)
}

/**
 * del user
 */
export const delUser = (id: string): Promise<any> => {
  return axios.delete('/api/user', { params: { id } })
}

/**
 * edit user
 */
export const editUser = (data): Promise<any> => {
  return axios.post('/api/user/edit', data)
}
