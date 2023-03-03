import create from 'zustand-vue'
import PubStore from 'zustand-pub'
import { devtools } from 'zustand/middleware'


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

const platformStore = Pub.defineStore<IState & IAction,[["zustand/devtools", IState & IAction]]>('platformStore', devtools((set) => {
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
})},{
  name: 'PlatformStore'
}))


// method1
// const usePlatformStore = create(Pub.getStore('platformStore'))


// method2
const usePlatformStore = create(platformStore)


export default usePlatformStore