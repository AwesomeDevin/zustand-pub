<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import usePlatformStore from "./platformStore";

const name = usePlatformStore(state=>state.appInfo.name)
const value = usePlatformStore(state=>state.value)
const setAppName = usePlatformStore(state=>state.setAppName)


</script>

<template>
  <header>
    Title: {{ name }}
    Value: {{ value }}
    <div class="wrapper">
        <RouterLink to="/"><a>Vue Child App</a></RouterLink>
        <RouterLink to="/react"><a>React Child App</a></RouterLink>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

header {
  line-height: 1.5;
  max-height: 100vh;
  text-align: center;
}

a{
  margin: 0 20px;
}

</style>
