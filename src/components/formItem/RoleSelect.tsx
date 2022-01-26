/*
 * @LastEditTime: 2022-01-26 15:03:32
 */
import { PersonService } from '@/service/PersonService'
import { useSetState } from 'ahooks'
import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
interface Props {
  value?: string
  channelId?: string
  disabled?:boolean
  onChange?: (value: string) => void
}

/**
 * 角色列表
 */
const RoleSelect: React.FC<Props> = ({ value, onChange, channelId,disabled }) => {
  const [roleNames, setRoleName] = useState<any[]>([])
  // const [defaultValue, setDefaultValue] = useState(undefined)
  useEffect(() => {
  
    PersonService.getRoles({ channelId: channelId,state:0 }).then((res) => {
      // setDefaultValue(value)
      setRoleName(
        res.data.map((item) => {
          return {
            value: String(item.id),
            label: item.roleName,
          }
        })
      )

    })
  }, [channelId])

  return <Select options={roleNames} value={(value)} disabled={disabled} onChange={onChange} />
}

export default RoleSelect
