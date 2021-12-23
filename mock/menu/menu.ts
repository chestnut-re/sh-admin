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
                    {
                      name: '商品配置',
                      id: 114,
                      componentPath: '/operation/production/commodity-allocation',
                      path: '/operation/production/commodity-allocation',
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
                  name: 'App营销',
                  id: 21,
                  componentPath: 'market',
                  path: '/app-market',
                  children: [
                    {
                      name: '轮播图管理',
                      id: 211,
                      componentPath: '/market/app-market/banner',
                      path: '/market/app-market/banner',
                    },
                    {
                      name: '活动管理',
                      id: 212,
                      componentPath: '/market/app-market/activities',
                      path: '/market/app-market/activities',
                    },
                  ],
                },
              ],
            },
            {
              name: '渠道管理',
              id: 3,
              componentPath: 'channel',
              path: '/channel',
              children: [
                {
                  name: '渠道库',
                  id: 31,
                  componentPath: '/channel',
                  path: '/channel-management',
                  children: [
                    {
                      name: '渠道列表',
                      id: 311,
                      componentPath: '/channel/channel-management/channel-list',
                      path: '/channel/channel-management/channel-list',
                    },
                    // {
                    //   name: '创建渠道',
                    //   id: 312,
                    //   hidden:true,
                    //   componentPath: '/channel/channel-management/create-channel',
                    //   path: '/channel/channel-management/create-channel',
                    // },
                    {
                      name: '渠道权限',
                      id: 312,
                      componentPath: '/channel/channel-management/authority-management',
                      path: '/channel/channel-management/authority-management',
                    },
                    {
                      name: '渠道分佣方案',
                      id: 313,
                      componentPath: '/channel/channel-management/commission-scheme',
                      path: '/channel/channel-management/commission-scheme',
                    },
                  ],
                },
                {
                  name: '人员管理',
                  id: 314,
                  componentPath: '/channel/personnel',
                  path: '/channel/personnel',
                },
              ],
            },
            {
              name: '财务中心',
              id: 4,
              componentPath: '/finance',
              path: '/finance',
              children: [
                {
                  name: '销售业绩',
                  id: 41,
                  componentPath: '/finance/sales-performance',
                  path: '/finance/sales-performance',
                },
              ],
            },
            {
              name: '用户中心',
              id: 5,
              componentPath: '/user',
              path: '/user',
            },
            {
              name: '订单中心',
              id: 7,
              componentPath: '/order',
              path: '/order',
              children: [
                {
                  name: '订单列表',
                  id: 71,
                  componentPath: '/order/order-list',
                  path: '/order/order-list',
                },
              ],
            },
            {
              name: '行程中心',
              id: 8,
              componentPath: '/route',
              path: '/route',
            },
            {
              name: '基础信息管理',
              id: 9,
              componentPath: 'basic',
              path: '/basic',
              children: [
                {
                  name: '意见反馈',
                  id: 91,
                  componentPath: '/basic/opinion',
                  path: '/basic/opinion',
                },
                {
                  name: '角色权限',
                  id: 92,
                  componentPath: '/basic/role-based',
                  path: '/basic/role-based ',
                },
                {
                  name: '管理员账户',
                  id: 93,
                  componentPath: '/basic/administrator',
                  path: '/basic/administrator',
                },
              ],
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
                {
                  name: '管理员账号',
                  id: 64,
                  componentPath: '/system/admin',
                  path: '/system/admin',
                },
                {
                  name: '支付配置',
                  id: 65,
                  componentPath: '/system/payment-configuration',
                  path: '/system/payment-configuration',
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
