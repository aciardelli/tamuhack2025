import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchComponent from './SearchComponent'
import ListComponent from './ListComponent'
function App() {
  const [count, setCount] = useState(0)
  const [search, setSearch] = useState(true)

  const [prompt, setPrompt] = useState([])


  const handlePrompt = (data) => {
    console.log(data)
    setPrompt(data)
    setSearch(false)
  }

  return (
    <>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap');
    </style>
      <div className = "main-box"> 
        {search ? <SearchComponent listenForPrompt={handlePrompt}></SearchComponent> : <ListComponent message={prompt.explanation}data={prompt.data}></ListComponent>} 
      </div>
    </>
  )
}

export default App
