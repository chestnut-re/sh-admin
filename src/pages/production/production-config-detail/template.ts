/**
 * 模版数据
 */

export type TemplateType = 'face' | 'center' | 'end'

/**
 * 封面模版
 */
export const faceTemplate = [
  {
    key: 'face0',
    name: '封面0',
    templateImgUrl:
      'https://h5-cdn.mountainseas.cn/img/%E4%B8%89%E4%BA%9A%E4%BA%94%E6%97%A5%E8%87%AA%E7%94%B1%E8%A1%8C%E5%B0%81%E9%9D%A21-35ee.png', // 模版展示图
  },
  {
    key: 'face1',
    name: '封面1',
    templateImgUrl: '', // 模版展示图
  },
]

/**
 * 中间
 */
export const centerTemplate = [
  {
    key: 'center0',
    name: '中间0',
    templateImgUrl: '', // 模版展示图
  },
  {
    key: 'center1',
    name: '中间1',
    templateImgUrl: '', // 模版展示图
  },
  {
    key: 'center2',
    name: '中间2',
    templateImgUrl: '', // 模版展示图
  },
  {
    key: 'center3',
    name: '中间3',
    templateImgUrl: '', // 模版展示图
  },
  {
    key: 'center4',
    name: '中间4',
    templateImgUrl: '', // 模版展示图
  },
  {
    key: 'center5',
    name: '中间5',
    templateImgUrl: '', // 模版展示图
  },
  {
    key: 'center6',
    name: '中间6',
    templateImgUrl: '', // 模版展示图
  },
  {
    key: 'center7',
    name: '中间7',
    templateImgUrl: '', // 模版展示图
  },
]

/**
 * 封底模版
 */
export const endTemplate = [
  {
    key: 'end0',
    name: '封底0',
    templateImgUrl: '', // 模版展示图
  },
  {
    key: 'end1',
    name: '封底1',
    templateImgUrl: '', // 模版展示图
  },
]

export const templateMap = {
  face: faceTemplate,
  center: centerTemplate,
  end: endTemplate,
}

/**
 * 根据 key 获取模版
 */
export const getTemplate = (key) => {
  let t: any = null
  if (faceTemplate.find((i) => i.key === key)) {
    t = faceTemplate.find((i) => i.key === key)
    return t
  }
  if (centerTemplate.find((i) => i.key === key)) {
    t = centerTemplate.find((i) => i.key === key)
    return t
  }
  if (endTemplate.find((i) => i.key === key)) {
    t = endTemplate.find((i) => i.key === key)
    return t
  }
}
