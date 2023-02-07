// import ReactPubStore from 'zustand-pub/react'
import { create } from 'zustand'
import ReactPubStore from './store'


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

const pubStore = Pub.defineStore<IState & IAction>('platformStore', (set, get, store) => {
  console.log('get, store',get, store)
  return ({
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
})})

const usePlatformStore = create(pubStore)

export default usePlatformStore