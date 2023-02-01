//@ts-nocheck
import createStore from "zustand/vanilla";
import { reactive, ref } from "vue";

const defineReactive = (store, subscribeCache, api, selection) => {
  const keys = Object.keys(store);
  keys.forEach((key) => {
    let value = store[key];
    Object.defineProperty(store, key, {
      enumerable: true,
      configurable: true,
      get: () => {
        if (keys.includes(key)) {
          if (!subscribeCache[key]) {
            console.log(value, key);
            subscribeCache[key] = api.subscribe((state) => {
              store[key] = selection ? selection(state)[key] : state[key];
            });
          }
        }
        return value;
      },
      set: (newVal) => {
        if (newVal !== value) {
          value = newVal;
        }
      }
    });
  });
};

export default (createState) => {
  const subscribeCache = {};
  const api =
    typeof createState === "function" ? createStore(createState) : createState;
  const useStore = (selection) => {
    const externalState = api.getState();
    let store = selection ? selection(externalState) : externalState;
    const isObject = store?.constructor === Object;
    const isFunction = store instanceof Function;
    if (isObject) {
      store = reactive(store);
      defineReactive(store, subscribeCache, api, selection);
      return store;
    } else {
      store = ref(store);
      api.subscribe((state) => {
        store.value = selection ? selection(state) : state;
      });
      return isFunction ? store.value : store;
    }
  };
  const res = Object.assign({ useStore }, api);
  return res;
};
