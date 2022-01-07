/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Description:
 * @LastEditTime: 2022-01-07 11:21:07
 */

import React, { FC, useEffect, useState } from 'react'
import E from 'wangeditor'
interface Props {
  onChange: (e: any) => void
  value?: any
}
const Edit: FC<Props> = ({ onChange, value }) => {
  const [isEditor, setIsEditor] = useState(false)
  let editor

  useEffect(() => {
    editor = new E('#div1')
    editor.config.onchange = (newHtml) => {
      onChange(newHtml)
    }
    editor.config.menus = [
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      'table', // 表格
      'code', // 插入代码
      'undo', // 撤销
      'redo', // 重复
    ]
    editor.config.lang = {
      设置标题: 'Title',
      字号: 'Size',
      文字颜色: 'Color',
      设置列表: 'List',
      有序列表: '',
      无序列表: '',
      对齐方式: 'Align',
      靠左: '',
      居中: '',
      靠右: '',
      正文: 'p',
      链接文字: 'link text',
      链接: 'link',
      上传图片: 'Upload',
      网络图片: 'Web',
      图片link: 'image url',
      插入视频: 'Video',
      格式如: 'format',
      上传: 'Upload',
      创建: 'init',
    }
    editor.create()
    setIsEditor(true)
    return () => {
      setIsEditor(false)
      editor.destroy()
    }
  }, [value])
  useEffect(() => {
    if (editor) {
      editor.txt.html(value)
    }
  }, [value, isEditor])

  return (
    <div>
      <div id="div1"></div>
    </div>
  )
}
export default Edit
