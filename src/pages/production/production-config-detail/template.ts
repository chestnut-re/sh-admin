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
    templateImgUrl: '',
  },
]

/**
 * 中间
 */
export const centerTemplate = [
  {
    key: 'center0',
    name: '中间0',
    templateImgUrl: '',
  },
]

/**
 * 封底模版
 */
export const endTemplate = [
  {
    key: 'end0',
    name: '封底0',
    templateImgUrl: '',
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
