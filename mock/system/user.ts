import Mock from 'mockjs'

export default [
  {
    url: RegExp('/api/userList.*'),
    type: 'get',
    response: (config) => {
      return {
        code: 200,
        data: {
          list: [
            {
              id: '1',
              account: 'id1',
              name: '周杰伦',
            },
            {
              id: '2',
              account: 'id2',
              name: '刘德华',
            },
          ],
        },
      }
    },
  },
]
