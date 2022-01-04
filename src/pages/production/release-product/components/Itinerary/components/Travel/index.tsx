import { useStore } from '@/store/context'
import { Button, Col, Input, Row, TimePicker } from 'antd'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import React from 'react'
import TravelType from '../TravelType'
import './index.less'

interface Props {
  data: any[]
  activeKey: string | undefined
}

/**
 * 行程s
 */
const Travel: React.FC<Props> = ({ activeKey, data }) => {
  const { productionStore } = useStore()
  return (
    <div className="Travel__root">
      {data &&
        data.map((item) => {
          return (
            <div key={item.key}>
              <h4>{item.whatDay}</h4>
              {item.travelDetails &&
                item.travelDetails.map((travelDetail) => {
                  return (
                    <Row key={travelDetail.key}>
                      <Col>
                        <TimePicker
                          value={moment(travelDetail.travelTime || '12:00', 'HH:mm')}
                          format={'HH:mm'}
                          onChange={(value, dateString: string) => {
                            travelDetail.travelTime = dateString
                          }}
                        />
                      </Col>
                      <Col>
                        <Input
                          value={travelDetail.travelTitle}
                          onChange={(e) => {
                            travelDetail.travelTitle = e.target.value
                          }}
                        />
                      </Col>
                      <Col>
                        <TravelType data={travelDetail} />
                      </Col>
                      <Col>
                        <Button
                          danger
                          onClick={() => {
                            productionStore.delTravelDetail(activeKey, item.key, travelDetail.key)
                          }}
                        >
                          删除
                        </Button>
                      </Col>
                    </Row>
                  )
                })}
            </div>
          )
        })}
    </div>
  )
}

export default observer(Travel)
