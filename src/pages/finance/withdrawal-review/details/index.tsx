import { recordAnnotationApplied } from 'mobx/dist/internal'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.less'
import useQuery from '@/hooks/useQuery'

/**
 * 审核详情
 */
const ReviewDetails: React.FC = () => {
  const query = useQuery()
  return (
    <div className="review__root">
      <div className="details-header">
        <span className="header-title">审核详情</span>
      </div>
      <div className="content">
        <div className="left">
          <div>
            <span>从属关系</span>
            <span>{query.get('channelNm') ?? ''}</span>
          </div>
          <div>
            <span>姓名</span>
            <span>{query.get('name') ?? ''}</span>
          </div>
          <div>
            <span>账户</span>
            <span>{query.get('account') ?? ''}</span>
          </div>
          <div>
            <span>提现金额</span>
            <span>{(parseInt(query.get('amount')) / 1000).toFixed(2)}</span>
          </div>
          {query.get('sts') == '1' ? (
            <div>
              <span>审核状态</span>
              <span>待审核</span>
            </div>
          ) : (
            ''
          )}
          {query.get('sts') == '2' ? (
            <div>
              <span>审核备注</span>
              <span>{query.get('remark') ?? ''}</span>
            </div>
          ) : (
            ''
          )}
          {query.get('sts') == '3' ? (
            <div>
              <span>驳回理由</span>
              <span>{query.get('rejectReason') ?? ''}</span>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="right">
          <div>
            <span>审核人</span>
            <span>{query.get('auditor') ?? ''}</span>
          </div>
          <div>
            <span>审核时间</span>
            <span>{query.get('handleTime') ?? ''}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ReviewDetails
