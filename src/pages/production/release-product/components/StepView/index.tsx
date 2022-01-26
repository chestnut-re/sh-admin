import { CheckOutlined } from '@ant-design/icons'
import { Steps } from 'antd'
import React from 'react'
import { getStepsInfo } from '../../utils'
import './index.less'

interface Props {
  current: number
}

/**商品 Step */
const StepView: React.FC<Props> = ({ current }) => {
  const steps = getStepsInfo()
  const { Step } = Steps

  return (
    <>
      {/* <div className="StepView_root">
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
      </div> */}
      <div className="StepView_root">
        <Steps current={current} style={{ width: '50%', margin: '20px auto' }}>
          <Step title="基础信息" />
          <Step title="行程信息" />
        </Steps>
      </div>
    </>
  )
}

export default StepView
