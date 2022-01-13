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
    templateImgUrl:
      'https://h5-cdn.mountainseas.cn/img/%E4%BB%99%E6%9C%AC%E9%82%A38%E5%A4%A97%E5%A4%9C%E8%B7%9F%E5%9B%A2%E6%B8%B8%E5%B0%81%E9%9D%A2-ae10.png', // 模版展示图
  },
]

/**
 * 中间
 */
export const centerTemplate = [
  {
    key: 'center0',
    name: '中间0',
    templateImgUrl:
      'https://h5-cdn.mountainseas.cn/img/%E4%B8%89%E4%BA%9A%E4%BA%94%E6%97%A5%E8%87%AA%E7%94%B1%E8%A1%8C%E5%86%85%E5%AE%B9%E9%A1%B51-1052e.png', // 模版展示图
  },
  {
    key: 'center1',
    name: '中间1',
    templateImgUrl:
      'https://h5-cdn.mountainseas.cn/img/%E4%B8%89%E4%BA%9A%E4%BA%94%E6%97%A5%E8%87%AA%E7%94%B1%E8%A1%8C%E5%86%85%E5%AE%B9%E9%A1%B52-4ffa.png', // 模版展示图
  },
  {
    key: 'center2',
    name: '中间2',
    templateImgUrl:
      'https://h5-cdn.mountainseas.cn/img/%E4%B8%89%E4%BA%9A%E4%BA%94%E6%97%A5%E8%87%AA%E7%94%B1%E8%A1%8C%E5%86%85%E5%AE%B9%E9%A1%B53-2619.png', // 模版展示图
  },
  {
    key: 'center3',
    name: '中间3',
    templateImgUrl:
      'https://h5-cdn.mountainseas.cn/img/%E4%B8%89%E4%BA%9A%E4%BA%94%E6%97%A5%E8%87%AA%E7%94%B1%E8%A1%8C%E5%86%85%E5%AE%B9%E9%A1%B54-ddcb.png', // 模版展示图
  },
  {
    key: 'center4',
    name: '中间4',
    templateImgUrl:
      'https://h5-cdn.mountainseas.cn/img/%E4%BB%99%E6%9C%AC%E9%82%A38%E5%A4%A97%E5%A4%9C%E8%B7%9F%E5%9B%A2%E6%B8%B8%E5%86%85%E5%AE%B91-108a.png', // 模版展示图
  },
  {
    key: 'center5',
    name: '中间5',
    templateImgUrl:
      'https://h5-cdn.mountainseas.cn/img/%E4%BB%99%E6%9C%AC%E9%82%A38%E5%A4%A97%E5%A4%9C%E8%B7%9F%E5%9B%A2%E6%B8%B8%E5%86%85%E5%AE%B92-3d61.png', // 模版展示图
  },
  {
    key: 'center6',
    name: '中间6',
    templateImgUrl:
      'https://h5-cdn.mountainseas.cn/img/%E4%BB%99%E6%9C%AC%E9%82%A38%E5%A4%A97%E5%A4%9C%E8%B7%9F%E5%9B%A2%E6%B8%B8%E5%86%85%E5%AE%B93-ea67.png', // 模版展示图
  },
  {
    key: 'center7',
    name: '中间7',
    templateImgUrl:
      'https://h5-cdn.mountainseas.cn/img/%E4%BB%99%E6%9C%AC%E9%82%A38%E5%A4%A97%E5%A4%9C%E8%B7%9F%E5%9B%A2%E6%B8%B8%E5%86%85%E5%AE%B94-ea37.png', // 模版展示图
  },
]

/**
 * 封底模版
 */
export const endTemplate = [
  {
    key: 'end0',
    name: '封底0',
    templateImgUrl:
      'https://h5-cdn.mountainseas.cn/img/%E4%B8%89%E4%BA%9A%E4%BA%94%E6%97%A5%E8%87%AA%E7%94%B1%E8%A1%8C%E5%86%85%E5%AE%B9%E9%A1%B5%E5%B0%BE%E9%A1%B5-ae2e.png', // 模版展示图
  },
  {
    key: 'end1',
    name: '封底1',
    templateImgUrl:
      'https://h5-cdn.mountainseas.cn/img/%E4%BB%99%E6%9C%AC%E9%82%A38%E5%A4%A97%E5%A4%9C%E8%B7%9F%E5%9B%A2%E6%B8%B8%E5%B0%81%E5%BA%95-17ae.png', // 模版展示图
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
