import React from 'react'
import './OrderStates.less'
/**
 * 订单状态
 */
const OrderStates: React.FC = () => {
  return (
    <div className="states__root">
      <span className="order-sta">订单状态</span>
      <span className="order-state">待核销</span>
      <div className="order-time">
        剩<span></span>
      </div>
      <span className="order-fx">分销</span>
      <div className="states-order">
        <div>1100 8379 8897 0000 032</div>
        <div>订单编号</div>
      </div>
      <div className="states-order1">
        <div>2021-10-21 18:09:23</div>
        <div>下单时间</div>
      </div>
      <div className="states-order2">
        <div>2021-10-21 18:14:43</div>
        <div>付款时间</div>
      </div>
      <div className="states-order3">
        <div>APP 浏览</div>
        <div>下单途径</div>
      </div>
    </div>
  )
}
export default OrderStates
