<script lang="ts" setup>
import { ref, watch } from 'vue'
import usePlatformStore from "../platformStore";
import Iframe from '../views/Iframe.vue';

const name = usePlatformStore(state=>state.appInfo.name)
const value = usePlatformStore(state=>state.value)
const setIframeSwitch = usePlatformStore(state=>state.setIframeSwitch)
// const iframeSwitch = usePlatformStore(state=>state.iframeSwitch)


const selectedKeys = ref<string[]>(['vue']);
const handleClick = (e: Event) => {
  selectedKeys.value.splice(1,1, e.key as string)
};
watch(selectedKeys, (val)=>{
  if(val.includes('vue')){
      setIframeSwitch('vue')
  }else{
    setIframeSwitch('react')
  }
})
setIframeSwitch('vue')



// export default{
//   name: "Header",
//   data(){
//     return {
//       selectedKeys: ['vue'],
//       name,value
//     }
//   },

//   methods: {
//     handleClick(e: any){
//       this.selectedKeys.splice(1,1, e.key as string)
//     }
//   },
//   watch:{
//     selectedKeys(val){
//       if(val.includes('vue')){
//          setIframeSwitch('vue')
//       }else{
//         setIframeSwitch('react')
//       }
//     }
//   },
//   components: {
//     Iframe
//   },
//   mounted(){
//     setIframeSwitch('vue')
//   }
// }

</script>
<template>
  <div class="body">
    <a-menu 
      id="dddddd"
      style="width: 256px"
      mode="inline"
      v-model:selectedKeys="selectedKeys"
      @click="handleClick"
      class="menus"
    >
    <a-menu-item key="vue">Vue</a-menu-item>
    <a-menu-item key="react">React</a-menu-item>
    </a-menu>
    <div class="main">
      <header>
          <h1>Parent Title: You are currently under <span :style="{color: 'red'}">{{ name }}  Iframe !!!</span> </h1>
          <h2>Parent Desc: {{ value }}</h2>
      </header>
      <RouterView />
      <Iframe />
    </div>
  </div>
    
</template>

<style scoped>

header {
  padding-top: 100px;
  line-height: 1.5;
  text-align: center;
}

.body{
  display: flex;

}

.main{
  flex: 1;
}

.menus{
  height: 100vh;
}

a{
  margin: 0 20px;
}

</style>