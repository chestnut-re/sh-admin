import Mock from 'mockjs'

export default [
  {
    url: '/menu/list',
    type: 'get',
    response: (config) => {
      return {
        code: '200',
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
                    {
                      name: '发布商品',
                      id: 112,
                      componentPath: '/operation/production/release-product',
                      path: '/operation/production/release-product',
                    },
                    {
                      name: '商品审核',
                      id: 113,
                      componentPath: '/operation/production/commodity-audit',
                      path: '/operation/production/commodity-audit',
                    },
                  ],
                },
              ],
            },
            {
              name: 'App营销',
              id: 7,
              componentPath: 'market',
              path: '/app-market',
              children: [
                {
                  name: '轮播图管理',
                  id: 71,
                  componentPath: '/app-market/banner',
                  path: '/app-market/banner',
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
                      path: '/market/channel-management/channel-list',
                    },
                    {
                      name: '创建渠道',
                      id: 212,
                      componentPath: '/market/channel-management/create-channel',
                      path: '/market/channel-management/create-channel',
                    },
                    {
                      name: '分佣方案',
                      id: 213,
                      componentPath: '/market/channel-management/commission-scheme',
                      path: '/market/channel-management/commission-scheme',
                    },
                  ],
                },
              ],
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
              componentPath: 'system',
              path: '/system',
              children: [
                {
                  name: '权限管理',
                  id: 61,
                  componentPath: '/system/authority',
                  path: '/system/authority',
                  children: [
                    {
                      name: '用户管理',
                      id: 611,
                      componentPath: '/system/authority/user',
                      path: '/system/authority/user',
                    },
                    {
                      name: '菜单管理',
                      id: 612,
                      componentPath: '/system/authority/menu',
                      path: '/system/authority/menu',
                    },
                    {
                      name: '角色管理',
                      id: 613,
                      componentPath: '/system/authority/role',
                      path: '/system/authority/role',
                    },
                  ],
                },
                {
                  name: '意见反馈',
                  id: 62,
                  componentPath: '/system/opinion',
                  path: '/system/opinion',
                },
                {
                  name: '版本管理',
                  id: 63,
                  componentPath: '/system/version',
                  path: '/system/version',
                  children: [
                    {
                      name: 'B端版本管理',
                      id: 631,
                      componentPath: '/system/version/version-b',
                      path: '/system/version/user',
                    },
                    {
                      name: 'C端版本管理',
                      id: 632,
                      componentPath: '/system/version/version-c',
                      path: '/system/version/menu',
                    },
                    {
                      name: '支付配置',
                      id: 633,
                      componentPath: '/system/version/pay',
                      path: '/system/version/pay',
                      children: [
                        {
                          name: '支付模块',
                          id: 6331,
                          componentPath: '/system/version/pay/payment',
                          path: '/system/version/pay/payment',
                        },
                        {
                          name: '支付宝',
                          id: 6332,
                          componentPath: '/system/version/pay/aLiPay',
                          path: '/system/version/pay/aLiPay',
                        },
                        {
                          name: '微信',
                          id: 6333,
                          componentPath: '/system/version/pay/weChat',
                          path: '/system/version/pay/weChat',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            // {
            //   name: '系统中心',
            //   id: 6,
            //   componentPath: 'system',
            //   path: '/system',
            //   children: [
            //     {
            //       name: '用户列表',
            //       id: 61,
            //       componentPath: '/system/user',
            //       path: '/system/user',
            //     },
            //     {
            //       name: '支付配置',
            //       id: 62,
            //       componentPath: '/system/payment',
            //       path: '/system/payment',
            //     },
            //   ],
            // },
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
