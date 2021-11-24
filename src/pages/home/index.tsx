import { useStore } from '@/store/context'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import Test from '@/components/Test'
import { Link } from 'react-router-dom'
import './index.less'
import { getMenus } from '@/service/menu'

const HomePage: React.FC = observer(() => {
  const [getResult, setGetResult] = useState('')
  const store = useStore()

  const testGetRequest = async () => {
    const res = await getMenus()
    setGetResult(JSON.stringify(res))
  }

  const changeUserName = () => {
    console.log(store)
    store.userStore.setUserName('asds')
  }

  return (
    <div className="Home">
      <h1 className="title">HomePage</h1>
      <Test />
      <button onClick={testGetRequest}>Test get requestTest</button>
      <p>{getResult}</p>
      <button onClick={changeUserName}>Change User Name</button>
      <p>user name: {JSON.stringify(store.userStore.user)}</p>
      <Link to="/mine">To MinePage</Link>
    </div>
  )
})

export default HomePage
