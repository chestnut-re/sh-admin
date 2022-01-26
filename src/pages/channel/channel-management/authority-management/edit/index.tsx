/*
 * @Description: 佣金权限编辑
 * @LastEditTime: 2022-01-26 18:37:56
 */
import React, { useEffect, useState, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import './index.less'
import { Steps } from 'antd'
import CommissionAuthority from '../components/CommissionAuthority'

/**
 * 商品管理-发布商品
 */
const ManageEditPage: React.FC = () => {
  const { Step } = Steps
  const [current, setCurrent] = useState(0)
  useEffect(() => {}, [])

  return (
    <div className="ManageEdit__root">
      <Steps current={current} style={{ width: '50%', margin: '20px auto' }}>
        <Step title="功能权限" />
        <Step title="佣金权限" />
      </Steps>

      <div className="steps-content">

      {current == 0 ? (
            <>
              {/* <Menu
                onClick={(e) => setSwitchFunc(e.key)}
                className="mb20"
                selectedKeys={[switchFunc]}
                mode="horizontal"
              >
                <Menu.Item key="admin">管理后台权限</Menu.Item>
                <Menu.Item key="toB">B端权限</Menu.Item>
              </Menu>
              <TableScheme channelDetail={channelDetail} goSuccess={getDetail} chanId={channelId} switchFc={switchFunc} /> */}
            </>
          ) : (
            <>
              <CommissionAuthority
                channelDetail={channelDetail}
                chanId={channelId}
                ranked={ranked}
                structure={structure}
              />
            </>
          )}
          
        <div className="btnView">
          <div className="item">
            {current > 0 && (
              <div onClick={() => {}} className="nextBtn prev">
                上一步
              </div>
            )}
            <div onClick={() => {}} className="nextBtn">
              {current === 1 ? '提交至待发布' : '下一步'}
            </div>
          </div>

          <div onClick={() => {}} className="draftBtn">
            保存至草稿箱
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(ManageEditPage)
