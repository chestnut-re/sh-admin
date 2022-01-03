import { Modal, Calendar } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { DatePicker, Space } from 'antd'
import moment from 'moment'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/store/context'
import dayjs from 'dayjs'

const { RangePicker } = DatePicker

interface Props {
  activeKey: string | undefined
  show: boolean
  onClose: () => void
  /**模式：一天，范围 */
  mode: 'single' | 'scope'
}

const dateFormat = 'YYYY/MM/DD'

/**
 * 编辑时间
 */
const DateTimeDialog: FC<Props> = ({ activeKey, show, onClose, mode }) => {
  const { productionStore } = useStore()

  const [dateTime, setDateTime] = useState<any>()

  const _handleUpdate = () => {
    if (!dateTime) {
      return
    }
    productionStore.setGoodsPricesTime(activeKey, dateTime)
    onClose()
  }

  useEffect(() => {
    const value = productionStore.data.goodsPrices.find((i) => i.key === activeKey)
    if (!value) return

    if (mode === 'single') {
      setDateTime(value?.startDate)
    } else {
      setDateTime([value?.startDate, value?.endDate])
    }
  }, [activeKey, mode])

  const _onSingleChange = (value) => {
    console.log(value)
    setDateTime(value.valueOf())
  }

  const _onScopeChange = (value) => {
    console.log(value)
    setDateTime([value[0].valueOf(), value[1].valueOf()])
  }

  return (
    <Modal title="设置时间" visible={show} onOk={_handleUpdate} onCancel={onClose} maskClosable={false}>
      {mode === 'single' && <DatePicker value={moment(dateTime)} format={dateFormat} onChange={_onSingleChange} />}
      {mode === 'scope' && (
        <RangePicker value={[moment(dateTime[0]), moment(dateTime[1])]} format={dateFormat} onChange={_onScopeChange} />
      )}
    </Modal>
  )
}

export default observer(DateTimeDialog)
