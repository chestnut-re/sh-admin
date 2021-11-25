import Mock from 'mockjs'

import menu from './menu/menu'
import user from './system/user'

const mocks = [...menu, ...user]

// mock请求方法放在这里统一处理,1是简便写法,2是如果请求路径需要加统一前缀或域名,可以在这里处理
for (const i of mocks) {
  Mock.mock(i.url, i.type, i.response)
}
