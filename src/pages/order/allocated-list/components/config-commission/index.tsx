import React, { useState, useEffect } from 'react'
import './index.less'
/**
 * 配置分佣
 */
const ConfigCommission: React.FC = () => {
  return (
    <div className="config__root">
      <div className="middle">
        <div className="top">
          <span className="topOne">可配置分佣</span>
          <span>￥2000</span>
          <span className="topOne">剩余可配置</span>
          <span>￥10</span>
        </div>
        <div className="mid">
          {/* <div className="midLeft">
            <p style={{ textAlign: 'center' }}>关系归属渠道</p>
            <div className="guanxi">
              <span>上上上级姓名</span>
              <input className="bDer"></input>
              <span>%</span>
              <span style={{ marginLeft: '10px' }}>￥0</span>
            </div>
            <div className="ssji">
              <span>上上级姓名</span>
              <input className="bDer" style={{ marginLeft: '16px' }}></input>
              <span>%</span>
              <span style={{ marginLeft: '10px' }}>￥0</span>
            </div>
            <div className="ssji">
              <span>上级姓名</span>
              <input className="bDer" style={{ marginLeft: '32px' }}></input>
              <span>%</span>
              <span style={{ marginLeft: '10px' }}>￥0</span>
            </div>
            <div className="ssji">
              <span style={{ backgroundColor: 'darkgrey', borderRadius: '15px' }}>买家从属归属</span>
              <span>人员姓名</span>
              <input className="bDer" style={{ marginLeft: '32px' }}></input>
              <span>%</span>
              <span style={{ marginLeft: '10px' }}>￥0</span>
            </div>
          </div> */}
          <div className="midMid">
            <p style={{ textAlign: 'center' }}>推荐渠道</p>
            <div className="guanxi">
              <span>分中心名称</span>
              <input className="bDer"></input>
              <span>%</span>
              <span style={{ marginLeft: '10px' }}>￥0</span>
            </div>
            <div className="guanxi">
              <span>类一角色名称</span>
              <input className="bDer"></input>
              <span>%</span>
              <span style={{ marginLeft: '10px' }}>￥0</span>
            </div>
            <div className="guanxi">
              <span>类二角色名称</span>
              <input className="bDer"></input>
              <span>%</span>
              <span style={{ marginLeft: '10px' }}>￥0</span>
            </div>
            <div className="guanxi">
              <span style={{ backgroundColor: 'darkgrey', borderRadius: '15px' }}>推荐人 有返利</span>
              <span>用户</span>
              <input className="bDer"></input>
              <span>%</span>
              <span style={{ marginLeft: '10px' }}>￥0</span>
            </div>
          </div>
          <div className="midRight">
            <p style={{ textAlign: 'center' }}>服务渠道</p>
            <div className="guanxi">
              <span style={{ backgroundColor: 'darkgrey', borderRadius: '15px' }}>&nbsp;&nbsp;&nbsp;团奖金8%</span>
              <span>分中心名称</span>
              <input className="bDer"></input>
              <span>%</span>
              <span style={{ marginLeft: '10px' }}>￥0</span>
              <span>发团服务费</span>
              <input className="bDer"></input>
              <span>%</span>
              <span style={{ marginLeft: '10px' }}>￥0</span>
            </div>
            <div className="guanxi" style={{ marginLeft: '62px' }}>
              <span>类一角色名称</span>
              <input className="bDer"></input>
              <span>%</span>
              <span style={{ marginLeft: '10px' }}>￥0</span>
              <span>发团服务费</span>
              <input className="bDer"></input>
              <span>%</span>
              <span style={{ marginLeft: '10px' }}>￥0</span>
            </div>
            <div className="guanxi" style={{ marginLeft: '62px' }}>
              <span>类二角色名称</span>
              <input className="bDer"></input>
              <span>%</span>
              <span style={{ marginLeft: '10px' }}>￥0</span>
              <span>发团服务费</span>
              <input className="bDer"></input>
              <span>%</span>
              <span style={{ marginLeft: '10px' }}>￥0</span>
            </div>
            <div className="guanxi">
              <span style={{ backgroundColor: 'darkgrey', borderRadius: '15px' }}>&nbsp; &nbsp;接单人 </span>
              <span>类三角色名称</span>
              <input className="bDer"></input>
              <span>%</span>
              <span style={{ marginLeft: '10px' }}>￥0</span>
              <span>发团服务费</span>
              <input className="bDer"></input>
              <span>%</span>
              <span style={{ marginLeft: '10px' }}>￥0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ConfigCommission
