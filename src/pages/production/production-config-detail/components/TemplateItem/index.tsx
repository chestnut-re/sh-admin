import { useStore } from '@/store/context'
import { Button, Modal } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import update from '@/assets/img/update.png'
import del from '@/assets/img/del.png'
import wring from '@/assets/img/wring.png'
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
  const [showBox, setShowBox] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const mouseOver = () => {
    console.log('划入悬停')
    setShowBox(true)
  }
  const mouseOut = () => {
    console.log('划出')
    setShowBox(false)
  }
  const handleOk = () => {
    setIsModalVisible(false)
    onDel?.(data.key)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const delItem = () => {
    setIsModalVisible(true)
  }
  return (
    <div
      className="TemplateItem__root"
      // onMouseOver={mouseOver}
      // onMouseOut={mouseOut}
    >
      <img className="bg" src={data.templateImgUrl} />
      {!showBox && (
        <div className="btn-div">
          <div className="btn-num">
            <Button
              className="btn"
              onClick={() => {
                onEdit(data.key)
              }}
            >
              <img className="img" src={update} />
            </Button>
            <Button
              className="btn"
              onClick={() => {
                delItem()
              }}
            >
              <img className="img" src={del} />
            </Button>
          </div>
        </div>
      )}
      <div className="bg-name">{data.pageTemplate}</div>
      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div className="wring-modal">
          {/* <img className="img-wring" src={wring} /> */}
          <p className="wring-text">删除内容页？</p>
          <p className="wring-title">将删除该内容页及其已填写信息内容</p>
        </div>
      </Modal>
    </div>
  )
}

export default observer(TemplateItem)
