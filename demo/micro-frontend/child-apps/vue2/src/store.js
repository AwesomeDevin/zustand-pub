import s from "zustand/vanilla";
class n {
  constructor(t) {
    if (this.StoreSymbol = Symbol.for(t), this.target = typeof window < "u" && window[this.StoreSymbol], this.target)
      return this.target.pubStore;
  }
  defineStore(t, e) {
    if (!t)
      return s(e);
    let r;
    if (this.target) {
      const o = this.target[t].value, i = e(o.setState, o.getState, o);
      o.setState((S) => ({
        ...i,
        ...S
      })), r = o;
    } else
      r = s(e);
    return typeof window < "u" && (window[this.StoreSymbol] = {
      [t]: {
        value: r,
        pubStore: this,
        fn: e
      },
      //@ts-ignore
      ...window[this.StoreSymbol] || {}
    }), r;
  }
  getStore(t) {
    return this.target && this.target[t].value || s(() => ({}));
  }
}
const l = n;
export {
  l as default
};
