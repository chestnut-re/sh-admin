import { CheckOutlined } from '@ant-design/icons'
import React from 'react'
import './index.less'

interface Props {
  current: number
}

/**商品 Step */
const StepView: React.FC<Props> = ({ current }) => {
  const steps = [
    {
      title: '选择服务方',
      index: 0,
    },
    {
      title: '配置分佣',
      index: 1,
    },
  ]

  return (
    <div className="StepView_root">
      {steps.map((item) =>
        item.index < current ? (
          <div key={`index${item.index}`} className="item item-selected">
            <CheckOutlined style={{ color: '#fff', fontSize: 24 }} />
          </div>
        ) : (
          <div key={`index${item.index}`} className={item.index == current ? 'item item-selected' : 'item'}>
            {`${item.index + 1}. ${item.title}`}
          </div>
        )
      )}
      <div className="line" />
    </div>
  )
}

export default StepView
