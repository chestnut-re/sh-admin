import { recordAnnotationApplied } from 'mobx/dist/internal'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './index.less'

/**
 * 审核详情
 */
const ReviewDetails: React.FC = () => {
  const history = useHistory<any>()
  const [data, setData] = useState<any>({})
  useEffect(() => {
    setData(history.location.state.record)
  }, [history.location.state.record])
  useEffect(() => {
    console.log(data)
  }, [data])
  return (
    <div className="review__root">
      <div className="details-header">
        <span className="header-title">审核详情</span>
      </div>
      <div className="content">
        <div className="left">
          <div>
            <span>从属关系</span>
            <span>{data?.channelNm}</span>
          </div>
          <div>
            <span>姓名</span>
            <span>{data?.name}</span>
          </div>
          <div>
            <span>账户</span>
            <span>{data?.account}</span>
          </div>
          <div>
            <span>提现金额</span>
            <span>{data?.amount}</span>
          </div>
          {data?.sts == 1 ? (
            <div>
              <span>审核状态</span>
              <span>待审核</span>
            </div>
          ) : (
            ''
          )}
          {data?.sts == 2 ? (
            <div>
              <span>审核备注</span>
              <span>{data?.remark}</span>
            </div>
          ) : (
            ''
          )}
          {data?.sts == 3 ? (
            <div>
              <span>驳回理由</span>
              <span>{data?.rejectReason}</span>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="right">
          <div>
            <span>审核人</span>
            <span>{data?.auditor}</span>
          </div>
          <div>
            <span>审核时间</span>
            <span>{data?.handleTime}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ReviewDetails
