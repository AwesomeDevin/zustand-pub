import store, { StateCreator, StoreApi, StoreMutatorIdentifier } from 'zustand/vanilla'


interface IUnit<T extends object = any, Mos extends [StoreMutatorIdentifier, unknown][] = []> {
  value: StoreApi<T>,
  pubStore: PubStore,
  fn: StateCreator<T, [], Mos>
}

declare global {
  interface Window {[key: symbol] : { [key: string]: IUnit } }
}

class PubStore{
  private storeSymbol: symbol
  private target: { [key: string]: IUnit }
  private w: Window
  constructor(symbolKey: string){
    if(!symbolKey)
    {
      throw new Error('Missing key of PubStore')
    }
    try{
      this.w = typeof window !== 'undefined' && window.origin === window?.top?.origin ? window.top  : window
    }catch(e){
      this.w = typeof window !== 'undefined' && window
    }
    this.storeSymbol = Symbol.for(symbolKey)
    this.target = this.w ? this.w[this.storeSymbol] : undefined

    if(this.target){
      const keys = Object.keys(this.target)
      return this.target[keys[0]].pubStore
    }
    
  }

  defineStore<T extends object, Mos extends [StoreMutatorIdentifier, unknown][] = []>(key: string, fn: StateCreator<T, [], Mos>) {
    
    if (!key){
      return store(fn)
    }
  
    let Store: StoreApi<T>
    if(this.target && this.target[key].value){
      const oldStore = this.target[key].value
      const newFnValue = fn(oldStore.setState, oldStore.getState, oldStore)
      oldStore.setState((state: any)=>({
        ...newFnValue,
        ...state,
      }))
      Store = oldStore
    } else {
      Store = store(fn)
    }
  
    if(typeof window !== 'undefined'){
      //@ts-ignore
      this.w[this.storeSymbol] = {
        ...(this.w[this.storeSymbol] || {}),
        [key]: {
          value: Store,
          pubStore: this,
          fn,
        },
      }
      this.target = this.w[this.storeSymbol]
    }
    
    return Store
  }

  getStore<T extends object>(key: string): StoreApi<T> {
    //@ts-ignore
    const res = this.target && this.target[key].value
    //@ts-ignore
    return res || this.defineStore<T>(key, ()=>({}))
  }
}

export default PubStore