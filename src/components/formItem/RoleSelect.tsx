/*
 * @LastEditTime: 2021-12-29 19:03:07
 */
import { PersonService } from '@/service/PersonService'
import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
interface Props {
  value?: string
  channelId?: string
  onChange?: (value: string) => void
}

/**
 * 角色列表
 */
const RoleSelect: React.FC<Props> = ({ value, onChange, channelId }) => {
  const [roleNames, setRoleName] = useState<any[]>([])
  useEffect(() => {
    console.log(',channelId')
    PersonService.getRoles({ channelId: channelId }).then((res) => {
      setRoleName(
        res.data.map((item) => {
          return {
            value: item.id,
            label: item.roleName,
          }
        })
      )
    })
  }, [channelId])

  return <Select options={roleNames} value={value} onChange={onChange} />
}

export default RoleSelect
