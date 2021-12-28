import React, { useEffect } from 'react'
import './OrderInfor.less'
/**
 * 详情信息
 */

interface Props {
  data: any
}
const OrderInfor: React.FC<Props> = ({ data }) => {
  return (
    <div className="infor__root">
      <div className="infor-title">
        <img src="" alt="" />
        <span>三亚5日自由行(5钻)·直减300『高星4晚连住』</span>
      </div>
      <div className="infor infor-spe">
        <div>始发地</div>
        <div>青岛</div>
      </div>
      <div className="infor">
        <div>成人价</div>
        <div>¥1750</div>
      </div>
      <div className="infor">
        <div>儿童价</div>
        <div>¥878</div>
      </div>
      <div className="infor">
        <div>下单数量</div>
        <div>
          <span>5</span>
          <span>成人×4 儿童×1</span>
        </div>
      </div>
      <div className="infor">
        <div>代币最多可抵</div>
        <div>¥800</div>
      </div>
    </div>
  )
}
export default OrderInfor
