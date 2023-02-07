import store, { StateCreator, StoreApi, StoreMutatorIdentifier } from 'zustand/vanilla'


class PubStore{
  private StoreSymbol: symbol
  private target: any
  constructor(SymbolKey: string){
    this.StoreSymbol = Symbol.for(SymbolKey)
    //@ts-ignore
    this.target = typeof window !== 'undefined' && window[this.StoreSymbol]
    if(this.target){
      return this.target.pubStore
    }
  }

  defineStore<T extends object,Mos extends [StoreMutatorIdentifier, unknown][] = []>(key: string, fn: StateCreator<T, [], Mos>) {
    
    if (!key) return store(fn)
  
    let Store: StoreApi<T>
    if(this.target){
      const oldStore = this.target[key].value
      const newFnValue = fn(oldStore.setState, oldStore.getState, oldStore)
      // extend oldStore
      oldStore.setState((state: any)=>({
        ...newFnValue,
        ...state
      }))
      Store = oldStore
    }else{
      Store = store(fn)
    }
  
    if(typeof window !== 'undefined'){
      //@ts-ignore
      window[this.StoreSymbol] = {
        [key]: {
          value: Store,
          pubStore: this,
          fn,
        },
        //@ts-ignore
        ...(window[this.StoreSymbol] || {}),
      }
    }
    return Store
  }

  getStore<T>(key: string): StoreApi<T> {
    //@ts-ignore
    const res = this.target && this.target[key].value
    return res || store(()=>({}))
  }
}

export default PubStore