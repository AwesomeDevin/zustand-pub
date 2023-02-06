import create from 'zustand'
import store, { StateCreator, StoreApi, StoreMutatorIdentifier } from 'zustand/vanilla'


class PubStore{
  StoreSymbol: symbol
  constructor(SymbolKey: string){
    //@ts-ignore
    if(window[this.StoreSymbol]){
      //@ts-ignore
      return window[this.StoreSymbol].pubStore
    }
    this.StoreSymbol = Symbol.for(SymbolKey)
  }

  defineStore<T extends object,Mos extends [StoreMutatorIdentifier, unknown][] = []>(key: string, fn: StateCreator<T, [], Mos>) {
    
    if (!key) return create(fn)
    //@ts-ignore
    const target = window && window[this.StoreSymbol]
  
    const Store = target ?  store<T>((...args) => {
      const oldFnValue = target[key](...args)
      const newFnValue = fn(...args)
      return {
        ...oldFnValue,
        ...newFnValue,
      }
    }) : store(fn)
    if (typeof window !== 'undefined') {
      //@ts-ignore
      window[this.StoreSymbol] = {
        [key]: {
          value: Store,
          pubStore: this
        },
        //@ts-ignore
        ...(window[this.StoreSymbol] || {}),
      }
    }
    return create(Store)
  }

  getStore<T>(key: string): StoreApi<T> {
    //@ts-ignore
    const res = window[this.StoreSymbol] && window[this.StoreSymbol][key].value
    return res || store(()=>({}))
  }
}

export default PubStore