import create from 'zustand'
import PubStore from 'zustand-pub'
// import { devtools } from 'zustand/middleware'


export const Pub = new PubStore('iframe')

const platformStore = Pub.defineStore('platformStore', (set) => {
  return ({
  appInfo: { name: '' },
  value: '',
  iframeSwitch: 'react',
  reactAppState: {
    title: "The text initialized in the react app.",
    flag: 'From Child App',
    setTitle(val){
      console.log('val',val)
      set(state=>({
        ...state,
        reactAppState:{
          ...state.reactAppState,
          title: val
        }
      }))
    }
  },
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


// method1
const usePlatformStore = create(Pub.getStore('platformStore'))


// method2
// const usePlatformStore = create(platformStore)


export default usePlatformStore