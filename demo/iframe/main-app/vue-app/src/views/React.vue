<script setup lang="ts">
import usePlatformStore from "../platformStore";

const setAppName = usePlatformStore(state=>state.setAppName)

setAppName('React App')
</script>

<template>
    react页面
</template>

<style>

</style>
