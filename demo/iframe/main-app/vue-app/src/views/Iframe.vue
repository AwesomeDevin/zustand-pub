<script setup lang="ts">
// import { watch } from "vue";
import usePlatformStore from "../platformStore";

const iframeSwitch = usePlatformStore(state=>state.iframeSwitch)

</script>
<template>
  <iframe v-if="iframeSwitch === 'vue'" src="http://localhost:5173/vue" />
  <iframe v-if="iframeSwitch === 'react'" src="http://localhost:5175" />
</template>

<style>
iframe{
  width: 100%;
  height: calc(100vh - 210px);
  border: 1px dashed #ccc;
}
</style>
