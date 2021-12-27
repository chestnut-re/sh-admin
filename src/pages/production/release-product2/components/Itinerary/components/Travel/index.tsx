import { Divider } from 'antd'
import React from 'react'
import './index.less'

interface Props{
  data: any
}

/**
 * 行程
 */
const Travel: React.FC<Props> = ({data}) => {
  return (
    <div className="Travel__root">
      {JSON.stringify(data)}
      {/* <div key={`item${index}`} className="item">
        <Divider orientation="left">{item['title']}</Divider>

        {item['data'].map(
          (items, j) =>
            modalType['type'] == 'addAData' && (
              <Row key={`j${j}`} gutter={16}>
                <Col className="gutter-row" span={3}>
                  <div style={style}>
                    <span className="must">*</span>
                    <DatePicker />
                  </div>
                </Col>
                <Col className="gutter-row" span={6}>
                  <div style={style}>{itineraryData['travelTitle']}</div>
                </Col>
                <Col className="gutter-row" span={2}>
                  <div style={style}>
                    <DeleteOutlined style={{ fontSize: 24 }} />
                  </div>
                </Col>
              </Row>
            )
        )}
      </div> */}
    </div>
  )
}

export default Travel
