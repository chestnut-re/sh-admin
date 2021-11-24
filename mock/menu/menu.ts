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
              componentPath: '/table',
              path: '/table',
            },
            {
              name: '用户中心',
              id: 3,
              componentPath: '/table',
              path: '/table1',
            },
            {
              name: '系统中心',
              id: 4,
              path: '/system',
              children: [
                {
                  name: '用户列表',
                  id: 41,
                  componentPath: '/system/user',
                  path: '/system/user',
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
