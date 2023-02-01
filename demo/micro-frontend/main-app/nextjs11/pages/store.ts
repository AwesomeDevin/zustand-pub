import create from 'zustand'
import store, { StateCreator, StoreApi } from 'zustand/vanilla'



const SymbolKey = 'STORE'
const StoreSymbol = Symbol.for(SymbolKey)

export function defineStore<T>(key: string, fn: StateCreator<T, [], [], T>) {
  if (!key) return create(fn)

  const Store = store(fn)
  if (typeof window !== 'undefined') {
    //@ts-ignore
    window[StoreSymbol] = {
      [key]: Store,
      //@ts-ignore
      ...(window[StoreSymbol] || {}),
    }
  }


  return create(Store)
}

export function getStore<T>(key: string): StoreApi<T> {
  //@ts-ignore
  return window[StoreSymbol][key]
}

class PubStore{
  StoreSymbol: Symbol
  constructor(SymbolKey: string){
    this.StoreSymbol = Symbol.for(SymbolKey)
  }

  defineStore<T>(key: string, fn: StateCreator<T, [], [], T>) {
    if (!key) return create(fn)
  
    const Store = store(fn)
    if (typeof window !== 'undefined') {
      //@ts-ignore
      window[this.StoreSymbol] = {
        [key]: Store,
        //@ts-ignore
        ...(window[this.StoreSymbol] || {}),
      }
    }
    return create(Store)
  }

  getStore<T>(key: string): StoreApi<T> {
    //@ts-ignore
    return window[this.StoreSymbol] && window[this.StoreSymbol][key]
  }
}

export default PubStore