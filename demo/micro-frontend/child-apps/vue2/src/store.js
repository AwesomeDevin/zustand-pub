// import store, { StateCreator, StoreApi } from 'zustand/vanilla'



const SymbolKey = 'STORE'
const StoreSymbol = Symbol.for(SymbolKey)

// export function defineStore<T>(key: string, fn: StateCreator<T, [], [], T>) {
//   if (!key) return

//   const Store = store(fn)
//   if (typeof window !== 'undefined') {
//     //@ts-ignore
//     window[StoreSymbol] = {
//       [key]: Store,
//       //@ts-ignore
//       ...(window[StoreSymbol] || {}),
//     }
//   }


//   return create(Store)
// }

export function getStore(key) {
  //@ts-ignore
  return window[StoreSymbol] && window[StoreSymbol][key]
}


class PubStore{
  StoreSymbol
  constructor(SymbolKey){
    this.StoreSymbol = Symbol.for(SymbolKey)
  }

  defineStore() {
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

  getStore(key) {
    //@ts-ignore
    return window[this.StoreSymbol] && window[this.StoreSymbol][key]
  }
}

export default PubStore