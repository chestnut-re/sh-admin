import { getJWT } from '@/utils/biz'

// 自定义请求头
export default () => {
  const headers = {
    mclient: 'web',
    Lang: 'zh-CN',
  }
  if (getJWT()) {
    headers['Authorization'] = getJWT()
  }
  return headers
}
