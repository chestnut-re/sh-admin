import dayjs from 'dayjs'
import React from 'react'

interface Props {
  money: string
}

/**
 * 售价列
 */
const NewPrice: React.FC<Props> = ({ money }) => {
  if (!money) {
    return <></>
  }
  return <>{Number(money) / 100}</>
}

export default NewPrice
