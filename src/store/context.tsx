import React from 'react'
import { useLocalStore } from 'mobx-react-lite'
import { createUserStore } from './userStore'
import { createAdminStore } from './adminStore'
// import adminStore from './adminStore'

const StoreContext = React.createContext(null)

export let adminStore

export const useStore = (): any => {
  const store = React.useContext(StoreContext)
  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error('You have forgot to use StoreProvider, shame on you.')
  }
  return store
}

export function Provider({ children }: any): JSX.Element {
  const userStore: any = useLocalStore(createUserStore)
  adminStore = useLocalStore(createAdminStore)

  const store: any = {
    userStore,
    adminStore,
  }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
