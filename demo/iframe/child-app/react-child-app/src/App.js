import logo from './logo.svg';
import './App.css';
import { useCallback, useEffect } from 'react'

// First method 
import usePlatformStore from './platformStore'



// Anthor method to create usePlatformStore

// import PubStore from 'zustand-pub'
// import create from 'zustand';

// const pub = new PubStore('iframe')
// const platformStore = pub.getStore('platformStore')

// console.log('platformStore',platformStore)
// const usePlatformStore = create(platformStore)

// console.log('usePlatformStore',usePlatformStore)

// platformStore.subscribe(()=>{
//   console.log('update')
// })


const options = ["It's pretty useful ~","I like it ~"]


function App() {

  const value = usePlatformStore(state=>state.value)
  const setAppName = usePlatformStore(state=>state.setAppName)
  const setValue = usePlatformStore(state=>state.setValue)
  // const title = usePlatformStore(state=>state.reactAppState.title)

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
      {/* <section><input style={{width: 350, fontSize: 20, lineHeight: '40px', textIndent: 10}} defaultValue={title}  /></section> */}
    </div>
  );
}

export default App;
