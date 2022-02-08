import { CheckOutlined } from '@ant-design/icons'
import React from 'react'
import { Steps } from 'antd'
import './index.less'

interface Props {
  current: number
}

/** Step */
const StepView: React.FC<Props> = ({ current }) => {
  const { Step } = Steps

  return (
    <>
      <div className="StepView_root">
        <Steps current={current} style={{ width: '50%', margin: '20px auto' }}>
          <Step title="选择服务方" />
          <Step title="配置分佣" />
        </Steps>
      </div>
    </>
  )
}

export default StepView
