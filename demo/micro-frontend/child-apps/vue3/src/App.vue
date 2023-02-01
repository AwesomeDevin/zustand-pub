<template>
  <div id=vue3-app>
    <div><button @click="reduce">Reduce in ChildApp - Vue3</button></div>
    <div id='public-links' @click="onRouteChange">
      <router-link to="/" page-path=''>Home</router-link> |
      <router-link to="/page2" page-path='/page2'>Page2</router-link>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PubStore from "zustand-pub/dist/vue.mjs";
import create from 'zustand-vue'

const pub = new PubStore('micro-app')
const store = pub.getStore<{ setAppName: (val: string) => void }>("platformStore");


const { useStore } = create(store);

const setAppName = useStore((state: any)=>state.setAppName)
const setValue = useStore((state: any)=>state.setValue)


export default defineComponent({
  name: 'App',
  data() {
    return  {
      value: useStore((state: any)=>state.value as number) 
    }
  },
  methods: {
    // 子应用内部跳转时，通知侧边栏改变菜单状态
    onRouteChange () {
      if (window.__MICRO_APP_ENVIRONMENT__) {
        // 发送全局数据，通知侧边栏修改菜单展示
        window.microApp.setGlobalData({ name: window.__MICRO_APP_NAME__ })

      }
    },
    reduce(){
      // console.log(this.value)
      setValue(this.value - 1)
      // this.value = this.value - 1
    }
  },
  created(){
    setAppName && setAppName('ChildApp - Vue3')
  }
})
</script>

<style lang="scss">
#vue3-app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
