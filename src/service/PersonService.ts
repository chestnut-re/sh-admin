/**
 * @description 人员管理
 */

 import axios from '@/request'

 /**
  * 获取角色列表
  */
 export function getRoles(id,roleName): Promise<any> {
   return axios.get('/api/platform', {
        params:{
          id,
          roleName
        }
    })
 }
 
 /**
  * 获取人员列表
  */
 export function getPerson({pageNum , pageSize}: { pageNum: number; pageSize: number}): Promise<any> {
   return axios.get('/sys/user/page',{
     params:{
      pageNum,
      pageSize
     }
   })
 }
/**
 * 获取人员详情
 */
export function getinfo(userId):Promise<any> => {
  return axios.get(`/sys/user/info/${userId}`,{
    params:{
      userId
    }
  })
}
 /**
  *添加人员
  */
 export function add(data): Promise<any> {
   return axios.post('/sys/user/save', data)
 }
 
 /**
  * 删除人员
  */
 export const del = (id: string): Promise<any> => {
   return axios.delete('/sys/user/delete/{id}', { 
     params: { id } 
    })
 }
 
 /**
  * 编辑人员
  */
 export const edit = (data): Promise<any> => {
   return axios.put('/sys/user/update', data)
 }
 