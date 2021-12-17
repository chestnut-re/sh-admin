import axios from '@/request'

export class UserService {
  /**
   * 登录
   */
  static login(username: string, password: string): Promise<any> {
    return axios.post('/api/users/admin/login', {
      username,
      password,
    })
  }
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

/**
 *
 * 用户列表
 */
export const usersQueryList = (data): Promise<any> => {
  return axios.post('/api/users/admin/userInfo/list', data)
}
/**
 * 
 用户订单详情    
 */

export const usersOrdersDetail = (data): Promise<any> => {
  return axios.post('/api/users/ordersDetail', data)
}
/**
 * 
用户详情
 */

export function usersDetail({ userId }): Promise<any> {
  return axios.get(`/api/users/detail/${userId}`)
}
/**
 * 创建B端用户
 */
export const usersAddUser = (data): Promise<any> => {
  return axios.post('/api/users/addUser', data)
}
