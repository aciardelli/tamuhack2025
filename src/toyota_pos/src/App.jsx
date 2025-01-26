import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchComponent from './SearchComponent'
import ListComponent from './ListComponent'
function App() {
  const [count, setCount] = useState(0)
  const [search, setSearch] = useState(false)

  const [prompt, setPrompt] = useState("")

  const handlePrompt = (data) => {
    console.log(data)
    setPrompt(data)
    setSearch(false)
  }

  return (
    <>
      <div className = "main-box"> 
        {search ? <SearchComponent listenForPrompt={handlePrompt}></SearchComponent> : <ListComponent message={prompt}></ListComponent>}
      </div>
    </>
  )
}

export default App
