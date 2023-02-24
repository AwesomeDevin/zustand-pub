import create from 'zustand-vue'
import PubStore from 'zustand-pub'

interface IState {
  appInfo: {
    name: string
  }
  value: string,

  iframeSwitch?: 'vue' | 'react'
}

interface IAction {
  setAppName: (val: string) => void
  setValue: (val: string) => void
  setIframeSwitch: (val: 'vue' | 'react') => void
}

export const Pub = new PubStore('iframe')

const pubStore = Pub.defineStore<IState & IAction>('platformStore', (set) => {
  return ({
  appInfo: { name: '' },
  value: '',
  iframeSwitch: 'vue',
  setIframeSwitch(val){
    set({
      iframeSwitch: val
    })
  },
  setAppName(val) {
    set((origin)=>({
      ...origin,
      appInfo: {
        name: val
      }
    }))
  },
  setValue(val) {
    set({
      value: val
    })
  }
})})

const usePlatformStore = create(pubStore)

export default usePlatformStore