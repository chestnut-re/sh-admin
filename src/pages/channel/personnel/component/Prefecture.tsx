import { Cascader } from 'antd'
import React from 'react'
/**
 * 责任区域
 */
const Prefecture: React.FC = () => {
  const options = [
    {
      label: 'Light',
      value: 'light',
      children: new Array(20).fill(null).map((_, index) => ({ label: `Number ${index}`, value: index })),
    },
    {
      label: 'Bamboo',
      value: 'bamboo',
      children: [
        {
          label: 'Little',
          value: 'little',
          children: [
            {
              label: 'Toy Fish',
              value: 'fish',
            },
            {
              label: 'Toy Cards',
              value: 'cards',
            },
            {
              label: 'Toy Bird',
              value: 'bird',
            },
          ],
        },
      ],
    },
  ]

  function onChange(value) {
    console.log(value)
  }
  return (
    <div>
      <Cascader style={{ width: 433 }} options={options} onChange={onChange} multiple maxTagCount="responsive" />
    </div>
  )
}
export default Prefecture
