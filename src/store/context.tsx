import React from 'react'
import { useLocalStore } from 'mobx-react-lite'
import { createAdminStore } from './adminStore'
import { createProductionStore } from './productStore'

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
  adminStore = useLocalStore(createAdminStore)
  const productionStore = useLocalStore(createProductionStore)

  const store: any = {
    productionStore,
    adminStore,
  }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
