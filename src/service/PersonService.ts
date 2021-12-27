 import axios from '@/request'

 /**
  * 获取角色列表
  */
 export function getRoles(): Promise<any> {
   return axios.get('/api/platform/role/list')
 }
 /**
  * 获取责任区域
  */
 export function getAreas(): Promise<any> {
  return axios.get(`/api/area/provinceCity `)
}
/**
 * 获取结构列表
 */
 export function getStructure():Promise<any> {
   return axios.get('/api/market/channel/structure')
 }
 /**
  *  获取从属关系
  */
 export function getSubordinate(channelId):Promise<any> {
   console.log(`channelId`, channelId)
   return axios.get(`/api/users/admin/subordinationSelect/get/${channelId["channelId"]}`,channelId)
 }
 /**
  * 获取人员列表
  */
 export function getPerson(data): Promise<any> {
   return axios.post('/api/users/admin/employee/list',data
   )
 }
/**
 * 获取人员详情
 */
export function getInfo(userId):Promise<any> {
  return axios.get(`/api/users/admin/user/get/${userId}`,userId)
}
 /**
  * 添加人员
  */
 export function add(data): Promise<any> {
   return axios.post('/api/users/admin/user/add',data)
 }
 
 /**
  * 删除人员
  */
 export function del(userId): Promise<any> {
   return axios.delete(`/api/users/admin/user/delete/${userId["userId"]}`, userId)
 }
 
 /**
  * 编辑人员
  */
 export function edit(data): Promise<any> {
   return axios.put(`/api/users/admin/user/update`, data)
 }
 