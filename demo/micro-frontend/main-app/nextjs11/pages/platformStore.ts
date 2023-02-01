import ReactPubStore from 'zustand-pub/react'

console.log('ReactPubStore',ReactPubStore)

interface IState {
  appInfo: {
    name: string
  }
  value: number,
}

interface IAction {
  setAppName: (val: string) => void
  setValue: (val: number) => void
}

export const Pub = new ReactPubStore('micro-app')

const usePlatformStore = Pub.defineStore<IState & IAction>('platformStore', (set) => ({
  appInfo: { name: '' },
  value: 1,
  setAppName(val: string) {
    set({
      appInfo: {
        name: val
      }
    })
  },
  setValue(val: number) {
    set({
      value: val
    })
  }
}))

export default usePlatformStore