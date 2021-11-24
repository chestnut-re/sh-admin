import { useStore } from '@/store/context'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Link } from 'react-router-dom'

const MinePage = observer(() => {
  const store = useStore()
  return (
    <>
      <h1 className="title">MinePage</h1>
      <p>user name: {JSON.stringify(store)}</p>
      <Link to="/home">To HomePage</Link>
    </>
  )
})

export default MinePage
