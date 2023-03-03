<script setup lang="ts">
import usePlatformStore from "../platformStore";

const value = usePlatformStore(state=>state.value)
const setAppName = usePlatformStore(state=>state.setAppName)
const setValue = usePlatformStore(state=>state.setValue)

function handleChange(e){
  setValue(e.target.value)
}


setAppName('Vue')


if(!value.value){
  setValue("It's pretty useful ~")
}

</script>

<template>
    <div className="con"> 
      <img alt="Vue logo" class="logo" src="../assets/logo.svg" width="125" height="125" />
      <a-row :gutter="8">
        <label>
          Parent Desc &nbsp; <a-input :value="value" @input="handleChange"  />
        </label>
      </a-row>
    </div>
   
</template>

<style>
  .con{
    display: flex;
    flex-direction: column;
    align-items: center;
    flex:1
  }
  img{
    height: 30vmin;
    margin: 14px;
  }
  label{
    font-size: 20px; 
    line-height: 40px; 
  }
  .con .ant-input {
    width: 220px;
    font-size: 20px; 
    line-height: 40px; 
    text-indent: 10px;
  }
</style>
