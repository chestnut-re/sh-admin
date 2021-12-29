import { PersonService } from '@/service/PersonService'
import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
interface Props {
  value?: string
  onChange?: (value: string) => void
}

/**
 * 角色列表
 */
const RoleSelect: React.FC<Props> = ({value, onChange}) => {
  const [roleNames, setRoleName] = useState<any[]>([])
  useEffect(() => {
    PersonService.getRoles().then((res) => {
      setRoleName(
        res.data.map((item) => {
          return {
            value: item.id,
            label: item.roleName,
          }
        })
      )
    })
  }, [])

  return <Select options={roleNames} value={value} onChange={onChange}/>
}

export default RoleSelect
