import logo from './logo.svg';
import './App.css';
import { useCallback, useEffect } from 'react'

import PubStore from 'zustand-pub'
import { create } from 'zustand';




const pub = new PubStore('iframe')

const platformStore = pub.getStore('platformStore')

console.log('platformStore',platformStore.getState())
const usePlatformStore = create(platformStore)


const options = ["It's pretty useful ~","I like it ~"]


function App() {

  const value = usePlatformStore(state=>state.value)
  const setAppName = usePlatformStore(state=>state.setAppName)
  const setValue = usePlatformStore(state=>state.setValue)
  

  useEffect(()=>{
    setAppName('React')
  },[setAppName])

  const handleChange = useCallback((e)=>{
    setValue(e)
  },[setValue])

  return (
    <div className="App" >
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {
          options.map(option=><label style={{color: '#000'}} key={option}><input type="radio" name="text" defaultChecked={value === option} onClick={()=>{handleChange(option)}} value={option} />{option}</label>)
        }
      </header>
    </div>
  );
}

export default App;
