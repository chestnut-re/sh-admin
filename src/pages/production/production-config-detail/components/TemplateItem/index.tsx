import { useStore } from '@/store/context'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import './index.less'

interface Props {
  data: any
  onDel?: (key: string) => void
  onEdit: (key: string) => void
}

/**
 * 模版
 */
const TemplateItem: React.FC<Props> = ({ data, onDel, onEdit }) => {
  return (
    <div className="TemplateItem__root">
      <p>{JSON.stringify(data)}</p>

      <Button
        onClick={() => {
          onEdit(data.key)
        }}
      >
        编辑
      </Button>
      <Button
        onClick={() => {
          onDel?.(data.key)
        }}
      >
        删除
      </Button>
    </div>
  )
}

export default observer(TemplateItem)
