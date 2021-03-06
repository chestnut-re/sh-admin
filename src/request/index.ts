/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */

import { userLoginOut } from '@/utils/biz'
import { message } from 'antd'
import axios from 'axios'
import createHeader from './custom-header'
const JSONbigString = require('json-bigint')({ storeAsString: true })

// 创建axios实例
const instance = axios.create({
  timeout: 1000 * 10,
  headers: {
    // get: {
    //   'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    // },
    post: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  },
  // 解决相应数据 bingint 精度丢失问题
  transformResponse: [
    function (data) {
      /* eslint-disable no-undef */
      try {
        return JSONbigString.parse(data)
      } catch (error) {
        console.log(error)
        return data
      }
    },
  ],
})

// add global params
// instance.defaults.params = {}
// instance.defaults.params['clienttype'] = 'WEB'

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    let headers = createHeader()
    for (let i in headers) {
      config.headers[i] = (headers as any)[i]
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  (res) => {
    console.log('res', res)
    if (res.status === 200) {
      if (res.data.code !== '200') {
        message.error(res.data.msg)
      }
      if (
        res.data.code === '010011' ||
        res.data.code === '000003' ||
        res.data.code === '010010' ||
        res.data.code === '010014' ||
        res.data.code === '010012'
      ) {
        // 登录态失效
        setTimeout(() => {
          userLoginOut()
        }, 2000)
        return
      }
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res.data)
    }
  },
  // 请求失败
  (error) => {
    const { response } = error
    // console.log('response', response)
    message.error(`服务器错误: ${response?.status ?? ''}`)
    return Promise.reject(response)
  }
)

export default instance
