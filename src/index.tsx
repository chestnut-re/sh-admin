import React, { Suspense, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'normalize.css'
import './assets/css/base.css'
import './assets/css/admin.less'
import { adminStore, Provider } from '@/store/context'
// import adminStore from '@/store/adminStore'
import AdminLayout from '@/components/layout'
import LoginPage from './pages/login'
import './plugin/sentry'

import '../mock'

const env = process.env.NODE_ENV
console.log('process.env.NODE_ENV', env)

console.log('process.env.APP_ENV', process.env.APP_ENV)
console.log('process.env.GIT_TAG', process.env.GIT_TAG)


const App = () => {
  useEffect(() => {
    adminStore.init()
  }, [])

  return (
    <Provider>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Routes>
            <Route path="/login"  element={<LoginPage/>}></Route>
            <Route path="/*"  element={<AdminLayout/>}></Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
