import Mock from 'mockjs'

export default [
  {
    url: '/menu/list',
    type: 'get',
    response: (config) => {
      return {
        code: 200,
        data: {
          menus: [
            {
              name: '运营中心',
              id: 1,
              componentPath: 'operation',
              path: '/operation',
              children: [
                {
                  name: '商品管理',
                  id: 11,
                  componentPath: '/operation',
                  path: '/production',
                  children: [
                    {
                      name: '商品列表',
                      id: 111,
                      componentPath: '/operation/production/production-list',
                      path: '/operation/production/production-list',
                    },
                  ],
                },
              ],
            },
            {
              name: '营销中心',
              id: 2,
              componentPath: 'market',
              path: '/market',
              children: [
                {
                  name: '渠道管理',
                  id: 21,
                  componentPath: '/market',
                  path: '/channel-management',
                  children: [
                    {
                      name: '渠道列表',
                      id: 211,
                      componentPath: '/market/channel-management/channel-list',
                      path: '/market/channel-management/channel-list'
                    },
                    {
                      name: '创建渠道',
                      id: 212,
                      componentPath: '/market/channel-management/create-channel',
                      path: '/market/channel-management/create-channel'
                    }
                  ]
                }
              ]
            },
            {
              name: '财务中心',
              id: 3,
              componentPath: '/finance',
              path: '/finance',
            },
            {
              name: '用户中心',
              id: 4,
              componentPath: '/user',
              path: '/user',
            },
            {
              name: '行程中心',
              id: 5,
              componentPath: '/route',
              path: '/route',
            },
            {
              name: '系统中心',
              id: 6,
              path: '/system',
              children: [
                {
                  name: '用户列表',
                  id: 61,
                  componentPath: '/system/user',
                  path: '/system/user',
                },
                {
                  name: '支付配置',
                  id: 62,
                  componentPath: '/system/payment',
                  path: '/system/payment',
                },
              ],
            },
            // {
            //   name: '用户中心',
            //   id: 3,
            // },
          ],
        },
      }
    },
  },
]
