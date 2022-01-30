import { adminStore } from '@/store/context';
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'


Sentry.init({
  dsn: 'https://07f4b038abcf45619ca5bc1703fe586a@sentry.mountainseas.cn/3',
  // 初始参数配置内容
  integrations: [new Integrations.BrowserTracing()],
  // 触发异常后发送给 Sentry 的概率, 1.0=100%
  tracesSampleRate: 1.0,
  // 环境信息
  environment: process.env.NODE_ENV,
  // 控制应捕获的面包屑(行为栈)的总量
  maxBreadcrumbs: 20,
  // 规定上下文数据结构的深度，默认为 3
  normalizeDepth: 100,
  // 版本信息
  release: 'sh-travel@1.0.0',
  // 钩子函数，在每次发送 event 前触发
  beforeSend(event) {
    // 网页应用刷新后设置的变量会消失，所以我选择在 beforeSend 触发时插入用户信息
    event.user = {
      userDetails: adminStore.userDetails
    }
    return event
  },
})
